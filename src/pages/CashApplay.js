import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/cashApplay.less';
import CashHeader from '../components/CashHeader';
import RegisterInput from '../components/RegisterInput';
import Button from '../components/Button';
import Bank from '../components/Bank';
import {Link} from 'react-router';
import {
	Notification
} from 'amazeui-touch';
class CashApplay extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			visible : false
		}
		//初始化逻辑
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
	componentDidMount(){
		let that=this;
		bee.post('/getBankAccount', {}, function (data) {
			if (data.code) {
				alert(data.info);
				return;
			}
			let aboutBank={
				'bankName':data.data.bank_name,
				'bankCard':data.data.bank_account
			}
			aboutBank=JSON.stringify(aboutBank);
			sessionStorage.setItem('aboutBank',aboutBank);
			that.setState({
				bankAccountData:data.data
			})
		}, true);
	}
	 //获取组件的value
	getValue(key){
		return this.refs[key].getValue();
	}
	clickHeadler(){
		let cashNumber=this.getValue('cashNumber');
		let cashPassword=this.getValue('cashPassword');
		let cashData={'cashNumber':cashNumber,'cashPassword':cashPassword};
		let that=this;
		if(cashNumber&&cashPassword){
			bee.post('/apply',{
				'amount': cashNumber,
	    		'pay_pwd': cashPassword
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
							let sessionData=JSON.stringify(cashData);
							sessionStorage.setItem('cashApplayData',sessionData);
							that.context.router.push('/CashDetailPage'); // 手动路由
							
						}
					},true)
		
		}else{
			that.openNotification();
				//  callback
				var timeId = setTimeout(that.closeNotification,3000);
				that.setState({
					timeId : timeId,
					errorContent:'提现金额或提现码不能为空！！！'
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
		let bankData=this.state.bankAccountData;
		return(
			<div className='cashApplayWrap'>
				<Notification
				          title="荟酒国际提示"
				          amStyle='alert'
				          visible={this.state.visible}
				          animated
				          onDismiss={this.closeNotification}
				        >
				          {this.state.errorContent}
			    </Notification>
				<CashHeader remainderMoney={sessionStorage.getItem('rest_bonus')} remainder='本月可提现'/>
				<Bank bankName={bankData?bankData.bank_name:''} bankNum={bankData?bankData.bank_account:''}/>
				<RegisterInput promptText='申请额度：' vText='不超过本月可提额度' ref='cashNumber'/>
				<RegisterInput promptText='提现码：' type='password' vText='请输入提现码' ref='cashPassword'/>
				<Button ref='searchBtn' onClick={this.clickHeadler} content='提现' btnStyle={btnStyle}/>
				<Link to='/GetMoneyHelpPage'>
					<img className='helpImg' src='../assets/images/cashApplay/help.png'/>
				</Link>
			</div>
		)
	}
}
// 静态属性
CashApplay.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(CashApplay);
