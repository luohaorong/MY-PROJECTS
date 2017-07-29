import React from 'react';
import {Container} from 'amazeui-touch';
import '../assets/styles/myBalancePage.less';
import {Link} from 'react-router';
import BalancePayments from '../components/BalancePayments';
import pureRender from 'pure-render-decorator';
class MyBalancePage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			myBalanceHeadMoney:'',
			DataMoneyDetail:{}
		}
	}
	componentWillMount(){
		const DataMoney='￥21000';
		const DataMoneyDetail=[
			{
				type:'账户支付成功，订单号：',
				ordernum:'12121233333',
				time:'2016-05-05   04:51:32',
				money:'-4000'
			},
			{
				type:'账户充值成功，订单号：',
				ordernum:'12331212121',
				time:'2016-05-05   04:51:32',
				money:'+4000'
			},
			{
				type:'账户支付成功，订单号：',
				ordernum:'1444421212121',
				time:'2016-05-05   04:51:32',
				money:'-4000'
			}

		]
		this.setState({
			myBalanceHeadMoney:DataMoney,
			DataMoneyDetail:DataMoneyDetail
		});
	}
	
	render(){
		let DataMoneyDetail=this.state.DataMoneyDetail;
		return(
				<Container scrollable={true} className='myBalance'>
					<div className='myBalanceHead'>
						<div className='myBalanceHeadTop'>我的余额</div>
						<div className='myBalanceHeadBottom'>
							<div className='myBalanceHeadBottomLeft'>
								<p className='myBalanceHeadTitle'>当前余额</p>
								<p className='myBalanceHeadMoney'>{this.state.myBalanceHeadMoney}</p>
							</div>
							<div className='myBalanceHeadBottomRight'>
								<Link className='myBalanceToRecharge' to='/RechargePage'>前往充值</Link>
							</div>
						</div>
					</div>
					<div className='myBalanceContainer'>
						<div className='myBalanceContainerTitle'>收支明细</div>
					</div>
					<BalancePayments DataMoneyDetail={DataMoneyDetail}/>
				</Container>
			)
	}
}
export default pureRender(MyBalancePage);