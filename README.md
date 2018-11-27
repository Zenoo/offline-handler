# OfflineHandler [(Demo)](https://zenoo.github.io/offline-app-example/)

Allow your users to use your website while offline easily

### Doc

* **Installation**

Simply import `OfflineHandler.min.js` into your HTML **and** download `OfflineHandler-sw.min.js` **at the root of your project**.
```
<script src="https://gitcdn.link/repo/Zenoo/offline-handler/master/OfflineHandler.min.js"></script>	
```
* **How to use**

Create a new [`OfflineHandler`](https://zenoo.github.io/offline-handler/OfflineHandler.html) object with the ressources to be cached as the first parameter :
```
let ajax = new OfflineHandler(['path/to/customFile.js'], ...);
```
* **Parameters**

```
	/**
	 * List of ressources to be cached
	 * The current page is always cached, no need to add it here
	 * @type {String[]}
	 */
	const ressourceList = [
		'path/to/customFile.js',
		'pathto/the/customCss.css'
	];

	/**
	 *  /|\ OPTIONAL /|\
	 * Path to the OfflineHandler ServiceWorker file
	 * @type {String}
	 * @default OfflineHandler-sw.min.js
	 */
	const serviceWorkerPath = 'OfflineHandler-sw.min.js';

	/**
	 *  /|\ OPTIONAL /|\
	 * Name of the URL parameter that holds the version of the files
	 * @type {String}
	 * @default v
	 */
	const versionParameter = 'v';

	/**
	 *  /|\ OPTIONAL /|\
	 * Should the old cached versions be deleted when a new one is created ?
	 * @type {String}
	 * @default true
	 */
	const clearOldCache = true;

	new OfflineHandler(ressourceList, serviceWorkerPath, versionParameter, clearOldCache);
```

* **Example**

See this [Github project](https://zenoo.github.io/offline-app-example/) for a working example.

## Authors

* **Zenoo** - *Initial work* - [Zenoo.fr](https://zenoo.fr)