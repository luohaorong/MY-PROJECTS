import React from 'react';
import {Link} from 'react-router';
import Header from '../components/Header';
import Button from '../components/Button';
import RegisterInput from '../components/RegisterInput';
import GetVerification from '../components/GetVerification';
import phone from '../assets/images/register/phone.png';
import yanzheng from '../assets/images/register/yanzhengma.png';
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
class RegisterCompanyAccountPage extends React.Component {
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
			promptError:'请先正确填写所有信息',
			captchaUrl:'',
			captchaUuid:'',
			picture:''
		};
		this.onChildChanged=this.onChildChanged.bind(this);
		this.clickHandler=this.clickHandler.bind(this);
		this.postParent=this.postParent.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
		this.ImgHeadle=this.ImgHeadle.bind(this);
		this.getV=this.getV.bind(this);
		this.getPic=this.getPic.bind(this);
	}
	componentDidMount(){
		bee.pushUrl();
		document.title = '用户注册';
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
	//获取组件的值
	getValue(key){
		return this.refs[key].getValue();
	}
	//当input框失焦时把值用参数的形式传给父组件
	onChildChanged(content,picture){
		this.setState({
			phoneNum:content
		})
	}
	getV(data){
		this.setState({
			picture:data
		})
	}
	postParent(dataKey){
		this.setState({
			keyData:dataKey
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
		let passwordInput=this.getValue('passwordinp');
		let dataKey=this.state.keyData
		let This=this;
		if(phone&&verification&&passwordInput&&dataKey){
			bee.post('/wechat/check/mobile', {
					"mobile":phone,
					"sms_code":verification
				}, function (data) {
						if (data.error_code) {
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
							let registerEntry={
								"mobile":phone,
								"smsCode":verification,
								"passwordInput":passwordInput,
								"share_code":bee.cache('share_code')
							}
							bee.cache('registerEntry',registerEntry);
							dataKey==='agency'?This.context.router.push('/RegisterAgencyPage'):This.context.router.push('/RegisterCompanyPage'); // 手动路由
						}
					});
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
	getPic(data){
		data&&this.ImgHeadle();
	}
	render(){
		let middleImg=true;
		let middleTop=true;
		let headerListContent=[{uuid:'agency',name:'经销商用户注册'},{uuid:'company',name:'企业用户注册'}];
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
		let yanZhengStyle={
			background:'url('+yanzheng+') no-repeat 0.3rem 1.2rem',
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
		    top: '0.5rem',
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
				<Header postParent={this.postParent} headerListContent={headerListContent} middleTop={middleTop} middleImg={middleImg} MiddleTextTop='注册企业账户' />
				<Container className='accountWapper' scrollable={true}>
					<div className='verificationWrapper'>
						<RegisterInput ref='picture' getV={this.getV} inputStyle={inputStyle} bgImgStyle={yanZhengStyle} name='picture' vText='输入图形验证码'/>
						<img className='yanzhengImg' onClick={this.ImgHeadle} src={this.state.captchaUrl}/>
					</div>
					<div className='verificationWrapper'>
						<RegisterInput ref='phone' callbackParent={this.onChildChanged} inputStyle={inputStyle} bgImgStyle={phoneStyle} name='phone' vText='输入手机号'/>
						<GetVerification getPic={this.getPic} captchaUuid={this.state.captchaUuid} picture={this.state.picture} smsType='register' phoneNumber={phoneNumber} btnStyle={btnStyle}/>
					</div>
					<RegisterInput ref='verification' inputStyle={inputStyle} bgImgStyle={varCodeStyle} name='verification ' vText='请输入短信验证码' />
					<RegisterInput ref='passwordinp' inputStyle={inputStyle} bgImgStyle={passwordStyle} type='password' name='password' vText='请输入6位以上密码' />
					<Button btnStyle={submitBtn} content='下一步' onClick={this.clickHandler}/>
					<p className='isagree' style={this.state.agreeStyle} data-agree={this.state.agree}>注册即表示同意
						<a href={bee.link.xieyi} className='linkAgree'>《荟酒网注册协议》</a>
					</p>
				</Container>
			</View>
		)
	}
}
// 静态属性
RegisterCompanyAccountPage.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(RegisterCompanyAccountPage);