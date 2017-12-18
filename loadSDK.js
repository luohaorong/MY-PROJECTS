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
};
window.dataSDK = function(name, storeName, version) {
		window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
		window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
		this.storeName = storeName;
		this.name = name;
		this.version = version;
		return request = window.indexedDB.open(name, version);
		
	}
window.dataSDK.prototype = {
	constructor:dataSDK,
	addData: function(data,key) {
		var This = this;
		console.log(this)
		console.log("添加数据");
		var result = this.db;
		var transaction = result.transaction(This.storeName, 'readwrite');
		var store = transaction.objectStore(This.storeName);
		store.add(data,key);
		
		
	},
	upData: function(data,key){
		var This = this;
		console.log("开始更新数据");
		var result = this.db;
		var transaction = result.transaction(This.storeName, 'readwrite');
		var store = transaction.objectStore(This.storeName);
		store.put(data,key);
		console.log("更新数据");
	},
	getDataByKey: function(srcList,fn) {
		var This = this;
		console.log("获取数据");
		console.log(this)
		var result = this.db;
		var transaction = result.transaction(This.storeName, 'readwrite');
		var store = transaction.objectStore(This.storeName);
		srcList.map(function(item,index){
			var indexId = 1000 + index;
			var getRequest = store.get(indexId);
			var data;
			getRequest.onsuccess = function(e) {
				data = e.target.result;
				fn.call(this,data);
			};
		});
	},
	deleteDB:function(name){
            indexedDB.deleteDatabase(name);
   	}
   
}
window.uilt = {
	addScriptInnerHtml : function(data){
		var script = document.createElement("script");
		script.setAttribute("type","text/javascript");
		script.innerHTML = data;
		document.body.appendChild(script);
	},
	creatScript : function(data){
		var wrap = document.createDocumentFragment();
		data.map(function(item){
			var script = document.createElement("script");
				script.setAttribute("type","text/javascript");
				script.setAttribute("src",item);
				wrap.appendChild(script); 
		});
		document.body.appendChild(wrap);
	},
	pullData : function(dataList,num){
		console.log("开始拉取数据");
		var isArray = Object.prototype.toString.call(dataList) === "[object Array]";
		if(isArray){
			dataList.map(function(item,index){
					var indexID = 1000 + index;
					hxr.get(item,null,function(newData){
						var dataFelis = {
							id:indexID,
							data:newData
						};
						window.dataSDK.addData(dataFelis,indexID);
						window.uilt.addScriptInnerHtml(newData);
					});
				})
		}else{
			hxr.get(dataList,null,function(newData){
				var dataFelis = {
					id:num,
					data:newData
				};
				console.log("拉取数据完成");
				window.dataSDK.addData(dataFelis,num);
				window.uilt.addScriptInnerHtml(newData);
			});
		}
	},
	implement:function(data){
		if(data.delet){
			window.dataSDK.deleteDB(data.name);
			window.uilt.creatScript(dataList);
		}else{
			var oldVersionData = JSON.parse(sessionStorage.getItem("versionData"));
			var oldV = oldVersionData ? +oldVersionData.version : 0;
			if(oldV != +data.version){
				window.uilt.pullData(dataList)
			}else{
				var id = 1000;
				window.dataSDK.getDataByKey(dataList,function(getData){
					if(getData){
						id = getData.id + 1;
						window.uilt.addScriptInnerHtml(getData.data);
					}else{
						window.uilt.pullData(dataList[id - 1000],id);
						++id;
					}
				})
			}
		sessionStorage.setItem("versionData",JSON.stringify(data));
	}
	}
}
var dataList = ["/views/loadSDK/jquery.js","/views/loadSDK/common.js","/views/loadSDK/wx.js"]
var hxr = new ajaxFactory;
hxr.get("http://127.0.0.1:3000/123",null,function(data){
	data = JSON.parse(data);
	var indexDB = new dataSDK(data.name,data.storeName,data.version);
	window.uilt.implement(data,indexDB)
})













//
//var _self = this;
//		request.onerror = function(e) {
//			console.log('OPen Error!');
//		};
//		request.onsuccess = function(e) {
//			_self.db = e.target.result;
//		};
//		request.onupgradeneeded = function(e) {
//			_self.db = e.target.result;
//			if(!_self.db.objectStoreNames.contains(storeName)) {
//				_self.db.createObjectStore(storeName, {
//					keyPath: "id"
//				});
//			};
//			console.log("数据库版本更改为" + version);
//		};