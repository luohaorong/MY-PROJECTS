import React from 'react';
import {Container,Notification,View} from 'amazeui-touch';
import {Link} from 'react-router';
import OrderBlankGoods from '../components/OrderBlankGoods';
import ServiceInformation from '../components/ServiceInformation';
import '../assets/styles/myOrdersDetailPage.less';
import pureRender from 'pure-render-decorator';
class MyOrdersDetailPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			goodsDataAll:{
				address: {}
			},
			goods:{},
			goodsDataAll2:{},
			order_state:'',
			invoice:'',
			visible : false,
			errorContent:'请耐心等待审核结果'
		}
		this.applyClick=this.applyClick.bind(this);//点击开票申请
		this.closeNotification = this.closeNotification.bind(this);//提示
	}
	componentDidMount(){
		bee.pushUrl();
		document.title="订单详情";
		let uuid = JSON.parse(bee.cache('orderDetailUuid')).uuid;
		let state = JSON.parse(bee.cache('orderDetailUuid')).state;
		let This = this;
		bee.post('/wechat/order/detail',{
			'order_uuid':uuid
		},function(data){
			if (data.error_code==0) {
				This.setState({
					goodsDataAll: {
						address: {
							real_name: data.data.address.real_name,
							mobile: data.data.address.mobile,
							address: data.data.address.address
						}
					},
					goods:data.data.goods,
					goodsDataAll2:data.data,
					order_state:state,
					invoice:data.data.invoice_status
				})
			}
		},true);
	}
	applyClick(e){
		let uuid = JSON.parse(bee.cache('orderDetailUuid')).uuid;
		let order_num = this.state.goodsDataAll2.order_sn;
		let active = e.currentTarget;
		let invoice = this.state.invoice;
		if (invoice===''||invoice==='no') {
			active.setAttribute('href','/ApplyPage?uuid='+uuid+'&order_sn='+order_num);
		}else if(invoice==='ing'){
			this.openNotification();
			//  callback
			var timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				errorContent:'请耐心等待审核结果'
			});
		}else if(invoice==='yes'){
			this.openNotification();
			//  callback
			var timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				errorContent:'开票已成功!'
			});
		}
	}
	// 打开对话框
    openNotification() {
	    this.setState({
	      visible: true
	    });
    }
	
	// 关闭对话框
	closeNotification() {
	    // 判断是否需要清除定时器
	    if(this.state.timeId){
	    	clearTimeout(this.state.timeId);
	    }
	    
	    this.setState({
	      visible: false,
	      timeId : null
	    });
	    
	}
	render(){
		let applyStyle1={
			display:'block'
		};
		let applyStyle2={
			display:'none'
		}
		let apply='';
		let invoice = this.state.invoice;
		if (invoice==='') {
			apply='申请开票';
		}else if(invoice==='yes'){
			apply='开票成功';
		}else if(invoice==='no'){
			apply='重新开票';
		}else if (invoice==='ing') {
			apply='发票审核中';
		}
		return(
			<View>
				<Notification
				          title="荟酒国际提示"
				          amStyle='alert'
				          visible={this.state.visible}
				          animated
				          onDismiss={this.closeNotification}
				        >
				          {this.state.errorContent}
			    </Notification>
				<Container scrollable={true}>
					<div className="myOrdersDetailHead">
						<p className="myOrdersDetailHeadNum">订单号：<span>{this.state.goodsDataAll2.order_sn}</span></p>
						<p className="myOrdersDetailHeadTime">下单时间：<span>{this.state.goodsDataAll2.created_at}</span></p>
						<Link onClick={this.applyClick} style={this.state.order_state==="finish"?applyStyle1:applyStyle2} className="applyPaper">{apply}</Link>
					</div>
					<div className="myOrdersDetailInfo">
						<div className="myOrdersDetailInfoTop">
							<div className="myOrdersDetailInfoTopOne">
								<p className="myOrdersDetailInfoTopOneLeft">
									收货人：<span>{this.state.goodsDataAll.address.real_name}</span>
								</p>
								<p className="myOrdersDetailInfoTopOneRight">
									{this.state.goodsDataAll.address.mobile}
								</p>
							</div>
							<div className="myOrdersDetailInfoTopOne">
								<p className="myOrdersDetailInfoTopOneLeft">
									收货地址：<span>{this.state.goodsDataAll.address.address}</span>
								</p>
							</div>
						</div>
						<div className="myOrdersDetailInfoBottom">
							备注：无
						</div>
					</div>
					<div className="myOrdersDetailInfoProduct">
						<div className="myOrdersDetailInfoProductTitle">
							<p className="myOrdersDetailInfoProductTitleLeft">商品清单</p>
							<p className="myOrdersDetailInfoProductTitleRight">{this.state.goodsDataAll2.goods_num_amount+'箱'}</p>
						</div>
					</div>
					<OrderBlankGoods goods = {this.state.goods}/>
					<ServiceInformation title="商品金额" content={'￥'+bee.currency(this.state.goodsDataAll2.goods_amount)}/>
					<ServiceInformation title="运费" content={'￥'+bee.currency(this.state.goodsDataAll2.shipping_fee)}/>
					<ServiceInformation title="订单金额" content={'￥'+bee.currency(this.state.goodsDataAll2.order_amount)}/>
					<ServiceInformation title="金币折扣" content={'使用金币'+this.state.goodsDataAll2.use_corns+',金币抵扣￥'+bee.currency(this.state.goodsDataAll2.corns_discount)}/>
					<ServiceInformation noBorder={true} title="需支付金额" content={'￥'+bee.currency(this.state.goodsDataAll2.payed_amount)}/>
				</Container>
			</View>
			)
	}
}
export default pureRender(MyOrdersDetailPage);