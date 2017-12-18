var a = 2.0;
;
(function(window, doc, undefind) {
	var _TOOLS = {};
	/**
	 * 请求路径2017/12/7
	 */
	_TOOLS.LINK = {
//		SERVER: "http://t.auth.shianxin.net:8888/",//微信认证地址(测试)
//		GETSERVER: "http://t.esa.shianxin.net:8888/",//业务操作地址（测试）
//		IMPORTSERVER:"http://t.auth.shianxin.net:8888/core"//项目入口地址（测试）
		SERVER: "http://auth.shianxin.net/",//微信认证地址(正式)
		GETSERVER: "http://esa.shianxin.net/",//业务操作地址（正式）
		IMPORTSERVER:"http://auth.shianxin.net/core"//项目入口地址（正式）
	};
	/*
	 * 拦截ajax请求配置
	 */
	_TOOLS.ajaxSetup = function() {
		var config = {
			"before": function() {
				var waitDom = document.getElementById("waitWrap");
				if(!waitDom){
					var waitWrapper = document.createElement("div");
					var img = document.createElement("img");
					waitWrapper.setAttribute("id","waitWrap");
					img.setAttribute("src","img/waiting.gif");
					img.setAttribute("class","waiting");
					waitWrapper.appendChild(img);
					document.body.appendChild(waitWrapper);
				}
			},
			"complete": function() {
				var waitDom = document.getElementById("waitWrap");
				waitDom&&waitDom.parentNode.removeChild(waitDom);			
			}
		};
		return config;
	}
	/**
	 * 获取请求参数
	 * @param string name
	 */
	_TOOLS.getQueryString = function(name) {
		if(!name) return '';
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = decodeURI(window.location.href).substring(window.location.href.indexOf('?') + 1).match(reg);
		if(r != null) return unescape(r[2]);
		return '';
	};
	/*
	 * 格式化请求参数
	 * @param object params
	 */
	_TOOLS.parseQueryString = function(params) {
		var tmp = [];
		for(var i in params) {
			if(params.hasOwnProperty(i)) {
				tmp.push(i + '=' + params[i]);
			}
		}
		return tmp.join('&');
	};
	/**
	 * 缓存数据
	 * @param string key
	 * @param object value
	 */
	_TOOLS.cache = function(key, value) {
		if(value === undefined) {
			return sessionStorage.getItem(key);
		} else if(typeof value === 'object') {
			value = JSON.stringify(value);
		}
		sessionStorage.setItem(key, value);
	}
	_TOOLS.localCache = function(key, value) {
		if(value === undefined) {
			return localStorage.getItem(key);
		} else if(typeof value === 'object') {
			value = JSON.stringify(value);
		}
		localStorage.setItem(key, value);
	}
	/**
	 * 请求参数统一签名
	 * @param object data
	 */
	_TOOLS.requestSign = function(data) {
		if(_TOOLS.cache('token')) {
			data.token = _TOOLS.cache('token');
		}
	};
	/*
	 * 创建xmlHttpRequest对象
	 */
	function createXHR() {   
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
	}
	/**
	 * get请求
	 * @param string url
	 * @param object data
	 * @param function fn
	 * @param boolean isSign
	 */
	_TOOLS.get = function(url, data, fn, isSign) {
		var result = {};
		for(var i in data) {
			if(data.hasOwnProperty(i)) {
				if(data[i]) {
					result[i] = data[i];
				}
			}
		}
		if(isSign !== undefined && isSign) {
			_TOOLS.requestSign(result);
		}
		if(_TOOLS.parseQueryString(result)){
			url = url + '?' + _TOOLS.parseQueryString(result);
		}else{
			url = url;
		}
		var obj = createXHR(); // XMLHttpRequest对象用于在后台与服务器交换数据          
		var tip = document.getElementsByClassName("tip")[0];
		_TOOLS.ajaxSetup().before();
//		obj.open('GET', _TOOLS.LINK.SERVER + url, true);
		obj.open('GET', url, true);
		var timer = setTimeout(function(){
			_TOOLS.ajaxSetup().complete();
			_TOOLS.tipShow(tip,"请求超时");
		},20000);
		obj.onreadystatechange = function() {
//			alert(obj.readyState+"和"+obj.status);
			if(obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) { // readyState==4说明请求已完成
				_TOOLS.ajaxSetup().complete();
				var errcode = +JSON.parse(obj.responseText).errcode
				if( errcode != 0){
					_TOOLS.tipShow(tip,JSON.parse(obj.responseText).errmsg);
				}
				if(errcode === 8 || errcode === 7){
					var host = window.location.pathname.replace(/\/webs\/*/g,"");
					var type = _TOOLS.getQueryString("type");
					_TOOLS.tipShow(tip,"正在重新登录...");
					window.location.href = _TOOLS.LINK.IMPORTSERVER + "?webUrl=" + host + "&type=" + type;
				}
//				alert("已发送成功");
				clearTimeout(timer);
				fn.call(this, JSON.parse(obj.responseText)); //从服务器获得数据
			}else if(obj.status == 500 || obj.status == 502){
				_TOOLS.tipShow(tip,"服务器错误...");
				_TOOLS.ajaxSetup().complete();
				clearTimeout(timer);
			}
		};
		obj.send(null);
	}

	/**
	 * post请求
	 * @param string url
	 * @param object data
	 * @param function fn
	 * @param boolean isSign
	 */
	_TOOLS.post = function(url, data, fn, isSign, isFile) {
		var result = {};
		for(var i in data) {
			if(data.hasOwnProperty(i)) {
				if(data[i]) {
					result[i] = data[i];
				}
			}
		}

		if(isSign !== undefined && isSign) {
			_TOOLS.requestSign(result);
		}
		var obj = createXHR(); // XMLHttpRequest对象用于在后台与服务器交换数据 
		var tip = document.getElementsByClassName("tip")[0];
		_TOOLS.ajaxSetup().before();
		var timer = setTimeout(function(){
			_TOOLS.ajaxSetup().complete();
			_TOOLS.tipShow(tip,"请求超时");
		},20000);
		if(isFile !== undefined && isFile) {
			obj.open("POST", _TOOLS.LINK.UPDATEIMG + url, true);
			obj.setRequestHeader("Content-type", "multipart/form-data"); // 发送信息至服务器时内容编码类型
			obj.send(data);
		} else {
//			obj.open("POST", _TOOLS.LINK.SERVER + url, true);
			obj.open("POST", url, true);
			obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
			obj.send(_TOOLS.parseQueryString(result));
		}
		obj.onreadystatechange = function() {
			if(obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) { // 304未修改
				_TOOLS.ajaxSetup().complete();
				if(JSON.parse(obj.responseText).errcode != 0){
					_TOOLS.tipShow(tip,JSON.parse(obj.responseText).errmsg);
				}
				if(errcode === 8){
					var host = window.location.pathname.replace("/","");
					var type = _TOOLS.getQueryString("type");
					_TOOLS.tipShow(tip,"正在重新登录...");
					window.location.href = _TOOLS.LINK.IMPORTSERVER + "?webUrl=/" + host + "&type=" + type;
				}
				clearTimeout(timer);
				fn.call(this, JSON.parse(obj.responseText));
			}else if(obj.status == 500 || obj.status == 502){
				_TOOLS.tipShow(tip,"服务器错误...");
				_TOOLS.ajaxSetup().complete();
				clearTimeout(timer);
			}
		}
	}

	/*
	 * 询问框功能
	 * 
	 */
	_TOOLS.enquireFrame = function(wrapDom, cancle, sure, sureCalback,src,data) {
		wrapDom.style.display = 'block';
		document.body.style.overflow = 'hidden';
		cancle.onclick = function() {
			wrapDom.style.display = 'none';
			document.body.style.overflow = 'auto';
			return false;
		};
		sure.onclick = function() {
			wrapDom.style.display = 'none';
			document.body.style.overflow = 'auto';
			sureCalback && sureCalback(src,data);
			return false;
		}

	}
	_TOOLS.tipShow = function(tip, text) {
		if(tip.textContent) {
			tip.textContent = text;
		} else {
			tip.innerText = text;
		}
		var isMiddle = tip.getAttribute('class');
		if(isMiddle.indexOf('middle') === -1) {
			tip.setAttribute('class', 'tip middle');
			setTimeout(function() {
				tip.setAttribute('class', 'tip isHide middle');
			}, 2000);
			setTimeout(function() {
				tip.setAttribute('class', 'tip');
			}, 3000)
		}
	}
	//查找兄弟节点
	_TOOLS.siblings = function(elm) {
		var arr = [];
		var p = elm.parentNode.children;
		for(var i = 0, pl = p.length; i < pl; i++) {
			if(p[i] !== elm) {
				arr.push(p[i]);
			}
		}
		return arr;
	};
	//批量改变节点文本
	_TOOLS.changeText = function(domArr,textArr,indexArr){
		var count = 0;
		if(document.body.textContent){
			domArr.map(function(item,index){
				if(Object.prototype.toString.call(textArr[index])=='[object Array]'){
					item.textContent = textArr[index][indexArr[count]];
					count++;
				}else{
					item.textContent = textArr[index];
				}
			});
		}else{
			domArr.map(function(item,index){
				if(Object.prototype.toString.call(textArr[index])=='[object Array]'){
					item.innerText = textArr[index][indexArr[count]];
					count++;
				}else{
					item.innerText = textArr[index];
				}
			});
		}
	}
	//	获取code和state
	_TOOLS.getCode = function(callBack){
		var code = _TOOLS.getQueryString("code");
		var state = _TOOLS.getQueryString("state");
		_TOOLS.cache("code",code);
		_TOOLS.cache("token",state);//token
		_TOOLS.get(_TOOLS.LINK.SERVER + "wx/jsApiSign",{
			code:code,
			state:state
		},function(data){
			_TOOLS.cache("configData",data.info);
			callBack&&callBack();
		});
	};
	/*
	 * 微信扫一扫
	 */
	_TOOLS.wxScan = function(searchContent,searchChang) {
		var tip = document.getElementsByClassName('tip')[0];
		var data = JSON.parse(_TOOLS.cache("configData"));
		wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.appId, // 必填，公众号的唯一标识
				timestamp: data.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.nonceStr, // 必填，生成签名的随机串
				signature: data.signature, // 必填，签名，见附录1
				jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		wx.ready(function() {
			// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			wx.scanQRCode({
				needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
				success: function(res) {
					var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					searchContent.value = result;
					searchChang&&searchChang();
				},
				fail: (res) => {
					_TOOLS.tipShow(tip, "操作失败");
				}
			});
		});
		wx.error(function(res) {
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			console.log(res);
		});
	};
	//base64编码
	_TOOLS.Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = _TOOLS.Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = _TOOLS.Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

};
/*
 * CRC32算法
 */
_TOOLS.GetCrc32 = function (Instr) {
	console.log(Instr,window.Crc32Table)
    if(typeof(window.Crc32Table) == "undefined"){
    	window.Crc32Table=new Array(256);  
    	var i,j;  
    	var Crc;  
    	for(i=0; i<256; i++)  
    	{  
    	    Crc=i;  
    	    for(j=0; j<8; j++)  
    	    {  
    	        if(Crc & 1)  
    	            Crc=((Crc >> 1)& 0x7FFFFFFF) ^ 0xEDB88320;  
    	        else  
    	            Crc=((Crc >> 1)& 0x7FFFFFFF);  
    	    }  
    	    Crc32Table[i]=Crc;  
    	}
    };
    if (typeof Instr != "string") Instr = "" + Instr;  
    Crc=0xFFFFFFFF;  
    for(i=0; i<Instr.length; i++)  
        Crc=((Crc >> 8)&0x00FFFFFF) ^ Crc32Table[(Crc & 0xFF)^ Instr.charCodeAt(i)];  
    Crc ^=0xFFFFFFFF;  
    return Crc;  
}  
	//获取元素样式
	_TOOLS.getStyle = function (obj,name){
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    }else{
        return getComputedStyle(obj,false)[name];
    }
}

	window._TOOLS = _TOOLS;
})(window, document)





