const CACHE_NAME = 'stap2-v1';
const ASSETS = [
  './index.html',
  './stap_icon_512_10inch.png'
];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE_NAME).then(function(cache){return cache.addAll(ASSETS);}));
  self.skipWaiting();
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==CACHE_NAME;}).map(function(k){return caches.delete(k);}));}));
  self.clients.claim();
});
self.addEventListener('fetch', function(e){
  e.respondWith(caches.match(e.request).then(function(cached){
    if(cached)return cached;
    return fetch(e.request).then(function(res){var clone=res.clone();caches.open(CACHE_NAME).then(function(cache){cache.put(e.request,clone);});return res;}).catch(function(){return cached;});
  }));
});
