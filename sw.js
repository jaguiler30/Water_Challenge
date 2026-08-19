// Service worker mínimo: solo existe para que el navegador permita
// "Agregar a inicio" (instalar como app). No hace notificaciones push
// ni funciona en segundo plano — eso requeriría Firebase Cloud Messaging
// + una función en el servidor.
const CACHE_NAME = 'water-challenge-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Estrategia simple: intenta red primero, si falla usa caché (deja la app
// utilizable brevemente sin conexión, aunque no es su objetivo principal).
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
