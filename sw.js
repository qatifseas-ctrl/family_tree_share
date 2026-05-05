/* شجرة العائلة — Service Worker */
const CACHE_NAME='family-tree-v1';
const SHELL_CACHE='family-tree-shell-v1';
const STATIC_ASSETS=['./manifest.json','./icons/icon-192x192.png','./icons/icon-512x512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL_CACHE).then(c=>c.addAll(STATIC_ASSETS)).then(()=>self.skipWaiting()).catch(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME&&k!==SHELL_CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith('http'))return;
  var u=new URL(e.request.url);
  if(u.origin!==self.location.origin){e.respondWith(fetch(e.request).catch(()=>new Response('',{status:503})));return;}
  var isPage=e.request.mode==='navigate'||e.request.url.endsWith('index.html')||e.request.url.endsWith('/');
  e.respondWith(isPage?networkFirst(e.request):cacheFirst(e.request));
});
async function networkFirst(req){
  var cache=await caches.open(SHELL_CACHE);
  try{var r=await fetch(req);if(r&&r.status===200)cache.put(req,r.clone());return r;}
  catch{var c=await cache.match(req);return c||new Response(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>غير متصل</title><style>body{font-family:system-ui;text-align:center;padding:60px;color:#374151}h1{font-size:3rem}</style></head><body><h1>🌳</h1><h2>أنت غير متصل</h2><p>تحقق من اتصالك وأعد المحاولة</p></body></html>`,{headers:{'Content-Type':'text/html;charset=utf-8'}});}
}
async function cacheFirst(req){
  var c=await caches.match(req);if(c)return c;
  try{var r=await fetch(req);if(r&&r.status===200){var cache=await caches.open(SHELL_CACHE);cache.put(req,r.clone());}return r;}
  catch{return new Response('',{status:503});}
}
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING')self.skipWaiting();});