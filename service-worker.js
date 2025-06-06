const CACHE_NAME = 'my-pwa-cache-v1'; // Update the version when you make changes
const urlsToCache = [
    '/', // Cache the main HTML file
    '/index.html',
    '/style.css', // Your Tailwind CSS file (or any CSS)
    '/index.js',  // Your JavaScript file

    '/images/app-logo.svg'
    // Add other assets you want to cache (images, fonts, etc.)
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Return cached response if available
                }
                return fetch(event.request); // Fetch from network if not cached
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});