import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import FileInput from '../components/FileInput';
import RegisterInput from '../components/RegisterInput';
import '../assets/styles/registerCompany.less';
import RegionalLinkage from '../components/RegionalLinkage';
import {
	Container,
	View,
	Notification
} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class RegisterAgencyPage extends React.Component{
	constructor(props){
		//调用super
		super(props);
		// 初始化状态
		this.state = {
			visible : false,
			errorContent:'请先正确填写所有信息'
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
	//获取区uuid
	getCountyUuid(countyUuid){
		this.setState({
			countyUuid:countyUuid
		})
	}
	componentDidMount(){
		bee.pushUrl();
		document.title = '用户注册';
		if(bee.getQueryString('code')){
			let postData=sessionStorage.getItem('angencyData');
			postData=JSON.parse(postData);
			postData.code=bee.getQueryString('code');
			this.registerPostData(postData);
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
	    });
	    
	}
	//点击提交
	clickHandler(){
		//获取输入框的内容
		let registerEntry=sessionStorage.getItem('registerEntry');
		registerEntry=JSON.parse(registerEntry);
		let countyUuid=this.state.countyUuid;//区县uuid
		let phone=registerEntry.mobile;//手机号
		let verification=registerEntry.smsCode;//验证码
		let passwordInput=registerEntry.passwordInput;//密码
		let share_code=registerEntry.share_code;//分享码
		let type=sessionStorage.getItem('dataSign');//用户注册类型
		let code=bee.getQueryString('code')?bee.getQueryString('code'):sessionStorage.getItem('code');//获取code
		let prompt=this.getValue('prompt');//营业执照
		let idCardP=this.getValue('idCardP');//身份证照
		let idCard=this.getValue('idCard');//身份证号码
		let purchaserName=this.getValue('purchaserName');//法人姓名
		let This=this;//将this存储下来
		let postData={
					"mobile":phone,
					"sms_code":verification,
					"password":bee.md5(passwordInput),
					"share_code":share_code,
					"type":type,
					"code":code,
					"path_img":prompt,
					"id_card":idCard,
					"id_card_img":idCardP,
					"address_uuid":countyUuid,
					"real_name":purchaserName
				}
		bee.cache('angencyData',postData);
		if(prompt&&idCard&&purchaserName&&phone&&verification&&passwordInput&&type&&countyUuid){
			This.registerPostData(postData)
		}else{
			// 如果失败，提示！！
			This.openNotification();
			//  callback
			var timeId = setTimeout(This.closeNotification,3000);
			This.setState({
				timeId : timeId,
				errorContent:'请先正确填写所有信息'
			});
		}
	}
	//提交数据
	registerPostData(postData){
		let This=this;//将this存储下来
		bee.post('/wechat/register',postData, function (data) {
						if (data.error_code===0) {
							bee.localCache('token',data.data.token);
							bee.localCache('salt',data.data.salt);
							bee.localCache('diffTimestamp', data.data.timestamp - Math.floor(new Date().getTime() / 1000));
							This.context.router.push('/TransitionPage');
						}else if(data.error_code === -3){
								bee.getCode('RegisterAgencyPage');
							}else{
								let Error=data.msg;
									// 如果失败，提示！！
									This.openNotification();
									//  callback
									var timeId = setTimeout(This.closeNotification,3000);
									This.setState({
										timeId : timeId,
										errorContent:Error
									});
									return;
								}	
							});
		
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
				          {this.state.errorContent}
			        </Notification>
				<Header middleSub={middleSub} middleTop={middleTop} MiddleTextSub='完善信息' />
				<Container scrollable={true}>
					<Container className='companyInput'>
						<div className='inputWrapper'>
							<RegionalLinkage getCountyUuid={this.getCountyUuid} type='regional' readOnly='readonly' promptText='营业执照地址' name='mainRegion' vText='请选择   >' ref='mainRegion'/>
						</div>
						<div>
							<FileInput ifraName='prompIfr' wapId='firstId' imgId='firstImg' promptText='营业执照' describe='请上传公司营业执照' ref='prompt' name='companyProve'/>
						</div>
						<div className='inputWrapper'>
							<RegisterInput promptText='法人姓名' name='legalPerson' vText='请输入法人姓名' ref='purchaserName'/>
						</div>
						<div className='inputWrapper'>
							<RegisterInput promptText='身份证号' name='userId' vText='请输入身份证号' ref='idCard'/>
						</div>
						<div>
							<FileInput wapId='secondId' imgId='secondImg' promptText='身份证' describe='请上传采购人身份证正面照片' ref='idCardP' name='companyProve'/>
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
RegisterAgencyPage.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(RegisterAgencyPage);