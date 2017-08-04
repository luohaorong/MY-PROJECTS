window.bee = {};
var allData={};
/**
 * 所有路径
 */
bee.link = {
	'server': 'http://wechat.huijiuguoji.com',
	'weixin':'http://agency.huijiuguoji.com',
	'cloud': 'http://cloud.huijiuguoji.com',
	'image': 'http://image.huijiuguoji.com',
	'uploadImg':'http://admin.weifanyun.com/upload'
}

/**
 * 获取请求参数
 * @param string name
 */
bee.getQueryString = function(name) {
	if(!name) return '';
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.href.substring(window.location.href.indexOf('?') + 1).match(reg);
	if(r != null) return unescape(r[2]);
	return '';
};
/*
 * 格式化请求参数
 * @param object params
 */
bee.parseQueryString = function (params) {
	var tmp = [];
	for (var i in params) {
		if (params.hasOwnProperty(i)) {
			tmp.push(i + '=' + params[i]);
		}
	}
	return tmp.join('&');
}

/**
 * 缓存数据
 * @param string key
 * @param object value
 */
bee.cache = function (key, value) {
	if (value === undefined) {
		return sessionStorage.getItem(key);
	}else if(typeof value === 'object'){
		value=JSON.stringify(value);
	}
	sessionStorage.setItem(key, value);
}

/**
 * 获取授权码
 */
bee.getCode = function (origin) {
	var queryString = {
		appid: 'wx500d1d09ee93a851',
		redirect_uri: encodeURIComponent(bee.link.cloud + '/wechat/redirectUri?ru=' + bee.link.weixin + '/jump.html&origin=' + origin),
		response_type: 'code',
		scope: 'snsapi_userinfo',
		state: 'STATE#wechat_redirect',
	};
	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + bee.parseQueryString(queryString);
}

/**
 * md5哈希散列值
 * @param string string
 */
