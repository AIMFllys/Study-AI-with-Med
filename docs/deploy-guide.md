# 🚀 宝塔 + GitHub Actions 自动化部署完整指南

> 基于 **Study-AI-with-Med（Next.js 16）** 项目的实战经验总结，适用于所有 Node.js 项目的宝塔部署。

---

## 一、整体架构

```
本地开发 → git push → GitHub Actions → SSH 登录服务器 → 拉取 + 编译 + 重启
```

```mermaid
graph LR
    A[本地 git push] --> B[GitHub 接收代码]
    B --> C[触发 Actions 工作流]
    C --> D[SSH 连接阿里云服务器]
    D --> E[git pull 拉取最新代码]
    E --> F[npm install 安装依赖]
    F --> G[npm run build 编译]
    G --> H[重启 Node 服务]
    H --> I[网站自动更新 ✅]
```

---

## 二、前置准备清单

### 2.1 服务器环境

| 项目 | 要求 | 安装命令 |
|------|------|---------|
| Git | 必须 | `yum install git -y` |
| Node.js | v20+ | 通过宝塔 Node 版本管理器安装 |
| npm | 随 Node 自带 | — |
| PM2（可选） | 进程管理 | `npm install -g pm2` |

### 2.2 项目配置

**`next.config.ts` 必须开启独立模式：**
```typescript
const nextConfig: NextConfig = {
  output: 'standalone',        // 生成精简的独立部署包
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  devIndicators: false,
};
```

**`.gitignore` 必须排除的文件：**
```text
node_modules/
.next/
.env*.local
.agent/
.gemini/
tmp/
```

**`.dockerignore`（Docker 部署时用）：**
```text
node_modules
.next
out
build
.env*.local
.git
.agent
.gemini
tmp
```

---

## 三、SSH 密钥配置（核心步骤）

### 3.1 在服务器生成密钥

```bash
ssh-keygen -t rsa -b 4096
```

> [!CAUTION]
> 三次提示全部**直接按回车**，不要输入任何路径或密码！
> 千万不要输入 Windows 路径（如 `C:\Users\...`），Linux 无法识别。

### 3.2 查看密钥

| 文件 | 命令 | 用途 |
|------|------|------|
| **公钥** | `cat ~/.ssh/id_rsa.pub` | 放到 GitHub Deploy Key |
| **私钥** | `cat ~/.ssh/id_rsa` | 放到 GitHub Secrets |

### 3.3 允许 SSH 登录（⚠️ 极易遗漏）

```bash
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

> [!IMPORTANT]
> 如果跳过这一步，GitHub Actions 会报错：
> `ssh: unable to authenticate, attempted methods [none publickey]`

### 3.4 配置 GitHub

**Deploy Key（让服务器能从 GitHub 拉代码）：**
- GitHub 仓库 → Settings → Deploy keys → Add deploy key
- 粘贴**公钥**（`id_rsa.pub` 的内容，以 `ssh-rsa` 开头）
- 勾选 `Allow write access`

**Secrets（让 GitHub Actions 能登录服务器）：**
- GitHub 仓库 → Settings → Secrets and variables → Actions → New repository secret

| Secret 名称 | 值 | 说明 |
|---|---|---|
| `SERVER_HOST` | `8.162.4.159` | 服务器公网 IP |
| `SERVER_USER` | `root` | SSH 登录用户名 |
| `SERVER_SSH_KEY` | 私钥全文 | `cat ~/.ssh/id_rsa` 的完整输出（含 BEGIN/END 行） |
| `SERVER_PORT` | `22` | SSH 端口 |

---

## 四、服务器克隆代码

### 4.1 清空宝塔默认文件

宝塔创建站点后会自动生成 `404.html`、`.htaccess`、`.user.ini`。需要先清空：

```bash
cd /www/wwwroot/你的站点目录

# .user.ini 被宝塔锁定，需先解锁
chattr -i .user.ini
rm -rf *
rm -rf .*

