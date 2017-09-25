import React from 'react';
import PayWays from '../components/PayWays';
import PureRendr from 'pure-render-decorator';
import RegisterInput from '../components/RegisterInput';
import Button from '../components/Button';
import {Container} from 'amazeui-touch';
import '../assets/styles/payPage.less';
class PayPage extends React.Component{
	constructor(props){
		super(props);
		this.postType = this.postType.bind(this);
		this.payClick = this.payClick.bind(this);
	}
	componentDidMount(){
		bee.pushUrl();
		document.title = '支付订单',
		this.refs.orderNum.refs.inp.value = '1216463654656';
		this.refs.payment.refs.inp.value = ('￥' + bee.currency('200125'));
	}
	payClick(){
		wx.closeWindow();
		wx.chooseWXPay({
		    timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		    nonceStr: '', // 支付签名随机串，不长于 32 位
		    package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
		    signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
		    paySign: '', // 支付签名
		    success: function (res) {
		        // 支付成功后的回调函数
		    }
		});
	}
	postType(type){
		console.log(type);
	}
	render(){
		const PayWaysData=[
			{
				img:'../assets/images/recharge/yinlian.png',
				title:'余额支付',
				describ:'使用您的余额直接支付',
				type:'balance'
			},
			{
				img:'../assets/images/recharge/wechat.png',
				title:'微信',
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
		return (
			<Container className = 'payWrapper'>
				<section className = 'orderContainer'>
					<RegisterInput ref = 'orderNum' promptText = '订单号' disabled = 'disabled' isnecessary = {false}/>
					<RegisterInput ref = 'payment' promptText = '待付款' disabled = 'disabled' isnecessary = {false} inputStyle={inputStyle}/>
				</section>
				<PayWays postType = {this.postType} PayWaysData = {PayWaysData}/>
				<Button content = '确认支付' btnStyle={submitBtn} onClick = {this.payClick}/>
			</Container>
		)
	}
}
export default PureRendr(PayPage);