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
		this.postUuid=this.postUuid.bind(this);
		this.cancelOrders = this.cancelOrders.bind(this);
		this.sureReceive = this.sureReceive.bind(this);
		this.goHref = this.goHref.bind(this);
		this.goUpload = this.goUpload.bind(this);
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
	//传送uuid给订单详情页面
	postUuid(e){
		let active = e.currentTarget;
		let uuid = active.getAttribute('data-uuid');
		let state = active.getAttribute('data-state');
		let orderDetailUuid = {
			'uuid':uuid,
			'state':state
		}
		bee.cache('orderDetailUuid',JSON.stringify(orderDetailUuid));
	}
	//取消订单
	cancelOrders(e){
		if(confirm("确定要取消订单吗？")){
			let This = this;
			let active = e.currentTarget;
			let order_uuid = active.getAttribute('data-uuid');
			bee.post('/wechat/order/cancel',{
				'order_uuid':order_uuid
			},function(data){
				if (data.error_code==0) {
					This.props.postParent('cancel');
					bee.cache('orders_states','cancel');
				}
			},true)
		}
		// this.props.postParent('cancel');
	}
	sureReceive(e){
		if(confirm("确定已收货吗？")){
			let active = e.currentTarget;
			let order_uuid = active.getAttribute('data-uuid');
			let This = this;
			bee.post('/wechat/order/confirm',{
				'order_uuid':order_uuid
			},function(data){
				if (data.error_code==0) {
					This.props.postParent('finish');
					bee.cache('orders_states','finish');
				}
			},true);
		}
	}
	//跳往支付页面
	goHref(e){
		let active = e.currentTarget;
		let hrf = active.getAttribute('data-hrf');
		let uuid = active.getAttribute('data-uuid');
		let state = active.getAttribute('data-state');
		let orderDetailUuid = {
			'uuid':uuid,
			'state':state
		}
		bee.cache('orderDetailUuid',JSON.stringify(orderDetailUuid));
		bee.cache('payUuid',uuid);
		window.location.href=hrf;
	}
	//跳往支付凭证
	goUpload(e){
		let active = e.currentTarget;
		let state = active.getAttribute('data-state');
		let order_sn = active.getAttribute('data-sn');
		let uuid =active.getAttribute('data-uuid');
		// to='/UploadPayPage'
		if (state==='no'||state==='reupload') {
			// active.setAttribute('href','/UploadPayPage?uuid='+uuid+'&order_sn='+order_sn);
			this.context.router.push('/UploadPayPage?uuid='+uuid+'&order_sn='+order_sn);
		}else{
			this.props.postAlert(state);
		}
	}
	render(){
		let orders_data=this.props.orders_data;
		let footerLink = [];
		let ordersMiddleNameUl1=[];
		let ordersMiddleNameUl2=[];
		let postText='';
		for(var i in orders_data){
				if (orders_data[i].order_state_alias=='not_payed') {
					if (orders_data[i].pay_sign_paper_status==='no') {
						postText='上传凭证';
					}else if(orders_data[i].pay_sign_paper_status==='yes'){
						postText='审核成功';
					}else if(orders_data[i].pay_sign_paper_status==='ing'){
						postText='正在审核';
					}else if(orders_data[i].pay_sign_paper_status==='reupload'){
						postText='重新上传';
					}
				footerLink.push(<div>
								<Link className='ordersFooterLink2' data-state={orders_data[i].order_state_alias} data-uuid={orders_data[i].uuid} onClick={this.goHref} data-hrf={'/PayPage?orders_uuid='+orders_data[i].uuid}>
									立即支付
								</Link>
								<Link className='ordersFooterLink2' data-uuid={orders_data[i].uuid} data-sn={orders_data[i].order_sn} data-state={orders_data[i].pay_sign_paper_status} onClick={this.goUpload}>
									{postText}
								</Link>
								<div className='ordersFooterLink1' onClick={this.cancelOrders} data-uuid={orders_data[i].uuid}>
									取消订单
								</div>
							</div>)		
						
				}else if(orders_data[i].order_state_alias=='had_send'){

					footerLink.push(<div>
								<div className='ordersFooterLink2' onClick={this.sureReceive} data-uuid={orders_data[i].uuid}>
									确认收货
								</div>
							</div>)
				}else if(orders_data[i].order_state_alias=='not_receive'){

					footerLink.push(<div>
								<p className='ordersFooterLink1' style={{border:'none'}} data-uuid={orders_data[i].uuid}>
									等待发货
								</p>
							</div>)
				}else if(orders_data[i].order_state_alias=='finish'){
					footerLink.push(<div>
								<Link className='ordersFooterLink1'  to={'/OrderFollowPage?uuid='+orders_data[i].uuid}>
									跟踪订单
								</Link>
							</div>)
					
				}else if(orders_data[i].order_state_alias=='cancel'){
					footerLink.push(<div>
								<Link className='ordersFooterLink1'  to={'/OrderFollowPage?uuid='+orders_data[i].uuid}>
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
											<Link data-uuid={item.uuid} data-state={item.order_state_alias} onClick={this.postUuid} className="ordersHeadLink" to='/MyOrdersDetailPage'>
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
														<Link className="ordersMiddleContent" to={'ProductDtailPage?uuid='+item2.goods_uuid}>
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
				},this)
				
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
OrderContainer.contextTypes={
	router: React.PropTypes.object.isRequired
}
export default pureRender(OrderContainer)