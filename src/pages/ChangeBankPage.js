import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/cashApplay.less';
import '../assets/styles/changeBankPage.less';
import RegisterInput from '../components/RegisterInput';
import Button from '../components/Button';
import Bank from '../components/Bank';
import {
	Notification
} from 'amazeui-touch';
class ChangeBankPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			visible : false
		}
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
	//获取组件的value
	getValue(key){
		return this.refs[key].getValue();
	}
	clickHeadler(){
		let that=this;
		let userName=this.getValue('userName');
		let idCard=this.getValue('idCard');
		let cardNumber=this.getValue('cardNumber');
		let bankName=this.getValue('bankName');
		let pwd=this.getValue('pay_pwd');
		if(userName&&idCard&&cardNumber&&bankName&&pwd){
			bee.post('/updateBank',{
				'card_owner':userName,
			    'id_card':idCard,
			    'bank_account': cardNumber,
			    'bank_name':bankName,
			    'pay_pwd': pwd
			    },function(data){
						if(data.code){
							// 如果失败，提示！！
								that.openNotification();
								//  callback
								var timeId = setTimeout(that.closeNotification,3000);
								that.setState({
									timeId : timeId,
									errorContent:data.info
								});
						}else{
							that.context.router.push('/CashApplay'); // 手动路由
						}
					},true)
		
		}else{
			that.openNotification();
				//  callback
				var timeId = setTimeout(that.closeNotification,3000);
				that.setState({
					timeId : timeId,
					errorContent:'请完善所有信息'
				});
		}
	}	
	
	render(){
		let btnStyle={
			width:'96%',
			height:'2.6rem',
			background:'rgba(255, 245, 161, 0.6)',
			borderRadius:'0.5rem',
			marginTop:'10rem',
			marginBottom:'2rem'
		}
		let bankName=JSON.parse(sessionStorage.getItem('aboutBank')).bankName;
		let bankNum=JSON.parse(sessionStorage.getItem('aboutBank')).bankCard;
		return(
			<div className='changeBankWrap'>
				<Notification
				          title="荟酒国际提示"
				          amStyle='alert'
				          visible={this.state.visible}
				          animated
				          onDismiss={this.closeNotification}
				        >
				          {this.state.errorContent}
			    </Notification>
				<div className='changeBankTitle'>当前卡</div>
				<Bank bankName={bankName} bankNum={bankNum}/>
				<div className='changeBankTitle'>新卡</div>
				<div className='registerInputContainer'>
					<RegisterInput promptText='户名：' vText='请输入户名' ref='userName'/>
					<RegisterInput promptText='证件号：' vText='请输入身份证号码' ref='idCard'/>
					<RegisterInput promptText='卡号：' vText='请输入卡号' ref='cardNumber'/>
					<RegisterInput promptText='开户行：' vText='请输入开户银行' ref='bankName'/>
					<RegisterInput type='password' promptText='提现码：' vText='请输入提现码' ref='pay_pwd'/>
				</div>
				<Button ref='searchBtn' onClick={this.clickHeadler} content='提交' btnStyle={btnStyle}/>
			</div>
		)
	}
}
// 静态属性
ChangeBankPage.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(ChangeBankPage);
