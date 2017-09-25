import React from 'react';
import {Container,View} from 'amazeui-touch';
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
		bee.pushUrl();
		document.title="我的余额";
		const DataMoney='￥21000';
		const DataMoneyDetail=[
			{
				type:'pay',
				ordernum:'12121233333',
				time:'2016-05-05   04:51:32',
				money:'-4000'
			},
			{
				type:'recharge',
				ordernum:'12331212121',
				time:'2016-05-05   04:51:32',
				money:'+4000'
			},
			{
				type:'pay',
				ordernum:'1444421212121',
				time:'2016-05-05   04:51:32',
				money:'-4000'
			},
			{
				type:'recharge',
				ordernum:'12331212121',
				time:'2016-05-05   04:51:32',
				money:'+4000'
			},
			{
				type:'pay',
				ordernum:'1444421212121',
				time:'2016-05-05   04:51:32',
				money:'-4000'
			},
			{
				type:'recharge',
				ordernum:'12331212121',
				time:'2016-05-05   04:51:32',
				money:'+4000'
			},
			{
				type:'pay',
				ordernum:'1444421212121',
				time:'2016-05-05   04:51:32',
				money:'-4000'
			},
			{
				type:'recharge',
				ordernum:'12331212121',
				time:'2016-05-05   04:51:32',
				money:'+4000'
			},
			{
				type:'pay',
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
				
				<View className='myBalance'>
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
				</View>
			)
	}
}
export default pureRender(MyBalancePage);