import React from 'react';
import {Container,View} from 'amazeui-touch';
import '../assets/styles/balancePayments.less';
import orders_empty from '../assets/images/orders_empty.png';
import LoadMore from './LoadMore';
import pureRender from 'pure-render-decorator';
class BalancePayments extends React.Component{
	constructor(props){
		super(props);
		this.state={
			noData:false
		}
	}
	render(){
		let DataMoneyDetail=this.props.DataMoneyDetail;
		let MoneyDetail;
		let bool = this.props.wordShow;
		if (DataMoneyDetail.length>0) {
			MoneyDetail=(
					DataMoneyDetail&&DataMoneyDetail.map(function(item,i){
						let str=item.inout;
						if (str==='out') {
							return(
								<div key={i} className='dataMoneyDetail'>
									<p className='dataMoneyDetailWords'>{bool==true?item.note:item.order_sn}</p>
									<p className='dataMoneyDetailTime'>{item.created_at}</p>
									<p className='dataMoneyDetailMoney1'>{'-'+item.amount}</p>
								</div>	
								)
						}else{
							return(
								<div key={i} className='dataMoneyDetail'>
									<p className='dataMoneyDetailWords'>{bool==true?item.note:item.order_sn}</p>
									<p className='dataMoneyDetailTime'>{item.created_at}</p>
									<p className='dataMoneyDetailMoney2'>{'+'+item.amount}</p>
								</div>	
								)
						}
					})
						
				)
		}else{
			MoneyDetail=(
					<div className="MoneyDetailEmptyContainer">
						<img className='MoneyDetailEmptyContainerImg' src={orders_empty}/>
						<p>{this.props.empty}</p>
					</div>
				)
		}
		return(
		
		<Container className='dataMoneyContainer scrollWrapper' scrollable={true}>
			{MoneyDetail}
			<LoadMore isGetData={this.props.isGetData} noData={this.props.noData} loadStyle={this.props.loadStyle}/>
		</Container>
		
		)
			
	}
}

export default pureRender(BalancePayments);