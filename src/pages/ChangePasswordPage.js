import React from 'react';
import {Link} from 'react-router';
import Header from '../components/Header';
import Button from '../components/Button';
import RegisterInput from '../components/RegisterInput';
import GetVerification from '../components/GetVerification';
import phone from '../assets/images/register/phone.png';
import Key from '../assets/images/register/Key.png';
import passwordImg from '../assets/images/login/password.png';
import '../assets/styles/bindAccountPage.less';
import Axios from 'axios';
import {
	Container,
	View,
	Notification
} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class ChangePasswordPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			visible: false,
			phoneNum:'',
			promptError:'请先正确填写所有信息',
			code:'',
			captchaUrl:''
			
		};
		this.clickHandler=this.clickHandler.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
	}
	componentDidMount(){
		document.title='修改密码';
	}
	getValue(key){
		return this.refs[key].getValue();
	}
	//当input框失焦时把值用参数的形式传给父组件
	onChildChanged(content){
		let postData=sessionStorage.getItem('bindData');
			if(postData){
				postData=JSON.parse(postData);
				this.setState({
					phoneNum:postData.mobile
				})
			}else{
				this.setState({
					phoneNum:content
				})
			}
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

	    })
	}
	clickHandler(){
		let sms_code=this.getValue('verification');
		let new_password=this.getValue('passwordinp1');
		let repeat=this.getValue('passwordinp2');
		let checkpwd = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
		let This=this;
		if (new_password!==repeat) {
			This.setState({
				promptError:'兩次密碼不一致！'
			})
		}
		if (!(new_password&&sms_code&&repeat)) {
			This.setState({
				promptError:'请先正确填写所有信息'
			})
		}
		if (!checkpwd.test(new_password)) {
			This.setState({
				promptError:'密碼格式不正確！'
			})
		}
		if(new_password&&checkpwd.test(new_password)&&sms_code&&repeat&&repeat==new_password){
			bee.post('/wechat/reset/password',{
				'sms_code':sms_code,
				'new_password':bee.md5(new_password),
				'confirm_passwd':bee.md5(repeat)
			},function(data){
				if (data.error_code!==0) {
							let Error=data.msg;
							// 如果失败，提示！！
							This.openNotification();
							//  callback
							var timeId = setTimeout(This.closeNotification,3000);
							This.setState({
								timeId : timeId,
								promptError:Error
							});
							
							return;
						}else{
								alert('修改成功!');
								This.context.router.push('/index/MyInformationPage')
							}
			},true);
		}else{
			// 如果失败，提示！！
			This.openNotification();
			//  callback
			var timeId = setTimeout(This.closeNotification,3000);
			This.setState({
				timeId : timeId
			});
		}
	}
	render(){
		let middleImg=true;
		let middleTop=true;
		let inputStyle={
				outline: 'none',
	            backgroundColor: 'transparent',
	            textIndent: '1rem',
	            textAlign:'left',
	            width:'85%'
		}
		let phoneStyle={
			background:'url('+phone+') no-repeat 0.3rem 1.2rem',
			backgroundSize:'1.25rem',
			width:'2rem',
			height:'3.75rem',
			textIndent:'4rem'
		}
		let varCodeStyle={
			background:'url('+Key+') no-repeat 0.3rem 1.2rem',
			backgroundSize:'1.25rem',
			width:'2rem',
			height:'2.75rem'
		}
		let passwordStyle={
			background:'url('+passwordImg+') no-repeat 0.3rem 1.2rem',
			backgroundSize:'1.25rem',
			width:'2rem',
			height:'2.75rem'
		}
		let submitBtn={
			width:'100%',
			height:'3rem',
			borderRadius:0,
			marginTop:'0.5rem'
		}
		let btnStyle={
			position: 'absolute',
		    top: '0.5rem',
		    right: '1rem'
		}
		let phoneNumber=bee.cache('changeNumber');
		return(
				<View>
				<Notification
				      title="荟酒国际提示"
			          amStyle='alert'
			          visible={this.state.visible}
			          animated
			          onDismiss={this.closeNotification}
			        >
				         {this.state.promptError}
			        </Notification>
				<Container className='accountWapper' scrollable={true}>
					<div className='verificationWrapper'>
						<div className='inputContainer'>
							<span className='promptText' style={phoneStyle}>
								{phoneNumber}
							</span>
						</div>
						<GetVerification smsType='reset_passwd' phoneNumber={phoneNumber} btnStyle={btnStyle}/>
					</div>
					<div className='verificationWrapper'>
						<RegisterInput ref='verification' inputStyle={inputStyle} bgImgStyle={varCodeStyle} name='verification ' vText='请输入本次收到的短信验证码' />
					</div>
					<div className='verificationWrapper'>
						<RegisterInput ref='passwordinp1' type='password' inputStyle={inputStyle} bgImgStyle={passwordStyle} name='passwordinp ' vText='请输入您的密码(6-12位数字、字母)' />
					</div>
					<div className='verificationWrapper'>
						<RegisterInput ref='passwordinp2' type='password' inputStyle={inputStyle} bgImgStyle={passwordStyle} name='passwordinp ' vText='请再次输入您的密码' />
					</div>
					<Button btnStyle={submitBtn} content='修改' onClick={this.clickHandler}/>
				</Container>
			</View>
			)
	}
}
ChangePasswordPage.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(ChangePasswordPage);