import React from 'react';
import {Link} from 'react-router';
import {View,Container,Notification} from 'amazeui-touch';
import ProductDtailHeader from '../components/ProductDtailHeader';
import Slide from '../components/Slide';
import Collection from '../components/Collection';
import PriceList from '../components/PriceList';
import ServiceInformation from '../components/ServiceInformation';
import RegionalLinkage from '../components/RegionalLinkage';
import ShoppingNumber from '../components/ShoppingNumber';
import ProductDetailInformation from '../components/ProductDetailInformation';
import ProductDetailBttom from '../components/ProductDetailBttom';
import '../assets/styles/productDtailPage.less';
import pureRender from 'pure-render-decorator';
class ProductDtailPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			resultIformation:[],// 定义轮播数据
			productDescribeData:{},//产品信息
			priceListData:{},//价格列表数据
			promptError:'',
			detailIfo:{},
			goodsIfo:{},
			isFavorite:false,
			productStation:{},
			countyUuid:'',
			intStation:'',
			intPrice:'',
			allData:{},
			bottleNum:0,//共多少瓶
			productUuid:'',//需要提交给后台的uuid
			isSubmit:true,//是否允许加入购物车
			shoppingNum:0,//购物车商品数量
			isExclusive:false//是否独家
		}
		this.closeNotification = this.closeNotification.bind(this);
		this.getCollection=this.getCollection.bind(this);
		this.getCountyUuid=this.getCountyUuid.bind(this);
		this.getStationUuid=this.getStationUuid.bind(this);
		this.getPriceUuid=this.getPriceUuid.bind(this);
		this.getNumber=this.getNumber.bind(this);
		this.submitCar=this.submitCar.bind(this);
	}
	//清除注册时的session
	componentWillMount(){
		sessionStorage.removeItem('angencyData');
		sessionStorage.removeItem('bindData');
		sessionStorage.removeItem('registerEntry');
		sessionStorage.removeItem('dataSign');
		bee.addUnloadImg();
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
	componentDidMount(){
		bee.pushUrl();
		document.title = '商品详情';
		let This=this;
		bee.post('/wechat/goods/info',{
			"uuid":bee.getQueryString('uuid')
		},function(data){
			setTimeout(function(){bee.removeImg()},1000);
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
				let getPost=data.data;
				let count=data.data.count;//购物车数量
				let saleAttrNames=getPost.saleAttrNames;//销售属性
				let quotedPrice=saleAttrNames.quoted_price;//报价属性
				let quoPrice=quotedPrice.price;//报价属性的价格
				let quoValue=quotedPrice.value;//报价属性的value
				let station=saleAttrNames.station//仓库信息
				let stationValue=station.value;
				let resultIfo;//商品图片、起订量、库存量、价格、单位等
				resultIfo=This.upData(quoValue[0].uuid,stationValue[0].uuid,getPost);
				This.setState({
					allData:getPost,//所有数据
					resultIformation:resultIfo,//第一种组合的结果
					productUuid:resultIfo.uuid,//需要提交给后台的uuid
					priceListData:quotedPrice,//报价
					detailIfo:getPost.attrNames,//基本信息、品尝信息、包装信息
					goodsIfo:getPost.goods,//商品信息
					isExclusive:getPost.goods.is_exclusive==='true'?true:false,//是否独家
					isFavorite:getPost.isFavorite,//是否收藏
					productStation:station,//仓库信息
					intStation:stationValue[0].uuid,//初始化仓库
					intPrice:quoValue[0].uuid,//初始化报价
					bottleNum:resultIfo.moq,//购买数量
					shoppingNum:count//购物车数量
				})
			}
		},true);
	}
	//更新数据
	upData(priceUuid,stationUuid,allData){
		let resultUuid1;
		let resultUuid2;
		let resultIfo;
		resultUuid1=priceUuid+'_'+stationUuid;//默认选择第一种组合
		resultUuid2=stationUuid+'_'+priceUuid;
		allData.result&&allData.result.map(function(item){
			if(item.final_result_uuid === resultUuid1 || item.final_result_uuid === resultUuid2){
				resultIfo=item.final_result_message;
			}
		},this);
		return resultIfo;
	}
	//获取县的Uuid
	getCountyUuid(data){
		this.setState({
			countyUuid:data
		})
	}
	//获取仓库uuid
	getStationUuid(data){
		let resultIfo;//商品图片、起订量、库存量、价格、单位等
		resultIfo=this.upData(this.state.intPrice,data,this.state.allData);
		this.setState({
			intStation:data,//改变仓库uuid
			resultIformation:resultIfo,
			productUuid:resultIfo.uuid
		});
	}
	//获取报价uuid
	getPriceUuid(data){
		let resultIfo;//商品图片、起订量、库存量、价格、单位等
		resultIfo=this.upData(data,this.state.intStation,this.state.allData);
		this.setState({
			intPrice:data,//改变仓库uuid
			resultIformation:resultIfo,
			productUuid:resultIfo.uuid
		});
	}
	//获取购买数量
	getNumber(data){
		let moq=this.state.resultIformation.moq;//起订量
		let stock=this.state.resultIformation.stock;//库存量
		this.setState({
			bottleNum:data<=0?0:data
		});
		if(data<moq){
			let Error='商品购买量不能低于起订量（'+moq+'箱）';
			// 如果失败，提示！！
			this.openNotification();
			//  callback
			let timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				promptError:Error,
				isSubmit:false
			});
		}
		if(data>stock){
			let Error='商品购买量不能高于库存量（'+stock+'箱）';
			// 如果失败，提示！！
			this.openNotification();
			//  callback
			let timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				promptError:Error,
				isSubmit:false
			});
		}
		if(data>=moq&&data<=stock){
			this.setState({
				isSubmit:true
			});
		}
	}
	//收藏成功后返回的数据
	getCollection(data){
		let Error;
		switch(data)
		{
			case 209:
			  Error='该商品已被收藏';
			  break;
			case 'addFail':
			  Error='添加收藏失败，请重试！';
			  break;
			case 'add':
			  Error='添加收藏成功！';
			break;
			case 'delFail':
			  Error='取消收藏失败！';
			break;
			case 'del':
			  Error='取消收藏成功！';
			break;
			default:Error='网络连接错误';
		}
		// 如果失败，提示！！
		this.openNotification();
		//  callback
		let timeId = setTimeout(this.closeNotification,3000);
		this.setState({
			timeId : timeId,
			promptError:Error
		});
	}
	//加入购物车
	submitCar(data){
		if(data){
			let isSubmit=this.state.isSubmit;//是否允许加入购物车
			let goods_extends_uuid=this.state.resultIformation.uuid;//商品uuid
			let goods_num=this.state.bottleNum;//商品数量
			let station_uuid=this.state.intStation;//仓库uuid
			let activity_type='normal';//活动类型（是否独家）
			let exclusive_uuid='';
			let This=this;
			if(isSubmit&&goods_extends_uuid&&goods_num&&station_uuid&&activity_type){
				bee.post('/wechat/carts/add',{
					"goods_extends_uuid":goods_extends_uuid,
				  	"goods_num":goods_num,
				  	"station_uuid":station_uuid,
				  	"activity_type":activity_type,
				  	"exclusive_uuid":exclusive_uuid
				},function(data){
					if(data.error_code===0){
						This.setState({
							shoppingNum:data.data
						});
					}
					// 如果失败，提示！！
					This.openNotification();
					//  callback
					let timeId = setTimeout(This.closeNotification,3000);
					This.setState({
						timeId : timeId,
						promptError:data.msg
					});
				},true)
			}else{
				let Error='请正确填写购买数量';
				// 如果失败，提示！！
				this.openNotification();
				//  callback
				let timeId = setTimeout(this.closeNotification,3000);
				this.setState({
					timeId : timeId,
					promptError:Error
				});
			}
		}
	}
	render(){
		let resultIformation = this.state.resultIformation;//第一种组合的结果里面包含了：轮播，报价，起订量，库存量,几只装等
		let productDescribeData=this.state.goodsIfo&&this.state.goodsIfo;//产品信息
		let priceListData=this.state.priceListData//价格列表数据
		let stationData;
		if(JSON.stringify(this.state.productStation)!=='{}'){
			stationData=this.state.productStation.value;
		}//仓库
		let detailIfo=this.state.detailIfo;//基本信息、品尝信息、包装信息
		//定义ServiceInformation组件的样式
		let titleStyle={
			width:'auto',
			paddingRight:'1rem'
		}
		let contentStyle={
			width:'auto'
		}
		let inputStyle={
			textAlign:'left',
			paddingLeft:'1rem'
		}
		let saleStyle={
			width: '82%',
		    height: 'auto',
		    textAlign: 'left',
		    fontSize:'0.8rem',
		    lineHeight:'20px',
		    marginTop:'1rem'
		}
		let goodsIfo=(
			JSON.stringify(productDescribeData)!=='{}'?(
										<div className='describeContent'>
											<div className='nameCollection'>
												<div className='nameWrap'>
													<p className='productChName text-truncate'>
														{productDescribeData.chinese_name}
													</p>
													<p className='productEnName text-truncate'>
														{productDescribeData.english_name}
													</p>
												</div>
												<div className='collectionWrap'>
													<Collection isFavorite={this.state.isFavorite} getCollection={this.getCollection}/>
												</div>
											
											</div>
											<div className='countryTicket'>
												<div className='countryWrap'>
													<img className='countryImg' src={bee.image(productDescribeData.county_flag)}/>
													<span>
														{productDescribeData.chinese_name}
													</span>
												</div>
												<div className='ticketWrap'>
													<img className='ticketImg' src='../assets/images/productDtail/ticket.png'/>
													<span>
														含税包票
													</span>
												</div>
											</div>
											<p className='productText text-truncate'>
												{productDescribeData.slogan}
											</p>
										</div>
									):""
								
							
		)
		
		return(
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
				<ProductDtailHeader detail={productDescribeData.detail}/>
				<Container scrollable={true}>
				<Slide slideImg={resultIformation}/>
				<section className='productDescribe'>
				{goodsIfo}
				</section>
				<PriceList priceListData={priceListData} type={resultIformation} getPriceUuid={this.getPriceUuid} slideNumber={3}/>
				<section className='ifoContainer'>
					<ShoppingNumber data={resultIformation} bottleNum={this.state.bottleNum} getNumber={this.getNumber}/>
					<ServiceInformation titleStyle={titleStyle} contentStyle={contentStyle} title='库存' content={resultIformation.stock}/>
					<RegionalLinkage type='regional' getCountyUuid={this.getCountyUuid} inputStyle={inputStyle} promptText='送至' name='agencyArea' vText='请选择   >' ref='agencyArea'/>
					<RegionalLinkage data={stationData} getStationUuid={this.getStationUuid} type='warehouse' inputStyle={inputStyle} promptText='仓库' name='warehouse' vText='请选择   >' ref='warehouse'/>
					<ServiceInformation noBorder={true} titleStyle={titleStyle} contentStyle={saleStyle} title='促销' content={productDescribeData.warning}/>
				</section>
				<section>
					<ProductDetailInformation detailIfo={detailIfo}/>
				</section>
				</Container>
				<ProductDetailBttom shoppingNum={this.state.shoppingNum} submitCar={this.submitCar} isExclusive={this.state.isExclusive}/>
			</View>
		)
	}
}
ProductDtailPage.contextTypes={
	router:React.PropTypes.object.isRequired // 向模块组件中，注入路由
}

export default pureRender(ProductDtailPage);