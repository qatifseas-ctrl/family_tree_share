/* شجرة العائلة — Service Worker */
const CACHE_NAME='family-tree-v1';
const SHELL_CACHE='family-tree-shell-v1';
const SHELL_ASSETS=['./index.html','./manifest.json','./icons/icon-192x192.png','./icons/icon-512x512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL_CACHE).then(c=>c.addAll(SHELL_ASSETS)).then(()=>self.skipWaiting()).catch(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME&&k!==SHELL_CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!e.request.url.startsWith('http'))return;var u=new URL(e.request.url);if(u.origin!==self.location.origin){e.respondWith(fetch(e.request).catch(()=>new Response('',{status:503})));return;}e.respondWith(cacheFirst(e.request));});
async function cacheFirst(req){var cached=await caches.match(req);if(cached)return cached;try{var res=await fetch(req);if(res&&res.status===200){var c=await caches.open(SHELL_CACHE);c.put(req,res.clone());}return res;}catch{return new Response(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>غير متصل</title><style>body{font-family:system-ui;text-align:center;padding:60px;color:#374151}h1{font-size:3rem}</style></head><body><h1>🌳</h1><h2>أنت غير متصل</h2><p>تحقق من اتصالك وأعد المحاولة</p></body></html>`,{headers:{'Content-Type':'text/html;charset=utf-8'}});}}
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING')self.skipWaiting();});