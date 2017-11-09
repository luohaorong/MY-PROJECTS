import React from 'react';
import PayWays from '../components/PayWays';
import PureRendr from 'pure-render-decorator';
import RegisterInput from '../components/RegisterInput';
import GetVerification from '../components/GetVerification';
import Button from '../components/Button';
import {Container,Notification} from 'amazeui-touch';
import '../assets/styles/payPage.less';
class PayPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			method:'balance',
			balanceShow:false,
			balanceNum:'',
			mobile:'',
			promptError:''
		}
		this.postType = this.postType.bind(this);
		this.payClick = this.payClick.bind(this);
		this.onBridgeReady=this.onBridgeReady.bind(this);
		this.cancelBalance=this.cancelBalance.bind(this);
		this.sureBalance=this.sureBalance.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
		this.openNotification = this.openNotification.bind(this);
		this.pushHistory = this.pushHistory.bind(this);
	}
	componentDidMount(){
		bee.pushUrl();
		document.title = '支付订单';
		let This =this;
		let order_uuid = bee.getQueryString('orders_uuid');
		bee.post('/wechat/order/detail',{
			'order_uuid':order_uuid
		},function(data){
			if (data.error_code==0) {
				This.refs.orderNum.refs.inp.value=data.data.order_sn;
				This.refs.orderNum.state.value = data.data.order_sn;
				This.refs.payment.refs.inp.value=('￥' + bee.currency(data.data.payed_amount));
				This.refs.payment.state.value = ('￥' + bee.currency(data.data.payed_amount));
			}
		},true);
		bee.post('/wechat/center',{},
				function(data){
					if (data.error_code==0) {
						This.setState({
							balanceNum:bee.currency(data.data.balance),
							mobile:data.data.mobile
						})
					}
				},true
			);
		this.pushHistory();
		window.addEventListener("popstate", function(e) {  
	        window.location.href='/index/ShoppingCarPage';  
	    }, false);  
	}
	pushHistory() {  
       let state = {  
            title: "购物车",  
            url: "/index/ShoppingCarPage"  
        };  
        window.history.pushState(state, state.title, state.url);  
    } 
	//报错提示
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
	//点击取消余额支付
	cancelBalance(){
		this.setState({
			balanceShow:false
		})
	}
	//点击确定余额支付
	sureBalance(){
		let This = this;
		let pass = bee.md5(this.refs.loginPass.refs.inp.value);
		let smsCode = this.refs.smsCode.refs.inp.value;
		let timeId = setTimeout(this.closeNotification,2000);
		let order_uuid = bee.cache('payUuid');
		if(this.refs.smsCode.refs.inp.value==''||this.refs.loginPass.refs.inp.value==''){
			this.openNotification();
			this.setState({
				promptError:'手机验证码和密码不能为空！',
				timeId:timeId
			})
		}else{
			bee.post('/wechat/pass/check',{
				'code':smsCode,
				'password':pass
			},function(data){
				if (data.error_code) {
					let Err=data.msg;
					This.openNotification();
					This.setState({
						promptError:Err,
						timeId:timeId
					})
				}else{
					bee.post('/wechat/send/pay',{
						'uuid':order_uuid,
						'from':'order_pay',
						'method':This.state.method
					},function(data){
						//支付时间
						let date = new Date();
						let year = date.getFullYear();
						let month = date.getMonth()+1;
						let day = date.getDate();
						let hour = date.getHours();
						let minute = date.getMinutes();
						let second = date.getSeconds();
						let dataStr=year +'-' +month +'-'+day+' '+hour+':'+minute+':'+second;
						//支付类型
						let payWay = This.state.method=='weixin'?'微信':'余额';
						//支付结果
						let payState;
						let cashBox = {};
						if (data.error_code) {
							let Err=data.msg;
							This.openNotification();
							This.setState({
								promptError:Err,
								timeId:timeId
							});
							 payState= false;
							 cashBox={
							 	dataStr:dataStr,
							 	payWay:payWay,
							 	payState:payState,
							 	order_uuid:order_uuid
							 };
							 bee.cache('cashBox',JSON.stringify(cashBox));
							This.context.router.push('/CashBoxPage');
						}else{
							payState=true;
							cashBox={
							 	dataStr:dataStr,
							 	payWay:payWay,
							 	payState:payState,
							 	order_uuid:order_uuid
							 };
							bee.cache('cashBox',JSON.stringify(cashBox));
							This.context.router.push('/CashBoxPage');
						}
					},true);
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
	           		console.log(res.err_msg) // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
	           }      
	       }
	   ); 
	}
	//确认支付
	payClick(){
		let This = this;
		let order_uuid = bee.cache('payUuid');
		if (this.state.method!=='balance') {
			bee.post('/wechat/send/pay',{
				'uuid':order_uuid,
				'from':'order_pay',
				'method':This.state.method
			},function(data){
				if (data.error_code==0) {
					if (This.state.method=='weixin') {
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
					}
				}
			},true);
		}else{
			This.setState({
				balanceShow:true
			})
		}
	}
	//传递支付方式类型
	postType(type){
		this.setState({
			method:type
		})
	}
	render(){
		const PayWaysData=[
			{
				img:'../assets/images/recharge/yinlian.png',
				title:'余额支付',
				balanceNum:'￥'+this.state.balanceNum,
				describ:'使用您的余额直接支付',
				type:'balance'
			},
			{
				img:'../assets/images/recharge/wechat.png',
				title:'微信',
				balanceNum:'',
				describ:'推荐安装微信5.0及以上版本用户使用',
				type:'weixin'
			}

		];
		let submitBtn={
			width:'100%',
			height:'3rem',
			borderRadius:0,
			marginTop:'10px'
		}
		let inputStyle = {
			color:'#9e1b1b'
		}
		let inputStyle1= {
			width:'100%',
			height:'2rem',
			textAlign:'left',
			textIndent:'0'
		}
		let inputWraperStyle={
			width:'40%',
    		height: 'auto',
    		float: 'left',
    		marginLeft:'4%',
    		marginTop:'1.5rem'
		}
		let btnStyle = {
			float:'right',
			width:'50%',
			marginTop:'1rem'
		}
		return (
			<Container className = 'payWrapper'>
				<Notification
				      title="荟酒国际提示"
			          amStyle='alert'
			          visible={this.state.visible}
			          animated
			          onDismiss={this.closeNotification}
			        >
				         {this.state.promptError}
			        </Notification>
				<section className = 'orderContainer'>
					<RegisterInput ref = 'orderNum' promptText = '订单号:' disabled = 'disabled' isnecessary = {false}/>
					<RegisterInput ref = 'payment' promptText = '支付金额:' disabled = 'disabled' isnecessary = {false} inputStyle={inputStyle}/>
				</section>
				<div className="payWrapperTip">
					请您尽快完成支付以免库存不足。待支付订单将在24小时后自动取消，如需发票，必须与我方银行对公转账！
				</div>
				<PayWays postType = {this.postType} PayWaysData = {PayWaysData}/>
				<Button content = '确认支付' btnStyle={submitBtn} onClick = {this.payClick}/>
				<div className={this.state.balanceShow==true?"balanceLayer":"balanceLayerStyle"}>
					<div className="balanceLayerContainer">
						<p className="balanceLayerTitle">支付验证</p>
						<p className="balanceLayerTitle2">输入登录密码和短信验证码</p>
						<RegisterInput show={false} type='password' vText='登录密码' ref = 'loginPass'  isnecessary = {true} inputStyle={inputStyle1}/>
						<RegisterInput show={false} type='number' vText='短信验证码' ref = 'smsCode'   isnecessary = {true} inputStyle={inputStyle1} inputWraperStyle={inputWraperStyle}/>
						<GetVerification  smsType='balance_pay' phoneNumber={this.state.mobile} btnStyle={btnStyle}/>
						<div className="balanceLayerBottom">
							<div className="balanceLayerBottomLeft" onClick={this.cancelBalance}>取消</div>
							<div className="balanceLayerBottomRight" onClick={this.sureBalance}>确定</div>
						</div>
					</div>
				</div>
			</Container>
		)
	}
}
PayPage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default PureRendr(PayPage);