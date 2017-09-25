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
			PayWaysData:[],
			btnValue:'充值'
		}
		this.postType=this.postType.bind(this);
	}
	componentWillMount(){
		bee.pushUrl();
		document.title="充值";
		const PayWaysData=[
			{
				img:'../assets/images/recharge/wechat.png',
				title:'微信',
				describ:'推荐安装微信5.0及以上版本用户使用',
				type:'weixin'
			}

		];
		this.setState({
			PayWaysData:PayWaysData
		})
	}
	postType(type){
		console.log(type)
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
						<input className='rechargeNumeText' type='text' placeholder='请输入充值金额' value='' />
					</div>
					<div className='rechargePayTitle'>支付方式</div>
					<PayWays PayWaysData={PayWaysData} postType={this.postType}/>
					<Button className='rechargeBtn' btnClass='rechargeBtn' content='充值'/>
				</Container>
			)
	}
}
export default pureRender(RechargePage);