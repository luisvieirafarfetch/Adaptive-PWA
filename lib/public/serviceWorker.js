'use strict';

importScripts('./idb.js');

self.addEventListener('install', function (event) {
    console.log('[ServiceWorker] Installed');
    return self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    console.log('[ServiceWorker] Claiming clients');
    return self.clients.claim();
});

// Listen to fetch events
self.addEventListener('fetch', function (event) {
    const req = event.request.clone();

    const connectionMap = {
        'slow-2g': 1,
        '2g': 2,
        '3g': 3,
        '4g': 4
    };

    const currentConnectionLevel = connectionMap[navigator.connection.effectiveType];

    var IMGFALLBACK = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="180" viewBox="0 20 60 20" fill="#CCC">
    <path d="M5 53h47V19H5v34zm45-2H8.649l14.324-12.611L33.275 48.69a.999.999 0 1 0 1.414-1.414l-4.807-4.807 9.181-10.054L50 42.44V51zM7 21h43v18.727l-10.324-9.464a1.002 1.002 0 0 0-1.414.063l-9.794 10.727-4.743-4.743a1.002 1.002 0 0 0-1.368-.044L7 49.787V21z"/>
    <path d="M15 24a5.575 5.575 0 0 0-5.569 5.569c0 3.07 2.498 5.568 5.569 5.568s5.569-2.498 5.569-5.568A5.575 5.575 0 0 0 15 24zm0 9.138c-1.968 0-3.569-1.601-3.569-3.568S13.032 26 15 26s3.569 1.602 3.569 3.569-1.601 3.569-3.569 3.569z"/>
    <path d="M49.38 15c-1.79-1.586-11.313-9.958-16.748-13.415C31.72.615 30.434 0 29 0s-2.72.615-3.632 1.585C19.933 5.042 10.41 13.414 8.62 15H1v42h55V15h-6.62zM26.069 4.369c.009-.043.028-.083.039-.125a3.06 3.06 0 0 1 .66-1.224c.005-.005.006-.012.011-.018C27.328 2.391 28.116 2 29 2s1.672.391 2.221 1.002c.005.005.006.012.011.018.245.275.515.69.66 1.225.011.042.029.082.039.125.043.194.069.404.069.63 0 1.654-1.346 3-3 3s-3-1.346-3-3c0-.226.026-.436.069-.631zM24 4.95V5c0 2.757 2.243 5 5 5s5-2.243 5-5v-.05c4.17 3.033 9.504 7.581 12.345 10.05h-34.69C14.496 12.531 19.831 7.983 24 4.95zM54 55H3V17h51v38z"/>
  </svg>`;

    if (req.url.indexOf('http://localhost:3000/high/photo') > -1) {
        const path = req.url.split('high');
        if (currentConnectionLevel <= 2) {
            event.respondWith(Promise.resolve(new Response(IMGFALLBACK, {
                headers: {
                    'Content-Type': 'image/svg+xml',
                    'Cache-control': 'no-store'
                }
            })));
        } else if (currentConnectionLevel === 3) {
            event.respondWith(fetch(`${path[0]}low${path[1]}`, {
                headers: {
                    'Cache-control': 'must-revalidate'
                }
            }));
        } else if (currentConnectionLevel > 3) {
            event.respondWith(fetch(`${path[0]}high${path[1]}`, {
                headers: {
                    'Cache-control': 'public'
                }
            }));
        }
    }

    if (req.url.indexOf('/stories/') > -1 || req.url.indexOf('/comments/') > -1) {
        event.respondWith(idbKeyval.get('Save-Data').then(value => {
            return fetch(req.url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Connection-Type': currentConnectionLevel,
                    'Save-Data': value
                }
            });
        }));
    }
});