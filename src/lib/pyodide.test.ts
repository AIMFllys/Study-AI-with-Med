import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type FakeScript = {
  id: string;
  src: string;
  onload: (() => void) | null;
  onerror: (() => void) | null;
  remove: () => void;
};

type FakeWindow = {
  loadPyodide?: ReturnType<typeof vi.fn>;
};

function installFakeBrowser() {
  const scripts = new Map<string, FakeScript>();
  const head = {
    appendChild(script: FakeScript) {
      scripts.set(script.id, script);
      // Scripts load asynchronously, like in a real browser.
      queueMicrotask(() => script.onload?.());
      return script;
    },
  };
  const fakeDocument = {
    getElementById: (id: string) => scripts.get(id) ?? null,
    createElement: () => {
      const el: FakeScript = {
        id: '',
        src: '',
        onload: null,
        onerror: null,
        remove() {
          scripts.delete(el.id);
        },
      };
      return el;
    },
    head,
  };
  const win: FakeWindow = {};
  vi.stubGlobal('window', win);
  vi.stubGlobal('document', fakeDocument);
  return win;
}

describe('loadPyodideFromCDN', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shares one runtime load between concurrent callers', async () => {
    const win = installFakeBrowser();
    let instances = 0;
    win.loadPyodide = vi.fn(async () => ({ id: ++instances }));

    const { loadPyodideFromCDN } = await import('./pyodide');
    const [first, second] = await Promise.all([
      loadPyodideFromCDN(),
      loadPyodideFromCDN(),
    ]);

    expect(win.loadPyodide).toHaveBeenCalledTimes(1);
    expect(first).toBe(second);
  });

  it('reuses the loaded runtime for later calls', async () => {
    const win = installFakeBrowser();
    win.loadPyodide = vi.fn(async () => ({ id: 'runtime' }));

    const { loadPyodideFromCDN } = await import('./pyodide');
    const first = await loadPyodideFromCDN();
    const second = await loadPyodideFromCDN();

    expect(first).toBe(second);
    expect(win.loadPyodide).toHaveBeenCalledTimes(1);
  });

  it('retries loading after a failure', async () => {
    const win = installFakeBrowser();
    win.loadPyodide = vi
      .fn()
      .mockRejectedValueOnce(new Error('load failed'))
      .mockResolvedValue({ id: 'runtime' });

    const { loadPyodideFromCDN } = await import('./pyodide');
    await expect(loadPyodideFromCDN()).rejects.toThrow('load failed');
    await expect(loadPyodideFromCDN()).resolves.toEqual({ id: 'runtime' });
    expect(win.loadPyodide).toHaveBeenCalledTimes(2);
  });
});
