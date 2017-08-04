import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import RegisterInput from '../components/RegisterInput';
import GetVerification from '../components/GetVerification';
import phone from '../assets/images/register/phone.png';
import Key from '../assets/images/register/Key.png';
import passwordImg from '../assets/images/login/password.png';
import '../assets/styles/registerCompanyAccount.less';
import Axios from 'axios';
import {
	Container,
	View,
	Notification
} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class LoginPhonePage extends React.Component {
	constructor(props){
		super(props);
		this.state={
			agree:'yes',
			visible: false,
			agreeStyle:{
				width:'90%',
				margin:'2rem auto',
				textAlign:'left',
				color:'#666666'
			},
			phoneNum:'',
			keyData:'',
			promptError:'请先正确填写所有信息'
		};
		this.onChildChanged=this.onChildChanged.bind(this);
		this.clickHandler=this.clickHandler.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
	}
	//获取组件的值
	getValue(key){
		return this.refs[key].getValue();
	}
	//当input框失焦时把值用参数的形式传给父组件
	onChildChanged(content){
		this.setState({
			phoneNum:content
		})
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
//	点击注册时获取子组件的值并发送请求
	clickHandler(){
		let phone=this.getValue('phone');
		let verification=this.getValue('verification');
		let This=this;
		console.log(phone,verification)
		if(phone&&verification){
			this.context.router.push('/index'); // 手动路由
			Axios.post('/register',{
				phone:phone,
				verification:verification
			})
			.then(function(response){
				console.log(response)
			})
			.catch(function(error){
				let Error=error.Error;
				// 如果失败，提示！！
				This.openNotification();
				//  callback
				var timeId = setTimeout(This.closeNotification,3000);
				This.setState({
					timeId : timeId,
					promptError:Error
				});
			})
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
			marginTop:'10px'
		}
		let btnStyle={
			position: 'absolute',
		    top: '3.1rem',
		    right: '1rem'
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
				<Header middleTop={middleTop} MiddleTextTop='手机动态码登录' />
				<Container className='accountWapper' scrollable={true}>
					<RegisterInput ref='phone' callbackParent={this.onChildChanged} inputStyle={inputStyle} bgImgStyle={phoneStyle} name='phone' vText='输入手机号'/>
					<RegisterInput ref='verification' inputStyle={inputStyle} bgImgStyle={varCodeStyle} name='verification ' vText='请输入短信验证码' />
					<Button btnStyle={submitBtn} content='登录' onClick={this.clickHandler}/>
					<GetVerification phoneNumber={phoneNumber} btnStyle={btnStyle}/>
				</Container>
			</View>
		)
	}
}
// 静态属性
LoginPhonePage.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(LoginPhonePage);