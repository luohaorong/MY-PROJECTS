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
			promptError:'',
			isShow:true,//金币使用开关
			corn:0,//可用金币
			money:0,//金币抵扣金额
			sampleStyle:{
				display:'none'  //使用荟酒券显示与否
			},
			sampleData:[],//未使用的荟酒券数据
			sampleBool:[],//所有未使用荟酒券的选中状态集合
			postUuid:'',//使用的荟酒券的uuid
			checkChinese:false, //使用荟酒券与否显示请选择或是金额
			value:0  //使用荟酒券金额
		}
	this.closeNotification = this.closeNotification.bind(this);
	this.hasAddress = this.hasAddress.bind(this);
	this.clickHeadle = this.clickHeadle.bind(this);
	this.checkSample = this.checkSample.bind(this);//打开荟酒券选择
	this.sampleClick = this.sampleClick.bind(this);//点击选择荟酒券
	this.submitClick = this.submitClick.bind(this);
	}
	componentWillUnmount(){
		sessionStorage.removeItem('deliverArr');
		sessionStorage.removeItem('addressObj');
		sessionStorage.removeItem('isSelect');
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
				let {address,carts,ShipFee,statis} = data.data;
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
					statis : statis,				//金币等数据
					corn:statis.corns_num,
					money:statis.discount_amount
				})
			}
		},true);
		bee.post('/wechat/voucher/list',{
			'status':'no'
		},function(data){
			if (data.error_code==0) {
				let arr=[];
				data.data.length>0&&data.data.map(function(item){
					arr.push(false);
				})
				This.setState({
					sampleData:data.data,
					sampleBool:arr
				})
			}
		},true);
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
		let isSelect = bee.cache('isSelect');
		let deliverArr = bee.cache('deliverArr') ? JSON.parse(bee.cache('deliverArr')) :[];
		let corns=isShow?'yes':'no';
		if(bee.isSelected(isSelect)){
			bee.post('/wechat/ship/fee',{
				'delivery' : JSON.stringify(deliverArr),
				'address_uuid': JSON.parse(bee.cache('addressObj')).uuid,
				'corns':corns,
				'vouchers_uuid':This.state.postUuid
			},function(data){
				if (data.error_code===0) {
					if(isShow){
						This.setState({
							isShow : false,
							orderBlankData : data.data.carts,        
							statis : data.data.statis
						})
					}else{
						This.setState({
							isShow : true,
							orderBlankData : data.data.carts,        
							statis : data.data.statis
						})
					}
				}else{
					This.openNotification();
					var timeId = setTimeout(This.closeNotification,3000);
					This.setState({
						timeId : timeId,
						promptError:data.msg
					});
				}
			},true);
			
		}else{
			this.openNotification();
			//  callback
			var timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				promptError:'请先选择收货地址和配送方式'
			});
		}
	}
	//点击选择荟酒券
	checkSample(){
		let isSelect = bee.cache('isSelect');
		if(bee.isSelected(isSelect)&&this.state.sampleData.length>0){
			this.setState({
				sampleStyle:{
					display:'block'
				}
			});
		}
		if(!bee.isSelected(isSelect)){
			this.openNotification();
			//  callback
			var timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				promptError:'请先选择收货地址和配送方式',
				sampleStyle:{
					display:'none'
				}
			});
		}
		if(this.state.sampleData.length<=0){
			this.openNotification();
			//  callback
			var timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				promptError:'您还没有荟酒券',
				sampleStyle:{
					display:'none'
				}
			});
		}
	}
	//点击使用荟酒券或者取消使用荟酒券
	sampleClick(e){
		let active = e.currentTarget;
		let index = active.getAttribute('data-index');
		let uuid = active.getAttribute('data-uuid');
		let value = active.getAttribute('data-value');
		let postUuid='';
		let postValue=0;
		let arr = [];
		let bool=false;
		let This = this;
		let isShow = this.state.isShow;
		let isSelect = bee.cache('isSelect');
		let deliverArr = bee.cache('deliverArr') ? JSON.parse(bee.cache('deliverArr')) :[];
		let corns=isShow?'no':'yes';
		this.state.sampleBool.map(function(item,i){
			if (index==i) {
				if (item===true) {
					arr.push(false);
					postUuid='';
					bool=false;
					postValue=0;
				}else{
					arr.push(true);
					postUuid=uuid;
					bool=true;
					postValue=value;
				}
			}else{
				arr.push(false);
			}
		});
		bee.post('/wechat/ship/fee',{
			'delivery' : JSON.stringify(deliverArr),
			'address_uuid': JSON.parse(bee.cache('addressObj')).uuid,
			'corns':corns,
			'vouchers_uuid':postUuid
		},function(data){
			if (data.error_code==0) {
				This.setState({
					orderBlankData : data.data.carts,        
					statis : data.data.statis,
					sampleBool:arr,
					postUuid:postUuid,
					value:postValue,
					checkChinese:bool,
					sampleStyle:{
						display:'none'
					}
				})
			}else{
				This.openNotification();
				var timeId = setTimeout(This.closeNotification,3000);
				This.setState({
					timeId : timeId,
					promptError:data.msg
				});
			}
		},true);
	}
	//点击提交
	submitClick(){
		let isSelect = bee.cache('isSelect');
		let This = this;
		let delivery = bee.cache('deliverArr') ? JSON.parse(bee.cache('deliverArr')) :[];;
		let areas_uuid=bee.cache('address_uuid');
		let corns=this.state.isShow==false?'yes':'no';
		if(bee.isSelected(isSelect)){
			bee.post('/wechat/write/order',{
				'delivery':JSON.stringify(delivery),
				'address_uuid':areas_uuid,
				'corns':corns,
				'vouchers_uuid':This.state.postUuid
			},function(data){
				if (data.error_code==0) {
					// This.context.router.push('/PayPage?orders_uuid='+data.data.uuid);
					window.location.href='/PayPage';
					bee.cache('payUuid',data.data.uuid);
				}else{
					// 如果失败，提示！！
					This.openNotification();
					//  callback
					var timeId = setTimeout(This.closeNotification,3000);
					This.setState({
						timeId : timeId,
						promptError:data.msg
					});
				}
			},true)
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
	
	render(){
		let {
			defaultAddress,
			orderBlankData,
			statis
		} = this.state;
		let statistics = [
		{title:'商品总额:',content:'￥' + bee.currency(statis.goods_and_service)},
		{title:'可返金币:',content:statis.return_corns_amount},
		{title:'合计运费:',content:'￥' + bee.currency(statis.ship_fee_amount)},
		{title:'服务费:',content:'￥' + bee.currency(statis.home_service_amount)},
		];
		let display = this.state.isShow ? 'none' : 'inline';
		let sampleContainer=(
				this.state.sampleData.length>0&&this.state.sampleData.map(function(item,i){
					return(
						<div className="sampleCheckContainer" onClick={this.sampleClick} data-value={bee.currency(item.value)} data-uuid={item.uuid} key={i} data-index={i}>
							<img className="sampleLeftImg" src={this.state.sampleBool[i]==false?noSelect:Selected} />
							<div className="sampleRight">
								<img src={bee.image(item.image,268,120)}/>
								<p className="sampleRightMoney">￥<span>{bee.currency(item.value)}</span></p>
								<p className="sampleRightDate">{'限'+item.end_time+'前使用'}</p>
							</div>
						</div>

						)
				},this)

			)
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
								现有金币:{this.state.corn}
							</p>
							<p className = 'isUseCoin' onClick = {this.clickHeadle}>
								<span style = {{ display : display}}>可抵扣现金</span>
								<span className = 'deductible' style = {{ display : display}}>
									￥{bee.currency(this.state.money)}
								</span>
								<img src = {this.state.isShow ? noSelect : Selected} />
							</p>
						</div>
						<div className = 'logisticsMethodWrap'>
			            	<p className = 'logisticsMethod'>
			            		<span className = 'title'>
			            			使用荟酒券
			            		</span>
			            		<span className = 'please' onClick={this.checkSample}>
			            			{this.state.checkChinese==false?'请选择':('已选择'+this.state.value+'元荟酒券')}
			            		</span>
			            	</p>
			            </div>
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
				<Container scrollable={true} className="sampleLayer" style={this.state.sampleStyle}>
					<div className="sampleLayerTop">
						荟酒券抵用的金额不参与返金币活动
					</div>
					<div className="sampleLayerContent">
						
								
									{sampleContainer}
								
					</div>
				</Container>
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