# 克隆代码（注意末尾的 . 代表克隆到当前目录）
git clone git@github.com:用户名/仓库名.git .
```

> [!WARNING]
> 如果不加末尾的 `.`，Git 会在当前目录下再创建一个子文件夹，导致路径多一层。

### 4.2 Git 权限问题

首次在宝塔目录使用 Git 时，可能会报 `dubious ownership` 错误：

```bash
git config --global --add safe.directory /www/wwwroot/你的站点目录
```

---

## 五、宝塔 Node 项目配置

### 5.1 添加项目时的填写规则

| 选项 | 正确值 | ⚠️ 常见错误 |
|------|--------|-----------|
| 项目目录 | `/www/wwwroot/站点目录` | — |
| 启动选项 | **`start`**（生产模式） | 不要选 `dev`（开发模式） |
| Node 版本 | `v20.x` | — |
| 包管理器 | **`npm`** | 不要选 `pnpm`（除非项目用 pnpm） |
| 不安装 node_module | **取消勾选** | 必须安装依赖才能运行 |
| 项目端口 | `5986`（或自定义） | 需与代码中一致 |

### 5.2 如何判断用哪个包管理器？

| 项目中有这个文件 | 说明用的是 |
|---|---|
| `package-lock.json` | **npm** |
| `pnpm-lock.yaml` | pnpm |
| `yarn.lock` | yarn |

---

## 六、GitHub Actions 工作流

### 6.1 完整工作流文件

文件路径：`.github/workflows/deploy.yml`

```yaml
name: 🚀 Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    name: 部署到宝塔服务器
    runs-on: ubuntu-latest

    steps:
      - name: 🔑 SSH 连接服务器并部署
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          port: ${{ secrets.SERVER_PORT }}
          command_timeout: 10m
          script: |
            echo "===== 🚀 开始自动化部署 ====="

            # 修复 Git 权限问题
            git config --global --add safe.directory /www/wwwroot/站点目录

            cd /www/wwwroot/站点目录

            echo "📥 拉取最新代码..."
            git pull origin main

            echo "📦 安装依赖..."
            npm install

            echo "🔨 编译中..."
            npm run build

            echo "🔄 重启服务..."
            # 方式一：宝塔内置重启（推荐，去宝塔面板手动点）
            # 方式二：PM2 重启
            # pm2 restart 项目名 || pm2 start .next/standalone/server.js --name 项目名

            echo "===== ✅ 部署完成！ ====="
```

### 6.2 工作流触发方式

| 方式 | 说明 |
|------|------|
| `git push` 到 main | 自动触发 |
| GitHub Actions 页面 | 点击 Re-run all jobs 手动触发 |

---

## 七、SSL 证书申请

### 7.1 前提条件

申请 Let's Encrypt 免费证书需要 CA 服务器能通过 HTTP 访问你的站点，必须确保：

1. **域名 DNS 解析正确**：A 记录指向服务器公网 IP
2. **端口 80/443 已开放**：

**阿里云安全组（入方向）：**

| 端口 | 协议 | 授权对象 |
|------|------|---------|
| 80 | TCP | 0.0.0.0/0 |
| 443 | TCP | 0.0.0.0/0 |

**服务器防火墙：**
```bash
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=443/tcp --permanent
firewall-cmd --reload
```

**宝塔防火墙：**
- 宝塔面板 → 安全 → 添加放行端口 80、443

### 7.2 常见失败原因

| 错误信息 | 原因 | 解决 |
|---------|------|------|
| `Timeout during connect` | 端口未开放或被防火墙拦截 | 检查安全组 + 防火墙 |
| ping 返回 `198.18.x.x` | 本地 VPN/代理劫持了 DNS | 关掉 VPN 或在服务器上测试 |
| `Connection refused` | Nginx/Apache 未运行 | 启动 Web 服务 |

---

## 八、踩坑记录

### 8.1 ssh-keygen 路径陷阱
❌ 在 Linux 服务器的 `ssh-keygen` 中输入了 Windows 路径 `C:\Users\...`
✅ 直接按回车，使用默认路径 `/root/.ssh/id_rsa`

### 8.2 .user.ini 删不掉
❌ `rm -f .user.ini` → `Operation not permitted`
✅ 先解锁：`chattr -i .user.ini`，再删除

### 8.3 git clone 目录非空
❌ `fatal: destination path '.' already exists and is not an empty directory.`
✅ 先清空目录所有文件（包括隐藏文件），再 clone

### 8.4 Git dubious ownership
❌ `fatal: detected dubious ownership in repository`
✅ `git config --global --add safe.directory /www/wwwroot/站点目录`

### 8.5 SSH 认证失败
❌ `ssh: unable to authenticate, attempted methods [none publickey]`
✅ 必须执行 `cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys`

### 8.6 宝塔启动选项选错
❌ 选了 `dev`（开发模式，性能差且不稳定）
✅ 选 `start`（Next.js 生产模式）

### 8.7 包管理器选错
❌ 选了 `pnpm` 但项目实际用的 `npm`
✅ 看项目里有 `package-lock.json` 就选 `npm`

---

## 九、部署后验证清单

- [ ] 域名能正常访问网站
- [ ] SSL 证书生效（地址栏有锁）
- [ ] `git push` 后 GitHub Actions 自动运行
- [ ] Actions 全部步骤绿色通过
- [ ] 服务器代码已更新（检查最新 commit）
- [ ] 网站内容已刷新

---

*文档版本：v1.0 · 2026-03-15 · 基于 Study-AI-with-Med 项目实战*
