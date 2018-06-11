"use strict";

// Early flush chunk
const earlyChunk = variant => {
  return `
    <!DOCTYPE html>
      <html lang="en">
        <head>
        <meta http-equiv="Accept-CH" content="DPR, Downlink,Viewport-Width, Width, Device-Memory">

        <link rel="preload" as="script" href="/${variant}.client.js">
        <link rel="stylesheet" href="/${variant}.client.css">
  
        <script>
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('./serviceWorker.js')
          .then(function(reg) {
            // registration worked
            console.log('Registration succeeded. Scope is ' + reg.scope);
          }).catch(function(error) {
            // registration failed
            console.log('Registration failed with ' + error);
          });
        }
        </script>
        </head>`;
};

// Closing chunk
const lateChunk = (html, variant, preloadedState) => {
  return `
        <body>
          <div id="app">${html}</div>
          <script>window.__PRELOADED_STATE__ = ${preloadedState}</script>
          <script src="/${variant}.client.js"></script>
        </body>
      </html>
    `;
};

module.exports = { earlyChunk, lateChunk };