const
	url = new URL(location),
	parameters = JSON.parse(url.searchParams.get('param'));

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
	if((parameters.cacheExternalRequests || e.request.url.startsWith(url.origin) || parameters.ressourceList.includes(e.request.url)) && parameters.version != 'no-cache'){
		e.respondWith(caches
			.open(parameters.version)
			.then(cache => cache
				.match(e.request)
				.then(resp => resp || fetch(e.request)
					.then(fetched => {
						cache.put(e.request, fetched.clone());
						
						return fetched;
					})
					.catch(() => caches.match(e.request))
				)
			)
		);
	}else{
		e.respondWith(fetch(e.request));
	}
});