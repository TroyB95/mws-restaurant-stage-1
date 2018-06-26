var cacheName = 'v1';
var cacheFiles = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './data/restaurants.json',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './img/'
]

self.addEventListener('install', function(e){
  console.log("[serviceWorker] Installed");

  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[serviceWoker] Caching cacheFiles");
      return cache.addAll(cacheFiles);
    })
  )
})

self.addEventListener('activate', function(e){
  console.log("[serviceWorker] Activated");

  e.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(cacheNames.map(function(thisCacheName) {

        if(thisCacheName !== cacheName) {

          console.log('[ServiceWorker] Removing cached files from ' + thisCacheName);
          return caches.delete(thisCacheName);
        }
      }))
    })
  )
})

self.addEventListener('fetch', function(e){
  console.log("[serviceWorker] Fetching", e.request.url);
})