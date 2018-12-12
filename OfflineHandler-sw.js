const parameters = JSON.parse(new URL(location).searchParams.get('param'));

self.addEventListener('install', e => {
	self.skipWaiting();

	if(parameters.clearOldCache){
		caches.keys().then(keyList => {
			keyList.filter(key => key != parameters.version).forEach(key => {
				caches.delete(key);
			});
		});
	}

	e.waitUntil(
		caches.open(parameters.version).then(cache => cache.addAll(parameters.ressourceList))
	);
});

self.addEventListener('fetch', e => {
	e.respondWith(caches
		.open(parameters.version)
		.then(cache => cache
			.match(e.request)
			.then(resp => resp || fetch(e.request)
				.then(fetched => {
					cache.put(e.request, fetched.clone());
					
					return fetched;
				})
				.catch(() => console.log(e.request),console.log(caches.match(e.request)),caches.match(e.request))
			)
		)
	);
});