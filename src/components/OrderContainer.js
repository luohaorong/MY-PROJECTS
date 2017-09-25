import React from 'react';
import {Container,View} from 'amazeui-touch';
import {Link} from 'react-router';
import '../assets/styles/orderContainer.less';
import orders_empty from '../assets/images/orders_empty.png';
import LoadMore from './LoadMore';
import pureRender from 'pure-render-decorator';
class OrderContainer extends React.Component{
	constructor(props){
		super(props);
		this.state={
			empty:false,
			noData:false
		}
	}
	componentWillReceiveProps(nextProps){
		if (nextProps.orders_data=='') {
			this.setState({
				empty:true
			})
		}else{
			this.setState({
				empty:false
			})
		}
	}
	render(){
		let orders_data=this.props.orders_data;
		let footerLink = [];
		let ordersMiddleNameUl1=[];
		let ordersMiddleNameUl2=[];
		for(var i in orders_data){
				if (orders_data[i].order_state_alias=='not_payed') {
				footerLink.push(<div>
								<Link className='ordersFooterLink1' to='/'>
									取消订单
								</Link>
								<Link className='ordersFooterLink2' to='/'>
									立即支付
								</Link>
							</div>)		
						
				}else if(orders_data[i].order_state_alias=='not_receive'){

					footerLink.push(<div>
								<Link className='ordersFooterLink2' to='/'>
									确认收货
								</Link>
							</div>)
				}else if(orders_data[i].order_state_alias=='finish'){
					footerLink.push(<div>
								<Link className='ordersFooterLink1' to='/'>
									跟踪订单
								</Link>
							</div>)
					
				}else if(orders_data[i].order_state_alias=='cancel'){
					footerLink.push(<div>
								<Link className='ordersFooterLink1' to='/'>
									跟踪订单
								</Link>
							</div>)
				}
			}
			 // <li>{orders_data[i].goods[j].name + orders_data[i].goods[j].remark}</li>
		
		let ordersList=(
				orders_data&&orders_data.map(function(item,i){
					return(
							<div className="ordersContainer" key={i}>
										<div className='ordersHead'>
											<Link className="ordersHeadLink" to='/'>
												<p className="ordersHeadNum">
													{item.order_sn}
												</p>
												<div className="ordesHeadType">
													{item.order_state}
												</div>
												<div className="ordersHeadRight">
													订单详情
												</div>
											</Link>
										</div>
										{
											item.goods.map(function(item2,j){
												return(
													<div className="ordersMiddleContainer" key={j+'a'}>
														<Link className="ordersMiddleContent" to={'ProductDtailPage?uuid='+item2.uuid}>
															<div className="ordersMiddleImgContainer">
																<img className="ordersMiddleImg" src={bee.image(item2.goods_image,280,400)}/>
															</div>
															<div className="ordersMiddleName">
																<p className='ordersMiddleNameWine'>{item2.goods_chinese_name}</p>
																<p className="ordersMiddleNamePrice">{'￥' + bee.currency(item2.goods_price) }</p>
																<ul className="ordersMiddleNameUl">
																	{
																		item2.sub_label.map(function(item3,k){
																			return(
																				<li key={k+'b'}>{item3.name+item3.remark}</li>
																			)
																		})
																	}
																</ul>
															</div>
															<p className="ordersMiddleRight">
																{item2.stocking_pricing_ratio}支装
															</p>
														</Link>
													</div>
												)
											})
										}
										<div className="ordersBottomContainer">
											订单金额（含运费）：￥{bee.currency(item.payed_amount)}
										</div>
										<div className="ordersFooterContainer">
											{footerLink[i]}
											
										</div>	
							</div>
						)
				})
				
			)
		return(
			<div className={this.state.empty== true ? 'ordersContent2':'ordersContent1'}>
				{ordersList}
				<div className={this.state.empty== true ? 'ordersContentEmpty1':'ordersContentEmpty2'}>
					<img className="ordersEmptyImg" src={orders_empty} />
					<p className="ordersEmptyWords">您还没有该订单数据哦~</p>
				</div>
				<LoadMore isGetData={this.props.isGetData} noData={this.props.noData} loadStyle={this.props.loadStyle}/>
			</div>
			)
	}
}
export default pureRender(OrderContainer)