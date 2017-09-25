import React from 'react';
import pureRender from 'pure-render-decorator';
import OrderBlankGoods from './OrderBlankGoods';
import '../assets/styles/orderBlank.less';
import LogisticsMethod from '../components/LogisticsMethod';
import {Container} from 'amazeui-touch';
export default pureRender(class OrderBlank extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let {orderBlankData} = this.props;
		return (
			<Container>
			{
				orderBlankData.length&&orderBlankData.map(function(item,k){
					let {station,amount,goods} = item;
					return (
							<section key = {'OrderBlank'+k} className = 'OrderBlankSec'>
								<header className = 'OrderBlank'>
									<figure>
										<span className = 'OrderBlankNum'>
											配货单{(k + 1)}:
										</span>
										<span className = 'orderBlankStation'>
											{station}发货
										</span>
									</figure>
								</header>
								<article className = 'orderBlankContainer'>
									<p className = 'countBottleNum'>
										{amount.goods_amount}箱,共{amount.goods_total}瓶
									</p>
									<p className = 'countPrice'>
										本单总价:
										<span className = 'countPriceNum'>
											￥{bee.currency(amount.price_amount)}
										</span>
										物流费:
										<span className = 'countPriceNum'>
											￥{bee.currency(amount.ship_fee)}
										</span>
									</p>
									<OrderBlankGoods goods = {goods}/>
									<LogisticsMethod index = {k}/>
								</article>
							</section>
					)
					
				})
			}
			</Container>
		)
	}
})
