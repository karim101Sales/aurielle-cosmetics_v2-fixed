
const CACHE = 'aurielle-v1';
const ASSETS = [
  '/index.html', '/about.html', '/contact.html',
  '/assets/styles.css', '/assets/logo.svg',
  '/data/products.json', '/data/translations.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(cache => cache.put(e.request, copy));
      return resp;
    }).catch(() => caches.match('/index.html')))
  );
});
