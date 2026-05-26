// Service Worker minimale — soddisfa il requisito di installabilità della PWA.
// NON fa caching offline: il sito richiede sempre connessione.
// Per upgrade a offline-first, considerare @serwist/next.

self.addEventListener('install', (event) => {
  // Attivati subito senza aspettare che le tab esistenti si chiudano
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Prendi il controllo di tutte le tab esistenti
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  // Passthrough: lascia che il browser faccia la sua cosa.
  // Necessario avere un fetch handler per essere considerati una PWA installabile.
})
