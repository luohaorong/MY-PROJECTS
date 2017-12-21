;(function(window, undefind) {
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	var count = 0;
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
					fn && fn.call(this, obj.responseText); //从服务器获得数据
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
					fn && fn.call(this, obj.responseText); //从服务器获得数据
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
				var store = db.createObjectStore(storeName);
				store.createIndex("nameIndex","name",{unique:true});
			};
			console.log("数据库版本更改为" + version);
		};
	};
	//添加数据
	dataSDK.prototype.addData = function(dataFelis,fn) {
		var This = this;
		var result = this.request;
		
		result.onsuccess = function(e) {
			var db = e.target.result;
			var transaction = db.transaction(This.storeName, 'readwrite');
			var store = transaction.objectStore(This.storeName);
			var addRequset = store.add(dataFelis,dataFelis.name);
			addRequset.onsuccess = function(e){
				var data = e;
				fn && fn.call(this,data);
			}
		};
		result.onerror = function(e) {
			console.log(e)
		}
	};
	//更新数据
	dataSDK.prototype.updateDataByKey = function(name,newData){
			var This = this;
			var result = this.request;
			result.onsuccess = function(e) {
				var db = e.target.result;
				var transaction=db.transaction(This.storeName,'readwrite'); 
				var store=transaction.objectStore(This.storeName); 
				var request=store.get(name); 
				request.onsuccess=function(e){ 
				    var oldData=e.target.result;
				    oldData = newData;
				    store.put(oldData); 
				};
			}
}
	//获取数据
	dataSDK.prototype.getDataByKey = function(srcList, fn) {
		var This = this;
		var result = this.request;
		result.onsuccess = function(e) {
			var db = e.target.result;
			var transaction = db.transaction(This.storeName, 'readwrite');
			var store = transaction.objectStore(This.storeName);
			srcList.map(function(item) {
				var index = store.index("nameIndex");
				index.get(item.name).onsuccess = function(e) {
					var data = e.target.result;
					fn && fn.call(this, data);
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
			script.setAttribute("id", data.name);
			script.setAttribute("data-id", data.id);
			script.innerHTML = data.data;
			var head = document.getElementsByTagName("head");
			if(head.length){
				head[0].appendChild(script);
			}else{
				document.documentElement.appendChild(script)
			}
		},
		creatScript: function(data) {
			var wrap = document.createDocumentFragment();
			data.map(function(item) {
				var script = document.createElement("script");
				script.setAttribute("type", "text/javascript");
				script.setAttribute("src", item.resourcesSrc);
				script.setAttribute("id", item.name);
				wrap.appendChild(script);
			});
			var head = document.getElementsByTagName("head");
			if(head.length){
				head[0].appendChild(wrap);
			}else{
				document.documentElement.appendChild(wrap)
			}
			
		},
		addStyleInnerHtml: function(data) {
			var styleDOM = document.createElement("style");
			styleDOM.setAttribute("type", "text/css");
			styleDOM.setAttribute("id", data.name);
			styleDOM.setAttribute("data-id", data.id);
			if(styleDOM.stylesheet){
				//IE
				styleDOM.stylesheet.cssText = data.data;
			}else{
				var cssText = document.createTextNode(data.data);
				styleDOM.appendChild(cssText);
			}
			var head = document.getElementsByTagName("head");
			if(head.length){
				head[0].appendChild(styleDOM);
			}else{
				document.documentElement.appendChild(styleDOM)
			}
		},
		creatStyle: function(data){
			var wrap = document.createDocumentFragment();
			data.map(function(item) {
				var linkDOM = document.createElement("link");
				linkDOM.setAttribute("rel", "stylesheet");
				linkDOM.setAttribute("type", "text/css");
				linkDOM.setAttribute("href", item.resourcesSrc);
				linkDOM.setAttribute("id", item.name);
				wrap.appendChild(linkDOM);
			});
			var head = document.getElementsByTagName("head");
			if(head.length){
				head[0].appendChild(wrap);
			}else{
				document.documentElement.appendChild(wrap)
			}
		},
		pullData: function(dataList, num, data) {
			var isArray = Object.prototype.toString.call(dataList) === "[object Array]";
			var This = this;
			var dataLength = data.dataList.length;
			if(isArray) {
				console.log("数组")
				var len = dataList.length;
				dataList.map(function(item, index) {
					hxr.get(item.resourcesSrc, null, function(newData) {
						var dataFelis = {
							id: index,
							name:item.name,
							type:item.type,
							data: newData
						};
						var indexDB = new dataSDK(data.name, data.storeName, data.version);
						indexDB.addData(dataFelis,function(){
							++count;
							if(count === dataLength){
								var getDB = new dataSDK(data.name, data.storeName, data.version);
								getDB.getDataByKey(dataList,function(getD){
									This.innerDataByLocal(getD);
								})
							}
						});
					});
				});
			} else {
				console.log("不是数组")
				hxr.get(dataList.resourcesSrc, null, function(newData) {
					var dataFelis = {
						id: num,
						name:dataList.name,
						type:dataList.type,
						data: newData
					};
					var indexDB = new dataSDK(data.name, data.storeName, data.version);
					indexDB.addData(dataFelis,function(){
						++count;
						if(count === dataLength){
							var getDB = new dataSDK(data.name, data.storeName, data.version);
							getDB.getDataByKey(data.dataList,function(getD){
								This.innerDataByLocal(getD);
							})
						}
					});

				});
			}
		},
		getDataByRemote: function(data){
			var tmpJs = [];
			var tmpCss = [];
			data.map(function(item){
				var type = item.type;
				switch(type){
					case "js":
					tmpJs.push(item);
					break;
					case "css":
					tmpCss.push(item);
					break;
					default:;
				}
			})
			window.uilt.creatStyle(tmpCss);
			window.uilt.creatScript(tmpJs);
		},
		innerDataByLocal: function(data){
			switch(data.type){
				case "js":
				window.uilt.addScriptInnerHtml(data);
				break;
				case "css":
				window.uilt.addStyleInnerHtml(data);
				break;
				default:;
			}
		},
		implement: function(data, firstIndexDB) {
			hxr = new ajaxFactory;
			var This = this;
			if(!window.indexedDB){
				this.getDataByRemote(data.dataList);
				return;
			};
			if(data.delet) {
				firstIndexDB.deleteDB(data.name);
				this.getDataByRemote(data.dataList);
				return;
			} else {
				var oldVersionData = JSON.parse(sessionStorage.getItem("versionData"));
				var oldV = oldVersionData ? +oldVersionData.version : 0;
				var oldSubV = oldVersionData ? +oldVersionData.dataList.version : 0;
				if(oldV != +data.version) {
					window.uilt.pullData(data.dataList, null, data)
				} else {
					var id = 0;
					var indexDB = new dataSDK(data.name, data.storeName, data.version);
					indexDB.getDataByKey(data.dataList, function(getData) {
						if(getData) {
							id = getData.id + 1;
							This.innerDataByLocal(getData);
						} else {
							window.uilt.pullData(data.dataList[id], id, data);
							++id;
						}
					})
				}
				sessionStorage.setItem("versionData", JSON.stringify(data));
			}
		}
	}
})(window);