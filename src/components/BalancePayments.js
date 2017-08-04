import React from 'react';
import {Container,View} from 'amazeui-touch';
import '../assets/styles/balancePayments.less';
import pureRender from 'pure-render-decorator';
class BalancePayments extends React.Component{
	constructor(props){
		super(props);
		
	}
	render(){
		let DataMoneyDetail=this.props.DataMoneyDetail;
		const MoneyDetail=(
				DataMoneyDetail.map(function(item,i){
					let str=item.type;
					if (str==='pay') {
						return(
							<div key={i} className='dataMoneyDetail'>
								<p className='dataMoneyDetailWords'>{item.ordernum}</p>
								<p className='dataMoneyDetailTime'>{item.time}</p>
								<p className='dataMoneyDetailMoney1'>{item.money}</p>
							</div>	
							)
					}else{
						return(
							<div key={i} className='dataMoneyDetail'>
								<p className='dataMoneyDetailWords'>{item.ordernum}</p>
								<p className='dataMoneyDetailTime'>{item.time}</p>
								<p className='dataMoneyDetailMoney2'>{item.money}</p>
							</div>	
							)
					}
				})
					
			)
		return(
		
		<Container className='dataMoneyContainer' scrollable={true}>
			{MoneyDetail}
		</Container>
		
		)
			
	}
}
export default pureRender(BalancePayments);