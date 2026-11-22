/**
 * Shared Pyodide WASM runtime loader.
 * Used by PythonRunner and CodeBlockWrapper to run Python in-browser.
 */

interface PyodideRuntime {
  setStdout: (opts: { batched: (text: string) => void }) => void;
  setStderr: (opts: { batched: (text: string) => void }) => void;
  loadPackagesFromImports: (code: string) => Promise<void>;
  runPythonAsync: (code: string) => Promise<unknown>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win = typeof window !== 'undefined' ? (window as any) : null;

// Cache the in-flight load so concurrent callers share one WASM runtime
// instead of each instantiating their own.
let loadPromise: Promise<PyodideRuntime> | null = null;

export async function loadPyodideFromCDN(): Promise<PyodideRuntime> {
  if (!win) throw new Error('Pyodide requires a browser environment');

  // Return cached instance
  if (win.__pyodide_ready) return win.__pyodide_instance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    // Inject CDN script if not present
    if (!document.getElementById('pyodide-cdn')) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.id = 'pyodide-cdn';
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js';
        script.onload = () => resolve();
        script.onerror = () => {
          script.remove();
          reject(new Error('Failed to load Pyodide CDN script'));
        };
        document.head.appendChild(script);
      });
    }

    const pyodide = (await win.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/',
    })) as PyodideRuntime;
    win.__pyodide_ready = true;
    win.__pyodide_instance = pyodide;
    return pyodide;
  })();

  try {
    return await loadPromise;
  } catch (err) {
    // Allow a later call to retry after a failed load.
    loadPromise = null;
    throw err;
  }
}
