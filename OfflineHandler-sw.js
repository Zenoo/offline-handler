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
			.then(resp => {
				if(resp) return resp;

				const url = new URL(e.request.url);

				url.searchParams.set(parameters.versionParameter, parameters.version);

				return fetch(url);
			})
		)
	);
});