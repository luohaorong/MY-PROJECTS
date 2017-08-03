import React from 'react';

class Ajax extends React.Component{
	let ajaxType=this.props.type;
	let ajaxUrl=this.props.ajaxUrl;
	let isAsync=this.props.async;
	let parameter=this.props.parameter;
	createXMLHTTPRequest() {
	//1.创建XMLHttpRequest对象     
	//这是XMLHttpReuquest对象无部使用中最复杂的一步     
	//需要针对IE和其他类型的浏览器建立这个对象的不同方式写不同的代码     
	var xmlHttpRequest;
	if(window.XMLHttpRequest) {
		//针对FireFox，Mozillar，Opera，Safari，IE7，IE8     
		xmlHttpRequest = new XMLHttpRequest();
		//针对某些特定版本的mozillar浏览器的BUG进行修正     
		if(xmlHttpRequest.overrideMimeType) {
			xmlHttpRequest.overrideMimeType("text/xml");
		}
	} 
	return xmlHttpRequest;
}
//get方法
get() {
	var req = createXMLHTTPRequest();
	if(req) {
		req.open(ajaxType, ajaxUrl, isAsync);
		req.onreadystatechange = function() {
			if(req.readyState == 4) {
				if(req.status == 200) {
					return req;
				} else {
					alert(req.message);
				}
			}
		}
		req.send(null);
	}
}
//post方法
post() {
	var req = createXMLHTTPRequest();
	if(req) {
		req.open(ajaxType, ajaxUrl, isAsync);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=gbk;");
		req.send(parameter);
		req.onreadystatechange = function() {
			if(req.readyState == 4) {
				if(req.status == 200) {
					return req;
				} else {
					alert(req.message);
				}
			}
		}
	}
}
}
Ajax.propTypes = {
    ajaxUrl: React.PropTypes.string,
    ajaxType:React.PropTypes.string,
    isAsync:React.prototypes.bool,
    parameter:React.propTypes.object
};
Ajax.defaultProps = {
	ajaxType:'GET',
	isAsync:true
};
export default Ajax;