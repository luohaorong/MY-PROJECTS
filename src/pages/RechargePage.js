import React from 'react';
import {Container} from 'amazeui-touch';
import {Link} from 'react-router';
import '../assets/styles/rechargePage.less';
import PayWays from '../components/PayWays';
import Button from '../components/Button';
import pureRender from 'pure-render-decorator';
class RechargePage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			PayWaysData:{},
			btnValue:'充值'
		}
		
	}
	componentWillMount(){
		const PayWaysData=[
			{
				img:'../assets/images/recharge/alipay.png',
				title:'支付宝',
				describ:'可能超出发卡行单次支付最大额度'
			},
			{
				img:'../assets/images/recharge/yinlian.png',
				title:'银联卡支付',
				describ:'推荐大额订单使用'
			},
			{
				img:'../assets/images/recharge/wechat.png',
				title:'微信',
				describ:'推荐安装微信5.0及以上版本用户使用'
			}

		];
		this.setState({
			PayWaysData:PayWaysData
		})
	}
	
	render(){
		let PayWaysData=this.state.PayWaysData;
		
		return(
				<Container>
					<div className='rechargeHeadContainer'>
						<p className='rechargeHeadTitle'>充值</p>
						<Link className='headCustomService' to='/'>客服</Link>
					</div>
					<div className='rechargeNumContainer'>
						<p className='rechargeNumTitile'>充值金额</p>
						<input className='rechargeNumeText' type='text' placeholder='请输入充值金额' />
					</div>
					<div className='rechargePayTitle'>支付方式</div>
					<PayWays PayWaysData={PayWaysData}/>
					<Button className='rechargeBtn' btnClass='rechargeBtn' content='充值'/>
				</Container>
			)
	}
}
export default pureRender(RechargePage);