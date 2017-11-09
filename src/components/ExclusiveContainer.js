import React from 'react';
import product from '../assets/images/home/product.png';
import orders_empty from '../assets/images/orders_empty.png';
import {View,Container} from 'amazeui-touch';
import {Link} from 'react-router';
import LoadMore from './LoadMore';
import pureRender from 'pure-render-decorator';
class ExclusiveContainer extends React.Component{
	constructor(props){
		super(props);
		this.state={
			noData:false
		}
	}
	render(){
		let exclusiveData = this.props.exclusive || [];
		let exclusiveDetail;
		if (exclusiveData.length>0) {
			exclusiveDetail=(
					exclusiveData&&exclusiveData.map(function(item,i){
						return(
								<div className="ordersContent1" key={i}>
									<div className="ordersContainer">
										<div className='ordersHead'>
											<div className="ordersHeadLink">
												<p className="ordersHeadNum">
													{item.areas_name}
												</p>
											</div>
										</div>
										<div className="ordersMiddleContainer">
											<Link className="ordersMiddleContent" to={'/ProductDtailPage?uuid='+item.goods_uuid}>
												<div className="ordersMiddleImgContainer">
													<img className="ordersMiddleImg" src={bee.image(item.thumb,280,400)}/>
												</div>
												<div className="ordersMiddleName">
													<p className='ordersMiddleNameWine'>{item.chinese_name}</p>
													<p className="ordersMiddleNamePrice">{'￥'+bee.currency(item.exclusive_price)}</p>
													<ul className="ordersMiddleNameUl">
														<li>独家</li>
													</ul>
												</div>
												<p className="ordersMiddleRight">
													{item.exclusive_time}
												</p>
											</Link>
										</div>
										<div className="ordersBottomContainer">
											{'订单金额（含运费）：￥'+bee.currency(item.payed_amount)}
										</div>
									</div>
								</div>
							)
					})
				)
		}else{
			exclusiveDetail=(
					<div className="couponContainer">
						<img className='MoneyDetailEmptyContainerImg' src={orders_empty}/>
						<p>{this.props.empty}</p>
					</div>
			)
		}
		return(
				<Container className='scrollWrapper'>
					{exclusiveDetail}
					<LoadMore isGetData={this.props.isGetData} noData={this.props.noData} loadStyle={this.props.loadStyle}/>
				</Container>
			)
	}
}
export default pureRender(ExclusiveContainer);