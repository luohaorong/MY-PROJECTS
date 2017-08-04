import React from 'react';
import {Link} from 'react-router';
import Axios from 'axios';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import '../assets/styles/login.less';
import Logo from '../assets/images/logo.png';
import loginIcoPwd from '../assets/images/login/password.png';
import loginIcoAct from '../assets/images/login/account.png';
import Bubble from '../assets/images/login/Bubble.png';
import {View} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class LoginPage extends React.Component {
	//构造器
	constructor(props){
		//调用super
		super(props);
		//初始化状态
		this.state={
			errorPrompt:'',
			title:'登录'
		}
		//初始化逻辑
		this.loginHandler=this.loginHandler.bind(this);
	}
	//获取input组件的value
	getValue(key){
		return this.refs[key].getValue();
	}
	componentDidMount(){
		document.title = this.state.title;
		
	}
	//登录逻辑
	loginHandler(){
		var phoneInput=this.getValue('phoneInput');
		var passwordInput=this.getValue('passwordInput');
		if(phoneInput&&passwordInput){
			this.context.router.push('/index/HomePage'); // 手动路由
			Axios.post('/login', {
			    phone: phoneInput,
			    password: passwordInput
			  })
			  .then(function (response) {
			    alert(response);
			  })
			  .catch(function (error) {
			    this.setState({
			 		errorPrompt:error
				})
			  });
		}
		if(!phoneInput){
			this.setState({
			 	errorPrompt:'请输入正确格式的手机号'
			})
		}else{
			if(!passwordInput){
				this.setState({
			 		errorPrompt:'请输入正确格式的密码'
				})
			}else{
				this.setState({
			 		errorPrompt:''
				})
			}
		}
	}
	render(){
		return(
			<View>
				<div className='loginWap'>
					<section className='logoContainer'>
						<img src={Logo} className='logo'/>
					</section>
					<section className='mainContainer'>
						<FormInput ref='phoneInput' type='text' vText='账号/手机号' name='phone' inputScr={loginIcoAct} />
						<FormInput ref='passwordInput' type='password' vText='请输入登录密码' name='password' inputScr={loginIcoPwd}/>
						<span className='errorPrompt'>{this.state.errorPrompt}</span>
						<div className='btnWap'>
							<Button content='登录' onClick={this.loginHandler}/>
							<img className='bubbleImg' src={Bubble}/>
						</div>
						<p className='otherContent'>
							<Link to='/RegisterCompanyAccountPage' className='forgetPsw'>注册</Link>
							<Link to='/LoginPhonePage' className='dynamicLogin'>手机动态码登录</Link>
						</p>
					</section>
				</div>
			</View>
			
		)
	}
	componentDidMount(){
		
	}
}
// 默认参数
LoginPage.defaultProps = {
    transition: 'rfr'
};
// 静态属性
LoginPage.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};

export default pureRender(LoginPage);
