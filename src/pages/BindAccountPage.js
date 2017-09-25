import React from 'react';
import {Link} from 'react-router';
import Header from '../components/Header';
import Button from '../components/Button';
import RegisterInput from '../components/RegisterInput';
import GetVerification from '../components/GetVerification';
import phone from '../assets/images/register/phone.png';
import Key from '../assets/images/register/Key.png';
import yanzheng from '../assets/images/register/yanzhengma.png';
import passwordImg from '../assets/images/login/password.png';
import '../assets/styles/bindAccountPage.less';
import Axios from 'axios';
import {
	Container,
	View,
	Notification
} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class BindAccountPage extends React.Component {
	constructor(props){
		super(props);
		this.state={
			visible: false,
			phoneNum:'',
			promptError:'请先正确填写所有信息',
			code:'',
			captchaUrl:'',
			captchaUuid:''
			
		};
		this.onChildChanged=this.onChildChanged.bind(this);
		this.clickHandler=this.clickHandler.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
		this.getV=this.getV.bind(this);
		this.getPic=this.getPic.bind(this);
		this.ImgHeadle=this.ImgHeadle.bind(this);
	}
	componentWillMount(){
		if(bee.localCache('token')){
				this.context.router.push('/index/HomePage');
	        }else if(bee.getQueryString('code') ===''){
				bee.getCode('bind')
			}
	}
	componentDidMount(){
		bee.pushUrl();
		document.title = '绑定账号';
		let This=this;
		bee.cache('code',bee.getQueryString('code'));
		bee.get('/captchaInfo',{},function(data){
			if(data.error_code){
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
				This.setState({
					captchaUrl:data.data.captchaUrl,
					captchaUuid:data.data.captchaUuid
				})	
			}
		})
	}
	//获取组件的值
	getValue(key){
		return this.refs[key].getValue();
	}
	getV(data){
		this.setState({
			picture:data
		})
	}
	getPic(data){
		data&&this.ImgHeadle();
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
	//获取图片
	ImgHeadle(){
		let This=this;
		bee.get('/captchaInfo',{},function(data){
			if(data.error_code){
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
				This.setState({
					captchaUrl:data.data.captchaUrl,
					captchaUuid:data.data.captchaUuid
				})	
			}
		})
	}
//	点击注册时获取子组件的值并发送请求
	clickHandler(){
		let phone=this.getValue('phone');
		let verification=this.getValue('verification');
		let code=bee.getQueryString('code');
		let This=this;
		let postData={
			"mobile":phone,
			"sms_code":verification,
			"code":code,
			"sms_type":'fast_login'

		}
		if(phone&&verification&&code){
			This.registerPostData(postData);
		}else{
			// 如果失败，提示！！
			This.openNotification();
			//  callback
			var timeId = setTimeout(This.closeNotification,3000);
			This.setState({
				timeId : timeId,
				promptError:'请先正确填写所有信息'
			});
		}
	}
	//提交数据
	registerPostData(postData){
		let This=this;//将this存储下来
		bee.post('/wechat/sms/login',postData, function (data) {
						if (data.error_code===0) {
							bee.localCache('token',data.data.token);
							bee.localCache('salt',data.data.salt);
							bee.localCache('diffTimestamp', data.data.timestamp - Math.floor(new Date().getTime() / 1000));
							window.location.href = bee.cache('redirectUri'); // 手动路由
						}else if(data.error_code === -3){
								bee.getCode('againBind');
						}else{ 
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
								}	
							});
		
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
			height:'2.75rem'
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
		let yanZhengStyle={
			background:'url('+yanzheng+') no-repeat 0.3rem 1.2rem',
			backgroundSize:'1.25rem',
			width:'2rem',
			height:'2.75rem'
		}
		let phoneNumber=this.state.phoneNum;
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
						<RegisterInput ref='picture' getV={this.getV} inputStyle={inputStyle} bgImgStyle={yanZhengStyle} name='picture' vText='输入图形验证码'/>
						<img className='yanzhengImg' onClick={this.ImgHeadle} src={this.state.captchaUrl}/>
					</div>
					<div className='verificationWrapper'>
						<RegisterInput ref='phone' callbackParent={this.onChildChanged} inputStyle={inputStyle} bgImgStyle={phoneStyle} name='phone' vText='输入手机号'/>
						<GetVerification getPic={this.getPic} captchaUuid={this.state.captchaUuid} picture={this.state.picture} smsType='fast_login' phoneNumber={phoneNumber} btnStyle={btnStyle}/>
					</div>
					<div className='verificationWrapper'>
						<RegisterInput ref='verification' inputStyle={inputStyle} bgImgStyle={varCodeStyle} name='verification ' vText='请输入短信验证码' />
					</div>
					<Button btnStyle={submitBtn} content='确认绑定' onClick={this.clickHandler}/>
					<Link className='noviceRegister' to='/RegistrationPortalPage'>新手注册</Link>
				</Container>
			</View>
		)
	}
}
// 静态属性
BindAccountPage.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};

export default pureRender(BindAccountPage);