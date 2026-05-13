/**
 * Inline script injected before first paint to prevent flash of wrong theme.
 * Reads localStorage → falls back to dark mode → applies class to <html>.
 * Must be a Server Component (no 'use client') so it renders synchronously in <head>.
 */
export function ThemeScript() {
  const script = `(function(){try{
    var t=localStorage.getItem('theme');
    document.documentElement.classList.add(t||'dark');
  }catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
