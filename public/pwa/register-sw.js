// Registriert den Service Worker. Wird über den <head>-Baustein (snippets/head.html) eingebunden.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((error) => {
      console.warn('Service Worker konnte nicht registriert werden:', error);
    });
  });
}
