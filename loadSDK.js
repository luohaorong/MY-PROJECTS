;
(function(window, undefind) {
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
				store.createIndex("nameIndex", "name", {
					unique: true
				});
			};
			console.log("数据库版本更改为" + version);
		};
	};
	dataSDK.prototype.creatStore = function(){
		var This = this;
		var result = this.request;
		console.log(result);
		debugger;
		result.onsuccess = function(e) {
			var db = e.target.result;
			console.log(db.objectStoreNames.contains(This.storeName))
			if(!db.objectStoreNames.contains(This.storeName)) {
				var store = db.createObjectStore(This.storeName);
				console.log(store);
				store.createIndex("nameIndex", "name", {
					unique: true
				});
				console.log("创建了一个数据库集合" + This.storeName);
			};
		};
		result.onerror =function(e){
			console.log(e)
		}
	}

	//添加数据
	dataSDK.prototype.addData = function(dataFelis, fn) {
		var This = this;
		var result = this.request;
		result.onsuccess = function(e) {
			var db = e.target.result;
			var transaction = db.transaction(This.storeName, 'readwrite');
			var store = transaction.objectStore(This.storeName);
			var addRequset = store.add(dataFelis, dataFelis.name);
			addRequset.onsuccess = function(e) {
				fn && fn.call(this, e);
			}
		};
		result.onerror = function(e) {
			console.log(e)
		}
	};
	//更新数据
	dataSDK.prototype.updateDataByKey = function(name, newData, fn) {
		var This = this;
		var result = this.request;
		result.onsuccess = function(e) {
			var db = e.target.result;
			var transaction = db.transaction(This.storeName, 'readwrite');
			var store = transaction.objectStore(This.storeName);
			var index = store.index("nameIndex");
			index.get(name).onsuccess = function(e) {
				var oldData = e.target.result;
				oldData = newData;
				var putData = store.put(oldData, name);
				putData.onsuccess = function(e) {
					fn && fn.call(this, e);
				}
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
		//添加js数据到页面
		addScriptInnerHtml: function(data) {
			var script = document.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.setAttribute("id", data.name);
			script.setAttribute("data-id", data.id);
			script.innerHTML = data.data;
			var head = document.getElementsByTagName("head");
			if(head.length) {
				head[0].appendChild(script);
			} else {
				document.documentElement.appendChild(script)
			}
		},
		//创建script标签
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
			if(head.length) {
				head[0].appendChild(wrap);
			} else {
				document.documentElement.appendChild(wrap)
			}

		},
		//添加样式表到页面
		addStyleInnerHtml: function(data) {
			var styleDOM = document.createElement("style");
			styleDOM.setAttribute("type", "text/css");
			styleDOM.setAttribute("id", data.name);
			styleDOM.setAttribute("data-id", data.id);
			if(styleDOM.stylesheet) {
				//IE
				styleDOM.stylesheet.cssText = data.data;
			} else {
				var cssText = document.createTextNode(data.data);
				styleDOM.appendChild(cssText);
			}
			var head = document.getElementsByTagName("head");
			if(head.length) {
				head[0].appendChild(styleDOM);
			} else {
				document.documentElement.appendChild(styleDOM)
			}
		},
		//创建style标签
		creatStyle: function(data) {
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
			if(head.length) {
				head[0].appendChild(wrap);
			} else {
				document.documentElement.appendChild(wrap)
			}
		},
		//远程拉去数据
		pullData: function(dataList, num, data) {
			var This = this;
			hxr.get(dataList.resourcesSrc, null, function(newData) {
				var dataFelis = {
					id: num,
					name: dataList.name,
					type: dataList.type,
					version: dataList.version,
					data: newData
				};
				This.getDataAddInnerData(data, dataFelis);
			});
		},
		//添加数据到数据库并且输出到页面
		getDataAddInnerData: function(data, dataFelis) {
			var indexDB = new dataSDK(data.name, data.storeName, data.version);
			var dataLength = data.dataList.length;
			var This = this;
			indexDB.addData(dataFelis, function() {
				++count;
				if(count === dataLength) {
					var getDB = new dataSDK(data.name, data.storeName, data.version);
					getDB.getDataByKey(data.dataList, function(getD) {
						This.innerDataByLocal(getD);
					})
				}
			});
		},
		//更新数据
		updateData: function(data) {
			var This = this;
			data.dataList.map(function(item, index) {
				hxr.get(item.resourcesSrc, null, function(pullData) {
					var newData = {
						id: index,
						name: item.name,
						type: item.type,
						version: item.version,
						data: pullData
					}
					This.upDateAddInnerData(data, item.name, newData)
				})
			});
		},
		//更新数据库数据并输出到页面
		upDateAddInnerData: function(data, name, newData) {
			var changeDB = new dataSDK(data.name, data.storeName, data.version);
			var dataLength = data.dataList.length;
			var This = this;
			changeDB.updateDataByKey(name, newData, function(e) {
				++count;
				if(count === dataLength) {
					var getDB = new dataSDK(data.name, data.storeName, data.version);
					getDB.getDataByKey(data.dataList, function(getD) {
						This.innerDataByLocal(getD);
					})
				}
			});
		},
		//不支持本地储存时
		getDataByRemote: function(data) {
			var tmpJs = [];
			var tmpCss = [];
			data.map(function(item) {
				var type = item.type;
				switch(type) {
					case "js":
						tmpJs.push(item);
						break;
					case "css":
						tmpCss.push(item);
						break;
					default:
						;
				}
			})
			window.uilt.creatStyle(tmpCss);
			window.uilt.creatScript(tmpJs);
		},
		//支持本地储存将数据输出到页面
		innerDataByLocal: function(data) {
			switch(data.type) {
				case "js":
					window.uilt.addScriptInnerHtml(data);
					break;
				case "css":
					window.uilt.addStyleInnerHtml(data);
					break;
				default:
					;
			}
		},
		//入口方法
		implement: function(data) {
			hxr = new ajaxFactory;
			var oldVersionData = JSON.parse(sessionStorage.getItem(data.storeName));
			var oldV = oldVersionData ? +oldVersionData.version : 0;
			var oldSubV = oldVersionData ? +oldVersionData.dataList.version : 0;
			var oldName = oldVersionData ? oldVersionData.storeName : "";
			var This = this;
			var resourcesArr = [];
			//判断是否支持本地存储
			if(!window.indexedDB) {
				this.getDataByRemote(data.dataList);
				return false;
			};
			console.log(oldV,data.version)
			if(oldV != +data.version) {
				//所有文件更新
				this.updateData(data);
				sessionStorage.setItem(data.storeName, JSON.stringify(data));
				return false;
			} else {
				//更新个别文件
				data.dataList.map(function(item, index) {
					var newVersion = +item.version;
					var oldVersion = +oldVersionData.dataList[index].version;
					if(newVersion != oldVersion) {
						resourcesArr.push(item);
					}
				});
				resourcesArr.length && resourcesArr.map(function(item, index) {
					hxr.get(item.resourcesSrc, null, function(pullData) {
						var newData = {
							id: item.index,
							name: item.name,
							type: item.type,
							version: item.version,
							data: pullData
						}
						var changeDB = new dataSDK(data.name, data.storeName, data.version);
						var dataLength = resourcesArr.length - 1;
						changeDB.updateDataByKey(item.name, newData, function(e) {
							//为了保证文件输出到页面的顺序,所以必须要全部更新完成后才能去获取
							if(index === dataLength) {
								var getDB = new dataSDK(data.name, data.storeName, data.version);
								//文件全部更新完成后,按照用户给定的文件顺序获取并输出文件到页面
								getDB.getDataByKey(data.dataList, function(getD) {
									This.innerDataByLocal(getD);
								})
							}
						});
					})
				})
			}
			//每个文件都不需要更新,直接从本地获取
			if(!resourcesArr.length) {
				var id = 0;
				var indexDB = new dataSDK(data.name, data.storeName, data.version);
				//从本地获取文件
				indexDB.getDataByKey(data.dataList, function(getData) {
					if(getData) {
						//获取到数据直接输出到页面
						id = getData.id + 1;
						This.innerDataByLocal(getData);
					} else {
						//没有获取本地到数据,去远程拉去数据
						This.pullData(data.dataList[id], id, data);
						++id;
					}
				})

			}
			sessionStorage.setItem(data.storeName, JSON.stringify(data));
		}
	}
})(window);