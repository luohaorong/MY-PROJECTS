import React from 'react';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import AddressSelect from '../components/AddressSelect';
import OrderBlank from '../components/OrderBlank';
import RegisterInput from '../components/RegisterInput';
import ConfirmOrderStatistics from '../components/ConfirmOrderStatistics';
import '../assets/styles/confirmOrderPage.less';
import PropTypes from 'prop-types';
import noSelect from '../assets/images/shoppingCar/ischeck_false.png';
import Selected from '../assets/images/shoppingCar/ischeck_true.png';
import {
	Container,
	View,
	Notification
} from 'amazeui-touch';
class ConfirmOrderPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			defaultAddress:{},
			orderBlankData:[],
			logisticsData:[],
			statis:{},
			isShow:true
		}
	this.closeNotification = this.closeNotification.bind(this);
	this.hasAddress = this.hasAddress.bind(this);
	this.clickHeadle = this.clickHeadle.bind(this);
	this.submitClick = this.submitClick.bind(this);
	}
	getChildContext() {
      return {
      	logisticsData: this.state.logisticsData,
      	isHasdefault: this.state.defaultAddress,
      	hasAddress:this.hasAddress,
      	noSelect:noSelect,
      	Selected:Selected,
      	orderBlankData:this.state.orderBlankData
      };
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
	    })
	}
	//地址是否已选择
	hasAddress(data,dataText,dataContent){
		if(data && !dataContent){
			// 如果失败，提示！！
			this.openNotification();
			//  callback
			var timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				promptError:dataText
			});
		}
		if(dataContent){
			this.setState({
					orderBlankData : dataContent.carts,         //配货单
					statis : dataContent.statis					//金币等数据
				})
		}
	}
	//是否使用金币
	clickHeadle(){
		let This = this;
		let isShow = this.state.isShow;
		if(isShow){
			This.setState({
				isShow : false
			})
		}else{
			This.setState({
				isShow : true
			})
		}
	}
	componentDidMount(){
		bee.pushUrl();
		document.title='确认订单';
		let This=this;
		sessionStorage.removeItem('deliverArr');
		bee.post('/wechat/carts/check',{},function(data){
			if(data.error_code){
				let Error=data.msg;
				// 如果失败，提示！！
				This.openNotification();
				//  callback
				var timeId = setTimeout(This.closeNotification,3000);
				This.setState({
					timeId : timeId,
					promptError:Error
				});
				return;
			}else{
				let {address,carts,ShipFee,statis} = data.data
				let defaultAddress;
				address.map(function(item){
					if(item.is_default === 'true'){
						defaultAddress = item
					}
				})
				This.setState({
					defaultAddress: defaultAddress,   //地址
					orderBlankData : carts,         //配货单
					logisticsData :  ShipFee,       //物流方式
					statis : statis					//金币等数据
				})
			}
		},true);
	}
	//点击提交
	submitClick(){
		let isSelect = JSON.parse(bee.cache('isSelect'));
		if(bee.isSelected(isSelect)){
			this.context.router.push('/PayPage')
		}else{
			// 如果失败，提示！！
			this.openNotification();
			//  callback
			var timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				promptError:'请先选择物流方式'
			});
		}
	}
	componentWillUnmount(){
		sessionStorage.removeItem('deliverArr');
		sessionStorage.removeItem('addressObj');
		sessionStorage.removeItem('isSelect');
	}
	render(){
		let {
			defaultAddress,
			orderBlankData,
			statis
		} = this.state;
		let statistics = [
		{title:'商品总额:',content:'￥' + bee.currency(statis.goods_and_service)},
		{title:'可用金币:',content:statis.return_corns_amount},
		{title:'合计运费:',content:'￥' + bee.currency(statis.ship_fee_amount)},
		{title:'服务费:',content:'￥' + bee.currency(statis.home_service_amount)},
		];
		let display = this.state.isShow ? 'none' : 'inline'
		return (
			<View>
				<Notification
				      title="荟酒国际提示"
			          amStyle='alert'
			          visible={this.state.visible}
			          animated
			          onDismiss={this.closeNotification}
			        >
				         {this.state.promptError}
			        </Notification>
				<Container scrollable={true}>
					<AddressSelect defaultAddress={defaultAddress}/>
					<OrderBlank orderBlankData = {orderBlankData} hasAddress = {this.hasAddress}/>
					<section className = 'remark'>
						<RegisterInput ref = 'remark' promptText = '备注' vText = '选填' isnecessary = {false}/>
					</section>
					<section className = 'coinCards'>
						<header className = 'coinCardsTitle'>
							<span className = 'titleLeft'>
								金币抵用
							</span>
							<span className = 'titleRight'>
								金币活动规则
							</span>
						</header>
						<div className = 'useCoin'>
							<p className = 'useCoinNum'>
								现有金币:{statis.corns_num}
							</p>
							<p className = 'isUseCoin' onClick = {this.clickHeadle}>
								<span style = {{ display : display}}>可抵扣现金</span>
								<span className = 'deductible' style = {{ display : display}}>
									￥{statis.discount_amount}
								</span>
								<img src = {this.state.isShow ? noSelect : Selected} />
							</p>
						</div>
						<Link className = 'logisticsMethodWrap' to = ''>
			            	<p className = 'logisticsMethod'>
			            		<span className = 'title'>
			            			使用荟酒券
			            		</span>
			            		<span className = 'please'>
			            			请选择
			            		</span>
			            	</p>
			            </Link>
					</section>
					<ConfirmOrderStatistics statistics = {statistics}/>
				</Container>
				<section className = 'orderSubmit'>
					<p className = 'orderContent'>
						需要支付:
						<span className = 'orderNmber'>
							￥{bee.currency(statis.payed_amount)}
						</span>
					</p>
					<p className = 'orderBtn' onClick = {this.submitClick}>
						提交订单
					</p>
				</section>
			</View>
		)
	}
}
ConfirmOrderPage.childContextTypes  = {
	logisticsData : PropTypes.array,//物流数据
	isHasdefault : PropTypes.object,//是否有默认收货地址
	hasAddress : PropTypes.func,//用户是否已经选择收货地址
	Selected : PropTypes.string,//选择后的图片
	noSelect : PropTypes.string,//取消选择图片
	orderBlankData : PropTypes.array //仓库数据
}
ConfirmOrderPage.contextTypes = {
	router : PropTypes.object.isRequired //路由
}
export default pureRender(ConfirmOrderPage);