import axios from "axios";
const TOOLS = {};
TOOLS.LINK = {
	local:"http://localhost:8080",
	baseUrl : "http://192.168.0.87:98",//测试服
	uploadUrl : "http://t.oss.shianxin.net:8888"//上传固件测试服
}
/**
 * 缓存数据
 * @param string key
 * @param object value
 */
TOOLS.cache = (key, value) => {
	if (value === undefined) {
		return sessionStorage.getItem(key);
	}else if(typeof value === 'object'){
		value=JSON.stringify(value);
	}
	sessionStorage.setItem(key, value);
}
//封装axios的get方法
TOOLS.get = (url,param,urlType = "baseUrl")=>{
	return new Promise((resolve, reject) => {
		let relUrl = TOOLS.LINK[urlType] + url;
		axios.get(relUrl,{
			params:param
		})
		.then(res=>{
			if(res.request.readyState === 4 && (res.status === 200 || res.status === 304)){
				resolve(res)
			}
		})
		.catch(err=>{
			reject(err)
		})
	});
}
//封装axios的post方法
TOOLS.post = (url,param,urlType = "baseUrl")=>{
	return new Promise((resolve, reject) => {
		let relUrl = TOOLS.LINK[urlType] + url;
		axios.post(relUrl,param)
		.then(res=>{
			if(res.request.readyState === 4 && (res.status === 200 || res.status === 304)){
				resolve(res)
			}
		})
		.catch(err=>{
			reject(err)
		})
	});
}
//封装axios的all方法
TOOLS.all = (reqArr)=>{
	return new Promise((resolve,reject)=>{
		axios.all(reqArr).then((responesArr)=>{
			resolve(responesArr)
		}).catch(err=>{
			reject(err)
		})
	})
}
export default TOOLS;