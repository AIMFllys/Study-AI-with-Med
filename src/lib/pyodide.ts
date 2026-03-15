/**
 * Shared Pyodide WASM runtime loader.
 * Used by PythonRunner and CodeBlockWrapper to run Python in-browser.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win = typeof window !== 'undefined' ? (window as any) : null;

export async function loadPyodideFromCDN() {
  if (!win) throw new Error('Pyodide requires a browser environment');

  // Return cached instance
  if (win.__pyodide_ready) return win.__pyodide_instance;

  // Inject CDN script if not present
  if (!document.getElementById('pyodide-cdn')) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.id = 'pyodide-cdn';
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Pyodide CDN script'));
      document.head.appendChild(script);
    });
  }

  const pyodide = await win.loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/',
  });
  win.__pyodide_ready = true;
  win.__pyodide_instance = pyodide;
  return pyodide;
}
