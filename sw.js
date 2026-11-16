const CACHE = 'forge-v58';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png'];  // essential: if any of these cannot be cached the update fails and the old version keeps working
const OPTIONAL = ['./icon-512.png', './icon-maskable-512.png', './fonts/bricolage-forge-700.woff2', './fonts/geist-latin-wght-normal.woff2', './fonts/newsreader-latin-opsz-normal.woff2', './geist-latin-wght-normal.woff2', './newsreader-latin-opsz-normal.woff2'];  // nice to have; a missing one is fetched and cached later

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    try { await cache.addAll(SHELL); } catch (error) { await caches.delete(CACHE); throw error; }  // failed install: drop the partial cache, the old version stays in charge
    await Promise.allSettled(OPTIONAL.map(u => cache.add(u)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('forge-') && name !== CACHE).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('/sw.js')) return;  // never serve the worker file from the cache, so update checks see the real one

  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE);
          await cache.put(request, response.clone());
          await cache.put(new URL('./', self.registration.scope).href, response.clone());
        }
        if (response.ok) return response;
        return (await caches.match(request)) || (await caches.match(new URL('./', self.registration.scope).href)) || response;
      } catch (error) {
        return (await caches.match(request)) || (await caches.match(new URL('./', self.registration.scope).href)) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      return Response.error();
    }
  })());
});
