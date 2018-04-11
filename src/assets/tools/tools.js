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
	//baseUrl: "http://172.16.18.67:8120", //开发环境
	//baseUrl: "http://t.api.live.shianxin.net:8888", //测试服  映射  
	baseUrl: "http://api.live.shianxin.net", //测试服  映射  
   	//baseUrl: "http://192.168.0.87:98", //测试服
   	//baseUrl: "http://172.18.4.46:98", //后台开发环境 本地
 	//baseUrl: "http://192.168.0.48:8080", //测试服  chenjun
//  baseUrl: "http://192.168.3.78:8080", //测试服  liuchun
	uploadUrl: "http://t.oss.shianxin.net:8888" //上传固件测试服
//	uploadUrl : "//oss.shianxin.net"; //正式服
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
TOOLS.post = (url, param, urlType = "baseUrl", config) => {
	return new Promise((resolve, reject) => {
		let relUrl = TOOLS.LINK[urlType] + url;
		axios.post(relUrl, param, config)
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

function dealData(data, opt) {
	data['timestamp'] = new Date().getTime();
	if(data) {
		data = sortData(data, opt);
	}
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
	if(opt.sort && opt.sort == 'asc') {
		arr.sort(); //升序
	}
	if(opt.sort && opt.sort == 'desc') {
		console.log('desc')
		arr.sort(function(a, b) { //降序
			return a < b;
		});
	}
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
			});
			data[g] = tmp;
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
//查找兄弟节点
TOOLS.siblings = function(elm) {
	var arr = [];
	var p = elm.parentNode.children;
	for(var i = 0, pl = p.length; i < pl; i++) {
		if(p[i] !== elm) {
			arr.push(p[i]);
		}
	}
	return arr;
};
export default TOOLS;