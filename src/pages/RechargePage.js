import React from 'react';
import {Container,Notification,View} from 'amazeui-touch';
import {Link} from 'react-router';
import '../assets/styles/rechargePage.less';
import PayWays from '../components/PayWays';
import Button from '../components/Button';
import pureRender from 'pure-render-decorator';
class RechargePage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			btnValue:'充值',
			visible : false,
			errorContent:''
		}
		this.rechargeClick=this.rechargeClick.bind(this);
		this.clearNoNum=this.clearNoNum.bind(this);
		this.onBridgeReady=this.onBridgeReady.bind(this);
		this.closeNotification = this.closeNotification.bind(this);//提示
	}
	
	
	componentDidMount(){
		bee.pushUrl();
		document.title="充值";
		// history.replaceState(null, null, '/RechargePage');
		// history.pushState(null, null, '/RechargePage');

	}
	clearNoNum(e) {
		let active=e.currentTarget;
		let str = active.value;
		let reg = /^(([0+-9]\d*(\.\d*)?)|(0\.\d[1-9]))$/;
		if (!reg.test(str)) {
			active.value=''
		}
		
	}
	rechargeClick(){
		let money = this.refs['rechargeMoney'].value;
		let This =this;
		let uuid='';
		if (money!=='') {
			bee.post('/wechat/recharges',{
				'money':money*100,
				'pay_way':'weixin'
			},function(data){
				if(data.error_code==0){
					uuid = data.data.uuid;
					bee.post('/wechat/send/pay',{
						'uuid':uuid,
						'from':'recharge',
						'method':'weixin'
					},function(data){
						if (data.error_code==0) {
							if (typeof WeixinJSBridge === "undefined"){
							   if( document.addEventListener ){
							       document.addEventListener('WeixinJSBridgeReady', This.onBridgeReady(data.data), false);
							   }else if (document.attachEvent){
							       document.attachEvent('WeixinJSBridgeReady', This.onBridgeReady(data.data)); 
							       document.attachEvent('onWeixinJSBridgeReady', This.onBridgeReady(data.data));
							   }
							}else{
							   This.onBridgeReady(data.data);
							}
						}else{
							This.openNotification();
							var timeId = setTimeout(This.closeNotification,3000);
							This.setState({
								timeId : timeId,
								errorContent:data.msg
							});
						}
					},true)
				}else{
					This.openNotification();
					var timeId = setTimeout(This.closeNotification,3000);
					This.setState({
						timeId : timeId,
						errorContent:data.msg
					});
				}
			},true);
		}
	}
	//微信支付
	onBridgeReady(obj){
	   WeixinJSBridge.invoke(
	       'getBrandWCPayRequest', 
	     	obj,
	       function(res){
	           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
	           		console.log(res.err_msg)// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
	           }   
	       }
	   ); 
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
	render(){

		let PayWaysData=[
			{
				img:'../assets/images/recharge/wechat.png',
				title:'微信',
				balanceNum:'',
				describ:'推荐安装微信5.0及以上版本用户使用',
				type:'weixin'
			}

		];
		
		return(
				<View>
					<Container>
						<Notification
				          title="荟酒国际提示"
				          amStyle='alert'
				          visible={this.state.visible}
				          animated
				          onDismiss={this.closeNotification}
				        >
				          {this.state.errorContent}
			    		</Notification>
						<div className='rechargeNumContainer'>
							<p className='rechargeNumTitile'>充值金额</p>
							<input ref='rechargeMoney' className='rechargeNumeText' type='number' onKeyUp={this.clearNoNum} placeholder='请输入充值金额'/>
						</div>
						<div className='rechargePayTitle'>支付方式</div>
						<PayWays PayWaysData={PayWaysData}/>
						<Button onClick={this.rechargeClick} className='rechargeBtn' btnClass='rechargeBtn' content='充值'/>
					</Container>
				</View>
			)
	}
}
export default pureRender(RechargePage);