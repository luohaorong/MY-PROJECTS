;
(function(window, undefind) {
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	//创建ajax
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
		},
		post: function(url, data, fn) {
			var obj = this.creatXhr();
			var dataParams = this.param(data);
			obj.open("POST", url, true);
			obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
			obj.onreadystatechange = function() {
				if(obj.readyState === 4 && (obj.status === 200 || obj.status == 304)) {
					fn.call(this, obj.responseText); //从服务器获得数据
				}
			};
			obj.send(dataParams);
		}
	};
	//创建indexedDB数据库
	window.dataSDK = function(name, storeName, version) {
		this.storeName = storeName;
		this.name = name;
		this.version = version;
		this.request = window.indexedDB.open(name, version);
		this.request.onupgradeneeded = function(e) {
			var db = e.target.result;
			if(!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, {
					keyPath: "id"
				});
			};
			console.log("数据库版本更改为" + version);
		};
	};
	//添加数据
	dataSDK.prototype.addData = function(dataFelis) {
		var This = this;
		var result = this.request;
		result.onsuccess = function(e) {
			var db = e.target.result;
			var transaction = db.transaction(This.storeName, 'readwrite');
			var store = transaction.objectStore(This.storeName);
			store.add(dataFelis);
		};
		result.onerror = function(e) {
			console.log(e)
		}
	};
	//获取数据
	dataSDK.prototype.getDataByKey = function(srcList, fn) {
		var This = this;
		var result = this.request;
		result.onsuccess = function(e) {
			var db = e.target.result;
			var transaction = db.transaction(This.storeName, 'readwrite');
			var store = transaction.objectStore(This.storeName);
			srcList.map(function(item, index) {
				var indexId = 1000 + index;
				var getRequest = store.get(indexId);
				getRequest.onsuccess = function(e) {
					data = e.target.result;
					fn.call(this, data);
				};
			});
		}
		result.onerror = function(e) {
			console.log(e)
		}
	};
	dataSDK.prototype.deleteDB = function(name) {
		indexedDB.deleteDatabase(name);
	};

	//工具类方法
	window.uilt = {
		addScriptInnerHtml: function(data) {
			var script = document.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.innerHTML = data;
			document.getElementsByTagName("head")[0].appendChild(script);
		},
		creatScript: function(data) {
			var wrap = document.createDocumentFragment();
			data.map(function(item) {
				var script = document.createElement("script");
				script.setAttribute("type", "text/javascript");
				script.setAttribute("src", item);
				wrap.appendChild(script);
			});
			document.getElementsByTagName("head")[0].appendChild(wrap);
		},
		pullData: function(dataList, num, data) {
			var isArray = Object.prototype.toString.call(dataList) === "[object Array]";
			if(isArray) {
				dataList.map(function(item, index) {
					var indexID = 1000 + index;
					hxr.get(item, null, function(newData) {
						var dataFelis = {
							id: indexID,
							data: newData
						};
						var indexDB = new dataSDK(data.name, data.storeName, data.version);
						indexDB.addData(dataFelis, indexID);
						window.uilt.addScriptInnerHtml(newData);
					})
				});
			} else {
				hxr.get(dataList, null, function(newData) {
					var dataFelis = {
						id: num,
						data: newData
					};
					var indexDB = new dataSDK(data.name, data.storeName, data.version);
					indexDB.addData(dataFelis, num);
					window.uilt.addScriptInnerHtml(newData);
				});
			}
		},
		implement: function(data, firstIndexDB) {
			hxr = new ajaxFactory;
			if(!window.indexedDB){
				window.uilt.creatScript(data.dataList);
				return;
			};
			if(data.delet) {
				firstIndexDB.deleteDB(data.name);
				window.uilt.creatScript(data.dataList);
				return;
			} else {
				var oldVersionData = JSON.parse(sessionStorage.getItem("versionData"));
				var oldV = oldVersionData ? +oldVersionData.version : 0;
				if(oldV != +data.version) {
					window.uilt.pullData(data.dataList, null, data)
				} else {
					var id = 1000;
					var indexDB = new dataSDK(data.name, data.storeName, data.version);
					indexDB.getDataByKey(data.dataList, function(getData) {
						if(getData) {
							id = getData.id + 1;
							window.uilt.addScriptInnerHtml(getData.data);
						} else {
							window.uilt.pullData(data.dataList[id - 1000], id, data);
							++id;
						}
					})
				}
				sessionStorage.setItem("versionData", JSON.stringify(data));
			}
		}
	}
})(window);