bee.md5 = function (string) {
	function RotateLeft(lValue, iShiftBits) {
		return(lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	}

	function AddUnsigned(lX, lY) {
		var lX4, lY4, lX8, lY8, lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		if(lX4 & lY4) {
			return(lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if(lX4 | lY4) {
			if(lResult & 0x40000000) {
				return(lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return(lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return(lResult ^ lX8 ^ lY8);
		}
	}

	function F(x, y, z) {
		return(x & y) | ((~x) & z);
	}

	function G(x, y, z) {
		return(x & z) | (y & (~z));
	}

	function H(x, y, z) {
		return(x ^ y ^ z);
	}

	function I(x, y, z) {
		return(y ^ (x | (~z)));
	}

	function FF(a, b, c, d, x, s, ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function GG(a, b, c, d, x, s, ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function HH(a, b, c, d, x, s, ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function II(a, b, c, d, x, s, ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1 = lMessageLength + 8;
		var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
		var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
		var lWordArray = Array(lNumberOfWords - 1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while(lByteCount < lMessageLength) {
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		lBytePosition = (lByteCount % 4) * 8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
		lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
		lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
		return lWordArray;
	};

	function WordToHex(lValue) {
		var WordToHexValue = "",
			WordToHexValue_temp = "",
			lByte, lCount;
		for(lCount = 0; lCount <= 3; lCount++) {
			lByte = (lValue >>> (lCount * 8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
		}
		return WordToHexValue;
	};

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for(var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if(c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	var x = Array();
	var k, AA, BB, CC, DD, a, b, c, d;
	var S11 = 7,
		S12 = 12,
		S13 = 17,
		S14 = 22;
	var S21 = 5,
		S22 = 9,
		S23 = 14,
		S24 = 20;
	var S31 = 4,
		S32 = 11,
		S33 = 16,
		S34 = 23;
	var S41 = 6,
		S42 = 10,
		S43 = 15,
		S44 = 21;

	string = Utf8Encode(string);

	x = ConvertToWordArray(string);

	a = 0x67452301;
	b = 0xEFCDAB89;
	c = 0x98BADCFE;
	d = 0x10325476;

	for(k = 0; k < x.length; k += 16) {
		AA = a;
		BB = b;
		CC = c;
		DD = d;
		a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
		d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
		c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
		b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
		a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
		d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
		c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
		b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
		a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
		d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
		c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
		b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
		a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
		d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
		c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
		b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
		a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
		d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
		c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
		b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
		a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
		d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
		c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
		b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
		a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
		d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
		c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
		b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
		a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
		d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
		c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
		b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
		a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
		d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
		c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
		b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
		a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
		d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
		c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
		b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
		a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
		d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
		c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
		b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
		a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
		d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
		c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
		b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
		a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
		d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
		c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
		b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
		a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
		d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
		c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
		b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
		a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
		d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
		c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
		b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
		a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
		d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
		c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
		b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
		a = AddUnsigned(a, AA);
		b = AddUnsigned(b, BB);
		c = AddUnsigned(c, CC);
		d = AddUnsigned(d, DD);
	}

	var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

	return temp.toLowerCase();
}

/**
 * 签名算法
 * @param string str
 * @param string salt
 */
bee.sign = function (str, salt) {
	var str1 = str.split('&');
	var tmp1 = [];
	var tmp2 = {};
	var tmp3 = [];
	for(var i = 0; str1[i]; i++) {
		tmp2[str1[i].split('=')[0]] = str1[i].split('=')[1];
		tmp1.push(str1[i].split('=')[0]);
	}
	tmp1.sort(function(a, b) {
		return a.localeCompare(b)
	})
	
	for (var i = 0; tmp1[i]; i++) {
		tmp3.push(tmp1[i] + '=' + tmp2[tmp1[i]]);
	}
	
	var str3 = tmp3.join('&').toUpperCase();
	var str4 = bee.md5(str3);
	var str5 = str4 + salt;
	var sign = bee.md5(str5);
	return sign;
}

/**
 * 请求参数统一签名
 * @param object data
 */
bee.requestSign = function (data) {
	data.token = bee.cache('token');
	data.timestamp = parseInt(bee.cache('diffTimestamp')) + Math.floor(new Date().getTime() / 1000);
	data.sign = bee.sign(bee.parseQueryString(data), bee.cache('salt'));
}

/**
 * get请求
 * @param string url
 * @param object data
 * @param function fn
 * @param boolean isSign
 */
bee.get = function (url, data, fn, isSign) {	
	var result = {};
	for (var i in data) {
		if (data.hasOwnProperty(i)) {
			if (data[i] !== '') {
				result[i] = data[i];
			}
		}
	}
	if (isSign !== undefined && isSign) {
		bee.requestSign(result);
	}
	
	
	url = url + '?' + bee.parseQueryString(result);
	var obj = new XMLHttpRequest(); // XMLHttpRequest对象用于在后台与服务器交换数据          
	obj.open('GET', bee.link.server + url, true);
	obj.onreadystatechange = function() {
		if(obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState==4说明请求已完成
			fn.call(this, JSON.parse(obj.responseText)); //从服务器获得数据
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
bee.post = function (url, data, fn, isSign,isFile) {
	var result = {};
    var obj = new XMLHttpRequest();
	for (var i in data) {
		if (data.hasOwnProperty(i)) {
			if (data[i] !== '') {
				result[i] = data[i];
			}
		}
	}
	
	if (isSign !== undefined && isSign) {
		bee.requestSign(result);
	}
	if(isFile !== undefined && isFile){
        obj.open("POST",bee.link.uploadImg + url, true);
        obj.setRequestHeader("Content-type", "multipart/form-data"); // 发送信息至服务器时内容编码类型
        obj.send(data);
	}else{
		obj.open("POST", bee.link.server + url, true);
		obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
		obj.send(bee.parseQueryString(result));
	}
		obj.onreadystatechange = function() {
			if(obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {// 304未修改
				if(JSON.parse(obj.responseText).error_code=== -1){
						bee.cache('redirectUri', window.location.href);
						sessionStorage.removeItem('token');
						window.location.href=bee.link.weixin + '#/BindAccountPage';
						return;
					}
				fn.call(this, JSON.parse(obj.responseText));
			}
		};
}
bee.currency=function(money){
	return (Number(money)/100).toFixed(2);
}
bee.add=function (num1, num2){
		let r1, r2, m;
		r1 = (''+num1).split('.')[1].length;
		r2 = (''+num2).split('.')[1].length;
		 
		m = Math.pow(10,Math.max(r1,r2));//pow(x,y)表示x的y次幂
		return (num1 * m + num2 * m) / m;
	}
bee.image = function (image, width, height) {
	if (width === undefined && height === undefined) {
		return bee.link.image + image + '/origin';
	}
	if (height === undefined) {
		height = width;
	}
	return bee.link.image + image + '/' + width + 'x' + height;
}
bee.bottomUpwardSlidingDo=function (callback) {
				var start, end, slideNum, winH, bodyH,
					bodyEle = document.querySelector("body"),//获取到body
					docEle = document.documentElement,//获取html
					UA = navigator.userAgent,
					isUC = UA.indexOf("UCBrowser") != -1 || UA.indexOf("Baidu") != -1 || UA.indexOf("MQQBrowser") != -1,
					_h,
					_hStart;//开始的位置
				slideNum = isUC ? 6 : 60; //值越小灵敏度越高
				document.addEventListener("touchstart", touchStartHandle, false);
				!isUC && document.addEventListener("touchend", touchEndHandle, false);
			
				function touchStartHandle(evt) {
					clearTimeout(_hStart);
					_hStart = setTimeout(function() {
						start = evt.touches[0].pageY;
					}, 0);
				}
				isUC && document.addEventListener("touchmove", function(evt) {
					clearTimeout(_h);
					_h = setTimeout(function() {
						touchEndHandle(evt)
					}, 0);
			
				}, false);
			
				function touchEndHandle(evt) {
//					if($.BUDS) return;
					end = evt.changedTouches[0].pageY;
					if(start - end > slideNum) {
						var scrollTop = bodyEle.scrollTop;//滚动的高度
						winH = docEle.clientHeight;//内容可视区域的高度
						bodyH = docEle.scrollHeight;//body的高度
						scrollTop + winH + 1 >= bodyH && callback(); //之所以加1是因为某些情况下会有1PX偏差，当然也可以稍微加大更加灵敏
					}
					console.log(winH,scrollTop,bodyH)
//					console.log(end,start,end-start,bodyH-scrollTop-winH);
			
				}
			
			};
			function lockHtml(evt){
			    evt.preventDefault();
			}
			document.addEventListener("touchmove",lockHtml,false);
			document.removeEventListener("touchmove",lockHtml,false);
