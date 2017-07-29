import React from 'react';
import {Link} from 'react-router';
import {View,Container} from 'amazeui-touch';
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
			slideData:{},// 定义轮播数据
			productDescribeData:{},//产品信息
			priceListData:{}//价格列表数据
		}
	}
	componentWillMount(){
		let slideData=[
					  {
					    img: '../assets/images/productDtail/productImg.png'
					  },
					  {
					    img: '../assets/images/productDtail/productImg.png'
					  },
					  {
					    img: '../assets/images/productDtail/productImg.png'
					  },
					  {
					    img: '../assets/images/productDtail/productImg.png'
					  }
					];
		let productDescribeData={
									chName:'公爵干红葡萄酒',
									enName:'Duke red Wine',
									flag:'../assets/images/productDtail/productFlag.png',
									country:'法国',
									ticket:'../assets/images/productDtail/ticket.png',
									ticketText:'含税包票',
									productText:'产品说明文字产品说明文字产品说明文字',
								}
		let priceListData=[
							{
								origin:'境外发货',
								price:'￥150/瓶',
								type:'立即发货'
							}
							,{
								origin:'境内发货',
								price:'￥150/瓶',
								type:'预售'
							}
							,{
								origin:'境外发货',
								price:'￥150/瓶',
								type:'预售'
							}
							,{
								origin:'境内发货',
								price:'￥150/瓶',
								type:'单瓶拿样'
							}
							,{
								origin:'境内发货',
								price:'￥150/瓶',
								type:'精品酒'
							}
							,{
								origin:'境外发货',
								price:'￥150/瓶',
								type:'精品酒'
							}
							]
								
		this.setState({
			productDescribeData:productDescribeData,
			slideData:slideData,
			priceListData:priceListData
		})
	}
	render(){
		let slideImg = this.state.slideData;//轮播数据
		let productDescribeData=this.state.productDescribeData;//产品信息
		let priceListData=this.state.priceListData//价格列表数据
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
		let proviceData=[{name:'四川省'},{name:'江苏省'},{name:'海南省'},{name:'浙江省'}];
		let Wdata=[{name:'宁波仓'},{name:'上海仓'},{name:'广州仓'},{name:'成都仓'}];
		return(
			<View>
				<ProductDtailHeader/>
				<Container scrollable={true}>
				<Slide slideImg={slideImg}/>
				<section className='productDescribe'>
					<div className='describeContent'>
						<div className='nameCollection'>
							<div className='nameWrap'>
								<p className='productChName text-truncate'>
									{productDescribeData.chName}
								</p>
								<p className='productEnName text-truncate'>
									{productDescribeData.enName}
								</p>
							</div>
							<div className='collectionWrap'>
								<Collection/>
							</div>
						
						</div>
						<div className='countryTicket'>
							<div className='countryWrap'>
								<img className='countryImg' src={productDescribeData.flag}/>
								<span>
									{productDescribeData.country}
								</span>
							</div>
							<div className='ticketWrap'>
								<img className='ticketImg' src={productDescribeData.ticket}/>
								<span>
									含税包票
								</span>
							</div>
						</div>
						<p className='productText text-truncate'>
							{productDescribeData.productText}
						</p>
					</div>
				</section>
				<PriceList priceListData={priceListData} slideNumber={3}/>
				<section className='ifoContainer'>
					<ShoppingNumber/>
					<ServiceInformation titleStyle={titleStyle} contentStyle={contentStyle} title='库存' content='125箱'/>
					<RegionalLinkage data={proviceData} type='regional' inputStyle={inputStyle} promptText='送至' name='agencyArea' vText='请选择   >' ref='agencyArea'/>
				    <RegionalLinkage data={Wdata} type='warehouse' inputStyle={inputStyle} promptText='仓库' name='warehouse' vText='请选择   >' ref='warehouse'/>
					<ServiceInformation noBorder={true} titleStyle={titleStyle} contentStyle={contentStyle} title='促销' content='10箱起拼，30箱起发'/>
				</section>
				<section>
					<ProductDetailInformation/>
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