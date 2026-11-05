const C='sticker-gen-v106',F=['./','./index.html','./Studio%20Warna.html','./Proletar%20Tech%20%C2%B7%20Invoice.html','./manifest.webmanifest','./proletar-logo.png','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>/^sticker-gen-v\d+$/.test(x)&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
  if(r.url.includes('Proletar%20Tech')||r.url.includes('native=')){
    e.respondWith(fetch(r,{cache:'no-store'}).catch(async()=>{
      const c=await caches.open(C);
      return c.match('./Proletar%20Tech%20%C2%B7%20Invoice.html')||Response.error();
    }));
    return;
  }
  if(r.mode==='navigate'){
    e.respondWith(fetch(r,{cache:'no-store'}).catch(async()=>{
      const c=await caches.open(C);
      return c.match('./index.html')||Response.error();
    }));
    return;
  }
  e.respondWith(caches.open(C).then(async c=>{
    const cached=await c.match(r);
    if(cached)return cached;
    return fetch(r);
  }));
});
 