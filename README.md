# OfflineHandler [(Demo)](https://zenoo.github.io/offline-app-example/?v=1)

Allow your users to use your website while offline easily

### Doc

* **Installation**

Simply import `OfflineHandler.min.js` into your HTML **and** download <a href="https://raw.githubusercontent.com/Zenoo/offline-handler/master/OfflineHandler-sw.min.js" target="_blank">`OfflineHandler-sw.min.js`</a> **at the root of your project**.
```
<script src="https://gitcdn.link/repo/Zenoo/offline-handler/master/OfflineHandler.min.js"></script>	
```
* **How to use**

  * Create a new [`OfflineHandler`](https://zenoo.github.io/offline-handler/OfflineHandler.html) object with the ressources to be cached as the first parameter :
    ```
    let ajax = new OfflineHandler(['path/to/customFile.js'], ...);
    ```  
    
  * Call your URLs with an additional parameter : `?v=1`, or without any to get the default version.
    Changing this parameter will create a new cache version.

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

See this [Github project](https://zenoo.github.io/offline-app-example/?v=1) for a working example.

## Authors

* **Zenoo** - *Initial work* - [Zenoo.fr](https://zenoo.fr)