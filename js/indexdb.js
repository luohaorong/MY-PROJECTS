window.ajaxFactory = function() {
	this.init.apply(this, arguments);
}
window.ajaxFactory.prototype = {
	init: function() {
		this.Xhr = this.creatXhr();
	},
	creatXhr: function() {
		var createXHR;
		if('XMLHttpRequest' in window) {      
			createXHR = function() {   
				return new XMLHttpRequest();  
			};   
		} else if('ActiveXObject' in window) {    
			createXHR = function() {     
				return new ActiveXObject("Msxml2.XMLHTTP");  
			};   
		} else {    
			createXHR = function() {   
				throw new Error("Ajax is not supported by this browser");  
			};   
		}   
		return createXHR();
	},
	param: function(params) {
		var tmp = [];
		for(var i in params) {
			if(params.hasOwnProperty(i)) {
				tmp.push(i + "=" + params[i]);
			}
		}
		return tmp.join("&");
	},
	get: function(url, data, fn) {
		var obj = this.creatXhr();
		var dataParams = this.param(data);
		var newUrl = dataParams ? url + "?" + dataParams : url;
		obj.open("GET", newUrl, true);
		obj.onreadystatechange = function() {
			if(obj.readyState === 4 && (obj.status === 200 || obj.status == 304)) {
				fn.call(this, obj.responseText); //从服务器获得数据
			}
		};
		obj.send(null);
	}
}
window.uilt = {
	addScriptInnerHtml : function(data){
		var script = document.createElement("script");
		script.setAttribute("type","text/javascript");
		script.innerHTML = data;
		document.body.appendChild(script);
	},
}
class IndexedDB{
    constructor(dbName, storeName, version){
        this.storeName = storeName;
        const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
        const request = indexedDB.open(dbName, version);

        request.onsuccess = e => {
            this.db = e.target.result;
            console.log('Init indexedDB successfully');
        };
        request.onupgradeneeded = e => {
            this.db = e.target.result;
           if(!this.db.objectStoreNames.contains(storeName)){
                this.store = this.db.createObjectStore(storeName);
            }
            console.log('DB version changed, db version: ', this.db.version);
        };
        request.onerror = e => {console.info('Can not open indexedDB', e);};
    }
    get(key, callback){
        const transaction = this.db.transaction(this.storeName);
        const objectStore = transaction.objectStore(this.storeName);
        const request = objectStore.get(key);

        request.onerror = e => {console.info('Can not get value', e);};
        request.onsuccess = e => {callback(e.target.result);};
    }
    set(value, key){
        let oldValue;
        this.get(key, function(res){oldValue = res;});

        if(oldValue){
            console.info('You should use function update');
        }else{
            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.add(value, key);

            request.onerror = e => {console.info('Can not add value', e);};
        }
    }
    update(newValue, key){
        const oldValue = this.get(key);

        if(!oldValue){
            console.info('You should use function set');
        }else{
            const transaction = this.db.transaction(this.storeName, 'readwrite');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.put(newValue, key);

            request.onerror = e => {console.info('Can not update value', e);};
        }
    }
    remove(key){
        const request = this.db.transaction(this.storeName, 'readwrite')
                .objectStore(this.storeName)
                .delete(key);
        request.onerror = e => {console.info('Can not remove value', e);};
    }
    close(){
        this.db.close();
    }
};
var indexDB = new IndexedDB;
var dataList = ["/views/loadSDK/jquery.js","/views/loadSDK/wx.js","/views/loadSDK/common.js"]
var hxr = new ajaxFactory;
