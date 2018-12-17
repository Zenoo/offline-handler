/* exported OfflineHandler */

/**
 * Class used to setup the offline access
 */
class OfflineHandler{
	/**
	 * Creates an OfflineHandler instance
	 * @param {String[]}  ressourceList                                List of request paths to cache
	 * @param {String}    [serviceWorkerPath=OfflineHandler-sw.min.js] Path to the OfflineHandler-sw.min.js file
	 * @param {String}    [versionParameter=v]                         Cache version URL parameter
	 * @param {Boolean}   [clearOldCache=false]                        Clear the old versions of the files once a new one is registered ?
	 * @param {Boolean}   [cacheExternalRequests=false]                Cache requests external to the current domain ?
	 */
	constructor(ressourceList, serviceWorkerPath, versionParameter, clearOldCache, cacheExternalRequests){
		/**
		  * Files current version
		  * @type {String}
		  */
		this.version = new URL(location).searchParams.get(versionParameter || 'v') || '1';

		if(this.version){
			/**
			 * Parameters initializer
			 * @private
			 */
			this._parameters = {
				versionParameter: versionParameter || 'v',
				version: this.version,
				serviceWorkerPath: serviceWorkerPath || new URL(location).origin + '/OfflineHandler-sw.min.js',
				ressourceList: (ressourceList || []).concat([location.pathname + '?' + (versionParameter || 'v') + '=' + this.version]),
				clearOldCache: typeof clearOldCache == 'undefined' ? false : clearOldCache,
				cacheExternalRequests: typeof cacheExternalRequests == 'undefined' ? false : cacheExternalRequests
			};

			if('serviceWorker' in navigator){
				navigator.serviceWorker
					.register(this._parameters.serviceWorkerPath + '?param=' + encodeURIComponent(JSON.stringify(this._parameters)));
			}
		}else{
			console.warn('OfflineHandler - Missing version in URL.');
		}
		
	}
}