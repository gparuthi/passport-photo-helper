// Service Worker for US Passport Photo Helper PWA
const CACHE_NAME = 'passport-photo-v1.0.0';
const STATIC_CACHE_NAME = 'passport-photo-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'passport-photo-dynamic-v1.0.0';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static files...');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Static files cached successfully');
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old caches
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external API calls (OpenAI, etc.)
  if (url.origin !== location.origin) {
    return;
  }
  
  // Handle different types of requests
  if (STATIC_FILES.includes(url.pathname) || url.pathname === '/') {
    // Static files - cache first strategy
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.startsWith('/icons/')) {
    // Icons - cache first strategy
    event.respondWith(cacheFirst(request));
  } else {
    // Other requests - network first strategy
    event.respondWith(networkFirst(request));
  }
});

// Cache first strategy - good for static assets
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache first failed:', error);
    // Return offline fallback if available
    return caches.match('/index.html');
  }
}

// Network first strategy - good for dynamic content
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Network first failed:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }
    
    throw error;
  }
}

// Handle background sync for offline photo saves
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-photos') {
    event.waitUntil(syncPhotos());
  }
});

async function syncPhotos() {
  try {
    // Handle any pending photo operations when back online
    console.log('Syncing photos in background...');
    
    // Get any pending operations from IndexedDB
    const pendingOperations = await getPendingOperations();
    
    for (const operation of pendingOperations) {
      try {
        if (operation.type === 'ai-analysis') {
          // Retry AI analysis when back online
          await retryAIAnalysis(operation.data);
        }
        // Mark operation as completed
        await markOperationCompleted(operation.id);
      } catch (error) {
        console.error('Failed to sync operation:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Placeholder functions for IndexedDB operations
async function getPendingOperations() {
  // In a real implementation, this would query IndexedDB
  return [];
}

async function retryAIAnalysis(data) {
  // In a real implementation, this would retry the AI analysis
  console.log('Retrying AI analysis:', data);
}

async function markOperationCompleted(id) {
  // In a real implementation, this would update IndexedDB
  console.log('Marking operation completed:', id);
}

// Handle push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: data.data,
      actions: [
        {
          action: 'open',
          title: 'Open App',
          icon: '/icons/icon-192x192.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle app updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Log service worker events for debugging
console.log('Service Worker script loaded'); 