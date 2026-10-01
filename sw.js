// 본 앱 파일 + 한 번 본 지도 타일/라이브러리를 캐시해 오프라인에서도 실행. 파일을 고치면 V 숫자를 올릴 것.
// ponytail: 캐시 용량 제한 없음, 타일이 쌓이면 정리 로직 추가
const V='v2',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(F))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok||res.type==='opaque'){const c=res.clone();caches.open(V).then(x=>x.put(e.request,c))}return res}).catch(()=>r)))});
