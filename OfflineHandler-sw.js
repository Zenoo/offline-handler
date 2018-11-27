const parameters = JSON.parse(new URL(location).searchParams.get('param'));

self.addEventListener('install', e => {
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
				.then(response => {
					cache.put(e.request, response.clone());

					return response;
				})
				.catch(() => caches
					.match(e.request)
					.then(fallback => fallback)
				)
			)
		)
	);
});

if(parameters.clearOldCache){
	self.addEventListener('activate', e => {
		e.waitUntil(
			caches.keys().then(keyList => Promise.all(keyList.map(key => key == parameters.version ? Promise.resolve() : caches.delete(key))))
		);
	});
}