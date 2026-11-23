import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'node_modules', 'katex', 'dist');
const target = path.join(root, 'public', 'katex');

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(path.join(dist, 'katex.min.css'), path.join(target, 'katex.min.css'));
await cp(path.join(dist, 'fonts'), path.join(target, 'fonts'), { recursive: true });
