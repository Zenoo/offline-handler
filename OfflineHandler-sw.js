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
			.then(resp => {
				if(resp) return resp;

				const url = new URL(e.request.url);

				url.searchParams.set(parameters.versionParameter, parameters.version);
				console.log(url);

				return fetch(url);
			})
		)
	);
});

if(parameters.clearOldCache){
	self.addEventListener('activate', e => {
		console.log('activate');
		e.waitUntil(
			caches.keys().then(keyList => Promise.all(keyList.map(key => key == parameters.version ? Promise.resolve() : caches.delete(key))))
		);
	});
}