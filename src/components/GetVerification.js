import React from 'react';
import Axios from 'axios';
import pureRender from 'pure-render-decorator';
import '../assets/styles/getVerification.less';
import {
	Notification
} from 'amazeui-touch';
let timer=null;
class GetVerification extends React.Component {
	constructor(props){
		super(props);
		this.state={
			visible : false,
			btnContent:'获取验证码',
			sign:'yes'
		};
		this.clickHeadler=this.clickHeadler.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
	}
	// 打开对话框
    openNotification() {
	    this.setState({
	      visible: true
	    });
    }
	
	// 关闭对话框
	closeNotification() {
	    // 判断是否需要清除定时器
	    if(this.state.timeId){
	    	clearTimeout(this.state.timeId);
	    }
	    
	    this.setState({
	      visible: false,
	      timeId : null
	    });
	    
	}
	clickHeadler(){
		let count=60;
		let This=this;
		let phoneNumber=This.props.phoneNumber;
		let checkphone = /^1[234567890]\d{9}$/;
		let picture=this.props.picture;
		let captchaUuid=this.props.captchaUuid;
		if(This.state.sign==='yes'){
			This.setState({
				sign:'no'
			})
			if (checkphone.test(phoneNumber)&&picture) {
					bee.post('/wechat/get/code', {
						'mobile':This.props.phoneNumber,
						'sms_type' :This.props.smsType,
						'captcha':picture,
						'captchaUuid':captchaUuid
					}, function (data) {
							if (data.error_code) {
								let Error=data.msg;
								// 如果失败，提示！！
								This.openNotification();
								//  callback
								var timeId = setTimeout(This.closeNotification,3000);
								This.setState({
									timeId : timeId,
									promptError:Error,
									sign:'yes'
								});
								This.props.getPic(true);
								return;
							}else{
								timer=setInterval(function(){
									count--;
									This.setState({
										btnContent:count+'s'
									});
									if(count===0){
									clearInterval(timer);
									This.setState({
										btnContent:'重新获取验证码',
										sign:'yes'
										})
									}
								},1000);
							}
						});
			      }else{
					// 如果失败，提示！！
						This.openNotification();
						//  callback
						var timeId = setTimeout(This.closeNotification,3000);
						This.setState({
							timeId : timeId,
							promptError:'请填写图形验证码和手机号码',
							sign:'yes'
						});
			      	
			    }
		}
	}
	componentWillUnmount(){
		clearInterval(timer);
		this.setState({
			btnContent:null,
			sign:null
		})
	}
	render(){
		let btnStyle=this.props.btnStyle||{};
		return(
			<div>
					<Notification
			          title="荟酒国际提示"
			          amStyle='alert'
			          visible={this.state.visible}
			          animated
			          onDismiss={this.closeNotification}
			        >
				         {this.state.promptError}
			        </Notification>
				<p className='btnVer' style={btnStyle} data-sign={this.state.sign} onClick={this.clickHeadler}>{this.state.btnContent}</p>
			</div>
		)
	}
}
export default pureRender(GetVerification);