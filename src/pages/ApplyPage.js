import React from 'react';
import {
	Container,
	View,
	Notification
} from 'amazeui-touch';
import FileInput from '../components/FileInput';
import RegisterInput from '../components/RegisterInput';
import applyPage from '../assets/styles/applyPage.less';
import pureRender from 'pure-render-decorator';
class ApplyPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			visible : false,
			errorContent:''
		}
		this.closeNotification = this.closeNotification.bind(this);//提示
		this.getValue = this.getValue.bind(this);
		this.applyClick = this.applyClick.bind(this);//提交
	}
	componentDidMount(){
		document.title='开票申请';
	}
	//获取FileInput组件的图片内容
	getValue(key){
		return this.refs[key].getValue();
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
	applyClick(){
		let companyName = this.getValue('companyName');//公司名称
		let creditCode = this.getValue('creditCode');//信用代码
		let registerAddress = this.getValue('registerAddress');//注册地址
		let kaihuBank = this.getValue('kaihuBank');//开户行
		let kaihuNum = this.getValue('kaihuNum');//开户银行账号
		let companyTel = this.getValue('companyTel');//公司电话
		let receivePeople = this.getValue('receivePeople');//收件人姓名
		let receiveAddress = this.getValue('receiveAddress');//收件人地址
		let receiveTel = this.getValue('receiveTel');//收件人电话
		let prompt=this.getValue('prompt');//营业执照
		let idCardP=this.getValue('idCardP');//一般纳税人资质
		let This = this;
		let orders_uuid=bee.getQueryString('uuid');
		if (companyName&&creditCode&&registerAddress&&kaihuBank&&kaihuNum&&companyTel&&receivePeople&&receiveAddress&&receiveTel&&prompt&&idCardP) {
			bee.post('/wechat/apply/invoice',{
				'orders_uuid':orders_uuid,
				'company':companyName,
				'credit_code':creditCode,
				'company_addr':registerAddress,
				'bank_name':kaihuBank,
				'bank_account':kaihuNum,
				'license_img':prompt,
				'tax_img':idCardP,
				'recipient_person':receivePeople,
				'recipient_addr':receiveAddress,
				'recipient_phone':receiveTel,
				'tel':companyTel
			},function(data){
				if (data.error_code===0) {
					This.context.router.push('/MyOrdersDetailPage');
				}
			},true);
		}else{
			this.openNotification();
			var timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				errorContent:'请完善所有必填信息！'
			});
		}
	}
	render(){
		let order_sn=bee.getQueryString('order_sn');
		return(
			<View>
				<Notification
				          title="荟酒国际提示"
				          amStyle='alert'
				          visible={this.state.visible}
				          animated
				          onDismiss={this.closeNotification}
				        >
				          {this.state.errorContent}
			    </Notification>
			    <Container scrollable={true}>
					<div className="applyPageHead">
						<p>发票金额以实际对公转账金额为准</p>
						<p>订单号:{order_sn}</p>
					</div>
					<div className="applyPageContainer">
						<div className='inputWrapper'>
							<RegisterInput promptText='公司名称' name='companyName' vText='请输入公司名称' ref='companyName'/>
						</div>
						<div className='inputWrapper'>
							<RegisterInput promptText='信用代码' name='creditCode' vText='请输入公司营业执照信用代码' ref='creditCode'/>
						</div>
						<div className='inputWrapper'>
							<RegisterInput promptText='注册地址' name='registerAddress' vText='请输入公司注册地址' ref='registerAddress'/>
						</div>
						<div className='inputWrapper'>
							<RegisterInput promptText='开户银行' name='kaihuBank' vText='请输入公司对公的开户行' ref='kaihuBank'/>
						</div>
						<div className='inputWrapper'>
							<RegisterInput promptText='银行账号' name='kaihuNum' vText='请输入公司对公的银行账号' ref='kaihuNum'/>
						</div>
						<div className='inputWrapper'>
							<RegisterInput promptText='公司电话' name='companyTel' vText='请输入公司电话' ref='companyTel'/>
						</div>
						<div>
							<FileInput ifraName='prompIfr' wapId='firstId' imgId='firstImg' promptText='营业执照' describe='请上传公司营业执照' ref='prompt' name='companyProve'/>
						</div>
						<div>
							<FileInput ifraName='secondId' wapId='secondId' imgId='secondImg' promptText='一般纳税人资质' describe='请上传一般纳税人资质' ref='idCardP' name='companyProve'/>
						</div>
						<div className='inputWrapper'>
							<RegisterInput promptText='收件人姓名' name='receivePeople' vText='请输入收件人姓名' ref='receivePeople'/>
						</div>
						<div className='inputWrapper'>
							<RegisterInput promptText='收件人地址' name='receiveAddress' vText='请输入收件人地址' ref='receiveAddress'/>
						</div>
						<div className='inputWrapper'>
							<RegisterInput promptText='联系人电话' name='receiveTel' vText='请输入收件人地址' ref='receiveTel'/>
						</div>
					</div>
					<input className="applyPageButton" onClick={this.applyClick} type="button" value='提交申请' />
			    </Container>
			</View>
			)
	}
}
ApplyPage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(ApplyPage);