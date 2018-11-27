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
	 * @param {Boolean}   [clearOldCache=true]                         Clear the old versions of the files once a new one is registered ?
	 */
	constructor(ressourceList, serviceWorkerPath, versionParameter, clearOldCache){
		/**
		  * Files current version
		  * @type {String}
		  */
		this.version = new URL(location).searchParams.get(versionParameter || 'v');

		if(this.version){
			/**
			 * Parameters initializer
			 * @private
			 */
			this._parameters = {
				version: this.version,
				serviceWorkerPath: serviceWorkerPath || 'OfflineHandler-sw.min.js',
				ressourceList: (ressourceList || []).concat([location.pathname.slice(1) + '?' + (versionParameter || 'v') + '=' + this.version]),
				clearOldCache: typeof clearOldCache == 'undefined' || clearOldCache
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