import React from 'react';
import pureRender from 'pure-render-decorator';//优化性能
class Jump extends React.Component{
	componentWillMount(){
		if (bee.getQueryString('origin')==='login') {
			    	bee.post('/wechat/login', { code: bee.getQueryString('code') }, function (data) {
			    		if (data.error_code === 0) {
				    		bee.localCache('token', data.data.token);
				    		bee.localCache('salt', data.data.salt);
				    		bee.localCache('diffTimestamp', data.data.timestamp - Math.floor(new Date().getTime() / 1000));
				    		window.location.href = bee.cache('redirectUri');
			    		}
			    	});
		    	}else if(bee.getQueryString('origin')==='bind'){
		    		this.context.router.push('/BindAccountPage?code=' + bee.getQueryString('code')); // 手动路由
//		    		window.location.href = bee.link.weixin + '/BindAccountPage?code=' + bee.getQueryString('code');
		    	}else if(bee.getQueryString('origin')==='RegisterAgencyPage'){
		    		this.context.router.push('/RegisterAgencyPage?code=' + bee.getQueryString('code')); // 手动路由
//		    		window.location.href = bee.link.weixin + '/RegisterAgencyPage?code=' + bee.getQueryString('code');
		    	}else if(bee.getQueryString('origin')==='RegisterCompanyPage'){
//		    		window.location.href = bee.link.weixin + '/RegisterCompanyPage?code=' + bee.getQueryString('code');
		    		this.context.router.push('/RegisterCompanyPage?code=' + bee.getQueryString('code')); // 手动路由
		    	}else if(bee.getQueryString('origin')==='againBind'){
//		    		window.location.href = bee.link.weixin + '/BindAccountPage?code=' + bee.getQueryString('code')+'&type=againBind';
		    		this.context.router.push('/BindAccountPage?code=' + bee.getQueryString('code')); // 手动路由
		    	}else if(bee.getQueryString('origin')==='GuidePage'){
		    		var isCode = bee.cache('share_code') ?'&code=':'?code=';
		    		window.location.href = bee.cache('redirectUri') + isCode + bee.getQueryString('code');
		    	}
	}
	render(){
		return (
			<img src='/assets/images/loading.gif'/>
		)
	}
}
// 静态属性
Jump.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(Jump);
