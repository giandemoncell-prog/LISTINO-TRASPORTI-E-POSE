const CACHE_NAME = 'serena-infissi-v8';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    './privacy-policy.html',
    './Logo/serena_infissi.gif'
];

// Install - cache all assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch - stale-while-revalidate per index.html, cache-first per il resto
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    const isHtml = url.pathname.endsWith('index.html') || url.pathname.endsWith('/');

    if (isHtml) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache =>
                cache.match(event.request).then(cached => {
                    const networkFetch = fetch(event.request).then(response => {
                        if (response.ok) cache.put(event.request, response.clone());
                        return response;
                    }).catch(() => cached);
                    return cached || networkFetch;
                })
            )
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(cached => cached || fetch(event.request))
        );
    }
});
