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
			allData:{}
		}
		this.closeNotification = this.closeNotification.bind(this);
		this.getCollection=this.getCollection.bind(this);
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
		document.title = '商品详情';
		let This=this;
		bee.post('/wechat/goods/info',{
			"uuid":bee.getQueryString('uuid')
		},function(data){
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
				let saleAttrNames=getPost.saleAttrNames;//销售属性
				let quotedPrice=saleAttrNames.quoted_price;//报价属性
				let quoPrice=quotedPrice.price;//报价属性的价格
				let quoValue=quotedPrice.value;//报价属性的value
				let station=saleAttrNames.station//仓库信息
				let stationValue=station.value;
				let resultUuid1;
				let resultUuid2;
				let resultIfo;//商品图片、起订量、库存量、价格、单位等
				resultUuid1=quoValue[0].uuid+'_'+stationValue[0].uuid;
				resultUuid2=stationValue[0].uuid+'_'+quoValue[0].uuid;
				if(getPost.result[resultUuid1]){
					resultIfo=getPost.result[resultUuid1];
				}
				if(getPost.result[resultUuid2]){
					resultIfo=getPost.result[resultUuid2];
				}
				This.setState({
					resultIformation:resultIfo,//轮播
					priceListData:quotedPrice,//报价
					detailIfo:getPost.attrNames,//基本信息、品尝信息、包装信息
					goodsIfo:getPost.goods,//商品信息
					isFavorite:getPost.isFavorite,//是否收藏
					productStation:station,//仓库信息
					intStation:stationValue[0].uuid,//初始化仓库
					intPrice:quoValue[0].uuid//初始化报价
				})
			}
		},true);
	}
	//获取县的Uuid
	getCountyUuid(data){
		this.setState({
			countyUuid:data
		})
	}
	//获取仓库uuid
	getStationUuid(data){
		this.setState({
			intStation:data//改变仓库uuid
		});
		
		
	}
	//获取报价uuid
	getPriceUuid(data){
		this.setState({
			intPrice:data//改变仓库uuid
		});
		
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
		var timeId = setTimeout(this.closeNotification,3000);
		this.setState({
			timeId : timeId,
			promptError:Error
		});
	}
	render(){
		let resultIformation = this.state.resultIformation;//轮播数据
		let productDescribeData=this.state.goodsIfo&&this.state.goodsIfo;;//产品信息
		let priceListData=this.state.priceListData//价格列表数据
		let stationData;
		if(JSON.stringify(this.state.productStation)!=='{}'){
			stationData=this.state.productStation.value;
		}//仓库
		let detailIfo=this.state.detailIfo&&this.state.detailIfo;//基本信息、品尝信息、包装信息
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
				<ProductDtailHeader/>
				<Container scrollable={true}>
				<Slide slideImg={resultIformation}/>
				<section className='productDescribe'>
				{goodsIfo}
				</section>
				<PriceList priceListData={priceListData} type={resultIformation} getPriceUuid={this.getPriceUuid} slideNumber={3}/>
				<section className='ifoContainer'>
					<ShoppingNumber/>
					<ServiceInformation titleStyle={titleStyle} contentStyle={contentStyle} title='库存' content='125箱'/>
					<RegionalLinkage type='regional' getCountyUuid={this.getCountyUuid} inputStyle={inputStyle} promptText='送至' name='agencyArea' vText='请选择   >' ref='agencyArea'/>
					<RegionalLinkage data={stationData} getStationUuid={this.getStationUuid} type='warehouse' inputStyle={inputStyle} promptText='仓库' name='warehouse' vText='请选择   >' ref='warehouse'/>
					<ServiceInformation noBorder={true} titleStyle={titleStyle} contentStyle={contentStyle} title='促销' content='10箱起拼，30箱起发'/>
				</section>
				<section>
					<ProductDetailInformation detailIfo={detailIfo}/>
				</section>
				</Container>
				<ProductDetailBttom isExclusive={false}/>
			</View>
		)
	}
}
ProductDtailPage.contextTypes={
	router:React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
// 默认参数
ProductDtailPage.defaultProps = {
    transition: 'sfr'
};
export default pureRender(ProductDtailPage);