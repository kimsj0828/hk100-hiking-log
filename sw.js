// 앱 파일 + Firebase SDK(버전 고정 주소)만 캐시. 지도는 카카오 서버라 오프라인 불가. 파일을 고치면 V 숫자를 올릴 것.
const V='v17',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(F))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin&&!e.request.url.startsWith('https://www.gstatic.com/firebasejs/'))return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok||res.type==='opaque'){const c=res.clone();caches.open(V).then(x=>x.put(e.request,c))}return res}).catch(()=>r)))});
