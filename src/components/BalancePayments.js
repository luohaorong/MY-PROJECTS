import React from 'react';
import {Container} from 'amazeui-touch';
import '../assets/styles/balancePayments.less';
class BalancePayments extends React.Component{
	constructor(props){
		super(props);
		
	}
	render(){
		let DataMoneyDetail=this.props.DataMoneyDetail;
		const MoneyDetail=(
				DataMoneyDetail.map(function(item,i){
					let str=item.type;
					if (str.indexOf('支付')!==-1) {
						return(
							<div key={i} className='dataMoneyDetail'>
								<p className='dataMoneyDetailWords'>{item.type}</p>
								<p className='dataMoneyDetailOrder'>{item.ordernum}</p>
								<p className='dataMoneyDetailTime'>{item.time}</p>
								<p className='dataMoneyDetailMoney1'>{item.money}</p>
							</div>	
							)
					}else{
						return(
							<div key={i} className='dataMoneyDetail'>
								<p className='dataMoneyDetailWords'>{item.type}</p>
								<p className='dataMoneyDetailOrder'>{item.ordernum}</p>
								<p className='dataMoneyDetailTime'>{item.time}</p>
								<p className='dataMoneyDetailMoney2'>{item.money}</p>
							</div>	
							)
					}
						
					})
					
			)
		return(
		<Container className='dataMoneyContainer'>
			{MoneyDetail}
		</Container>	
		)
			
	}
}
export default BalancePayments;