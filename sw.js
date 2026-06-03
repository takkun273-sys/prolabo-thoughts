// Service Worker を無効化・全キャッシュ削除
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});
// フェッチは全てネットワークに転送（キャッシュなし）
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});
