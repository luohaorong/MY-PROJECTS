import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import FileInput from '../components/FileInput';
import RegisterInput from '../components/RegisterInput';
import RegionalLinkage from '../components/RegionalLinkage';
import '../assets/styles/registerCompany.less';
import {
	Container,
	View,
	Notification
} from 'amazeui-touch';
import Axios from 'axios';
import pureRender from 'pure-render-decorator';
class RegisterCompanyPage extends React.Component{
	constructor(props){
		//调用super
		super(props);
		// 初始化状态
		this.state = {
			visible : false,
			errorContent:{}
		}
		//初始化逻辑
		this.clickHandler=this.clickHandler.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
		this.getCountyUuid=this.getCountyUuid.bind(this);
	}
	//获取FileInput组件的图片内容
	getValue(key){
		return this.refs[key].getValue();
	}
	componentWillMount(){
		if(bee.cache('token')){
			this.context.router.push('/index/HomePage');
      	}
	}
	getCountyUuid(dataKey){
		this.setState({
			countyUuid:dataKey
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
	    });
	    
	}
	//提交数据
	registerPostData(postData){
		let This=this;//将this存储下来
		bee.post('/wechat/register',postData, function (data) {
						if (data.error_code===0) {
							bee.cache('token',data.data.token);
							bee.cache('salt',data.data.salt);
							bee.cache('diffTimestamp', data.data.timestamp - Math.floor(new Date().getTime() / 1000));
							window.location.href = bee.cache('redirectUri');
						}else if(data.error_code === -3){
								bee.getCode('RegisterCompanyPage');
							}else{
								let Error=data.msg;
									// 如果失败，提示！！
									This.openNotification();
									//  callback
									var timeId = setTimeout(This.closeNotification,3000);
									This.setState({
										timeId : timeId,
										errorContent:{Error:Error}
									});
									return;
								}	
							});
		
	}
	componentDidMount(){
		document.title = '用户注册';
		if(bee.getQueryString('code')){
			let postData=sessionStorage.getItem('angencyData');
			postData=JSON.parse(postData);
			postData.code=bee.getQueryString('code');
			this.registerPostData(postData);
		}
	}
	//点击提交
	clickHandler(){
		//获取输入框的内容
		let prompt=this.getValue('prompt');
		let idCard=this.getValue('idCard');
		let companyName=this.getValue('companyName');
		let companyaddress=this.getValue('companyaddress');
		let purchaserName=this.getValue('purchaserName');
		let email=this.getValue('email');
		let userPosition=this.getValue('userPosition');
		let registerEntry=bee.cache('registerEntry');
			registerEntry=JSON.parse(registerEntry);
		let code=bee.cache('registerEntry');
		let countyUuid=this.state.countyUuid;
		let This=this;//将this存储下来
		let postData={
				"mobile":registerEntry.mobile,//电话
				"password":registerEntry.passwordInput,//密码
				"sms_code":registerEntry.sms_code,//短信验证码
				"type":'enterprises',//用户注册类型
				"code":code,//微信code
				"company":companyName,//公司名称
				"addressUuid":countyUuid,//三级联动uuid
				"company_address":companyaddress,//公司地址
				"path_img":prompt,//单位证明图片url
				"email":email||"",//邮箱
				"real_name":purchaserName,//采购人姓名
				"id_card_img":idCard,//采购人身份证图片url
				"duty":userPosition||""//职位
			};
			bee.cache('angencyData',postData);
		if(prompt&&idCard&&companyName&&companyaddress&&purchaserName&&countyUuid){
//			console.log(prompt,idCard,companyName,companyaddress,purchaserName,userId,email,userPosition)
			this.registerPostData(postData);
			// .then(function (response) {
			//     console.log(response);
			//   })
			//   .catch(function (error) {
			//   	// 如果失败，提示！！
			// 		This.openNotification();
			// 		//  callback
			// 		var timeId = setTimeout(This.closeNotification,3000);
			// 		This.setState({
			// 			timeId : timeId,
			// 			errorContent:error
			// 		});
			//   })
		}else{
			// 如果失败，提示！！
			This.openNotification();
			//  callback
			var timeId = setTimeout(This.closeNotification,3000);
			This.setState({
				timeId : timeId,
				errorContent:{
					Error:'请完善必填信息'
				}
			});
		}
	}
	componentWillUnmount(){
		this.setState({
			visible : null,
			errorContent:null,
			dataAttr:null
		})
	}
	render(){
		let middleSub=true;
		let middleTop=true;
		let submitBtn={
			width:'100%',
			height:'3rem',
			borderRadius:0,
			marginTop:0
		}
		let isNecessary=false;
		return (
			<View className='viewWapper'>
				 <Notification
				          title="荟酒国际提示"
				          amStyle='alert'
				          visible={this.state.visible}
				          animated
				          onDismiss={this.closeNotification}
				        >
				          {this.state.errorContent.Error}
			        </Notification>
				<Header middleSub={middleSub} middleTop={middleTop}  MiddleTextSub='完善信息' />
				<Container scrollable={true}>
					<Container className='companyInput'>
						<div className='registerInputWrap'>
							<RegisterInput promptText='企业名称' name='companyName' vText='请输入企业全称' ref='companyName'/>
						</div>
						<div className='registerInputWrap'>
							<RegionalLinkage type='regional' getCountyUuid={this.getCountyUuid} promptText='企业地址' name='mainRegion' readOnly='readonly' vText='请选择   >' ref='mainRegion'/>
						</div>
						<div className='registerInputWrap'>
							<RegisterInput promptText='详细地址' name='companyaddress' vText='企业地址详细地址' ref='companyaddress'/>
						</div>
						<div className='registerInputWrap'>
							<FileInput wapId='firstId' imgId='firstImg' promptText='单位证明' describe='请上传盖有该单位公章的证明文件' ref='prompt' name='companyProve'/>
						</div>
					</Container>
					<Container className='companyInput'>
						<div className='registerInputWrap'>
							<RegisterInput promptText='采购人姓名' name='purchaserName' vText='请输入采购人姓名' ref='purchaserName'/>
						</div>
						<div>
							<FileInput wapId='secondId' imgId='secondImg' promptText='身份证' describe='请上传采购人身份证正面照片' ref='idCard' name='companyProve'/>
						</div>
					</Container>
					<p className='unnecessary'>非必填项</p>
					<Container className='companyInput'>
						<div className='registerInputWrap'>
							<RegisterInput promptText='电子邮件' name='email' vText='请输入您的邮箱地址' isnecessary={isNecessary} ref='email'/>
						</div>
						<div className='registerInputWrap'>
							<RegisterInput promptText='您的职务' name='userPosition' vText='请输入您的部门和职位信息' isnecessary={isNecessary} ref='userPosition'/>
						</div>
					</Container>
					<Container className='promptContainer'>
						<div className='promptWapper'>
							<p className='promptContent'>为了维护您自己的利益，请真实、详尽的填写以下信息
								我们的工作人员将在3个工作日联系您，以便与你完成认证信息</p>
							<p className='promptContent'>上传资料通过审核后，才能查看商品价格</p>
						</div>
						<Button btnStyle={submitBtn} content='提交资料' onClick={this.clickHandler}/>
					</Container>
				</Container>
			</View>
		)
	}
}
// 静态属性
RegisterCompanyPage.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(RegisterCompanyPage);