import axios from "axios";
import CryptoJS from "crypto-js";
import md5 from "js-md5";
const TOOLS = {};
const defaultOption = {
	signStr: 'r5Bujd6FMCfxSmZGwRk1ythJaDAs2HLq',
	encryptionKey: '123456781234567812345678abcdefgh',
	business_type: 101,
	encrypt: [],
	sort: 'asc' //desc
}

if(!Object.keys) Object.keys = function(o) {
	if(o !== Object(o))
		throw new TypeError('Object.keys called on a non-object');
	var k = [],
		p;
	for(p in o)
		if(Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
	return k;
};
TOOLS.LINK = {
	local: "http://localhost:8999",
	//baseUrl: "http://192.168.0.48:8080", //陈军
	baseUrl: "http://t.api.live.shianxin.net:8888", //测试服
	uploadUrl: "http://t.oss.shianxin.net:8888" //上传固件测试服
}
TOOLS.isArray = function(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
}
//处理参数
TOOLS.auth = function(data, option = defaultOption) {
	return dealData((data) ? data : {}, option);
};
TOOLS.getParam = getParam;
/**
 * 缓存数据
 * @param string key
 * @param object value
 */
TOOLS.cache = (key, value) => {
	if(value === undefined) {
		return sessionStorage.getItem(key);
	} else if(typeof value === 'object') {
		value = JSON.stringify(value);
	}
	sessionStorage.setItem(key, value);
}
//封装axios的get方法
TOOLS.get = (url, param, urlType = "baseUrl") => {
	return new Promise((resolve, reject) => {
		let relUrl = TOOLS.LINK[urlType] + url;
		axios.get(relUrl, {
				params: param
			})
			.then(res => {
				if(res.request.readyState === 4 && (res.status === 200 || res.status === 304)) {
					resolve(res)
				}
			})
			.catch(err => {
				reject(err)
			})
	});
}
//封装axios的post方法
TOOLS.post = (url, param, urlType = "baseUrl") => {
	return new Promise((resolve, reject) => {
		let relUrl = TOOLS.LINK[urlType] + url;
		axios.post(relUrl, param)
			.then(res => {
				if(res.request.readyState === 4 && (res.status === 200 || res.status === 304)) {
					resolve(res)
				}
			})
			.catch(err => {
				reject(err)
			})
	});
}
//封装delete请求
TOOLS.delete = (url, param, urlType = "baseUrl") => {
	return new Promise((resolve, reject) => {
		let relUrl = TOOLS.LINK[urlType] + url;
		axios.delete(relUrl, {
				params: param
			})
			.then(res => {
				if(res.request.readyState === 4 && (res.status === 200 || res.status === 304)) {
					resolve(res)
				}
			})
			.catch(err => {
				reject(err)
			})
	})
}
//封装put请求
TOOLS.put = (url, param, urlType = "baseUrl") => {
	return new Promise((resolve, reject) => {
		let relUrl = TOOLS.LINK[urlType] + url;
		axios.put(relUrl, param)
			.then(res => {
				if(res.request.readyState === 4 && (res.status === 200 || res.status === 304)) {
					resolve(res)
				}
			})
			.catch(err => {
				reject(err)
			})
	})
}
//封装axios的all方法
TOOLS.all = (reqArr) => {
	return new Promise((resolve, reject) => {
		axios.all(reqArr).then((responesArr) => {
			resolve(responesArr)
		}).catch(err => {
			reject(err)
		})
	})
}

//时间格式化
TOOLS.getDate = (seconds, separator) => {
	separator = separator || '.';

	if(seconds == '' || typeof seconds == 'undefined' || seconds == -1) {
		return '';
	}

	let d = new Date();
	d.setTime(seconds * 1000);

	let year = d.getFullYear();
	let month = d.getMonth() + 1;
	let date = d.getDate();
	let hh = d.getHours();
	let mm = d.getMinutes();
	let ss = d.getSeconds();

	return year + separator + (month < 10 ? '0' + month : month) + separator + (date < 10 ? '0' + date : date) +
		" " + (hh < 10 ? '0' + hh : hh) + ":" + (mm < 10 ? '0' + mm : mm) + ":" + (ss < 10 ? '0' + ss : ss);
};

function dealData(data, opt) {
	data['timestamp'] = new Date().getTime();
	if(data) data = sortData(data, opt);
	if(data) {
		data['sign'] = md5(getParam(data) + opt.signStr);
	} else {
		data['sign'] = md5(opt.signStr);
	}
	data['business_type'] = opt.business_type;
	return data;
};
//根据json对象获取路径
function getParam(data) {
	return Object.keys(data).map(function(key) {
		if(typeof data[key] != "string") return key + '=' + JSON.stringify(data[key]);
		else return key + '=' + data[key];
	}).join('&');
};
//DES 加密
function encryptByDES(message, key) {
	var keyHex = CryptoJS.enc.Utf8.parse(key);
	var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Iso10126
	});
	return encrypted.toString();
};

//排序
function sortData(data, opt) {
	var rtf = '';
	var obj = {};
	var arr = Object.keys(data);
	if(data && data['sakura-rtf']) rtf = data['sakura-rtf'];
	if(opt.sort && opt.sort == 'asc') arr.sort(); //升序
	if(opt.sort && opt.sort == 'desc') arr.sort(function(a, b) { //降序
		return a < b;
	});
	arr.map(function(g, s) {
		data = _converters(g, data); //数据转换(16位和以上纯字符串数字转化有问题 超过js最大值)
		if(TOOLS.isArray(opt.encrypt) && opt.encrypt.length > 0) dealEncrypt(g, data, opt); //加密处理
		if(typeof(data[g]) == 'string' && !rtf) data[g] = dealReplace(data[g]); //字符处理
		if(TOOLS.isArray(data[g]) && (typeof data[g][0] === "object")) {
			let tmp = [];
			data[g].map(function(key) { //深层排序
				if(typeof key) {
					return tmp = sortData(key, opt);
				} else {
					return tmp = key;
				}
				data[g] = tmp;
			});
		}
		obj[g] = data[g];
	});
	return obj;
};
//数据转换
function _converters(key, data) {
	try {
		if(isNaN(data[key])) { //false为全数字
			data[key] = JSON.parse(data[key]);
		}
	} catch(err) {}
	return data;
};
//加密处理
function dealEncrypt(key, data, opt) {
	opt.encrypt.map(function(g, s) {
		if(key == g) data[key] = encryptByDES(data[key].replace(/\s+/g, ""), opt.encryptionKey);
	});
};
//字符处理
function dealReplace(str) {
	str = str.replace(/<[^<>]+>/g, ""); //处理特殊标签
	return str;
};

//

export default TOOLS;