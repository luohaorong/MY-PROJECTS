import React from 'react';
import {Link} from 'react-router';
import '../assets/styles/homeHotProduct.less';
import HomeHotTitle from './HomeHotTitle';
import LoadMore from './LoadMore';
import {Grid,Col} from 'amazeui-touch';
import LazyLoad from 'react-lazy-load';
import pureRender from 'pure-render-decorator';
class HomeHotProduct extends React.Component{
	constructor(props){
		super(props);
		this.state={
			productListData:[],
			reGet:false,
			errorSrc:"",
			classN:"",
		};
		this.errorLoad=this.errorLoad.bind(this);
		this.loadHeadle=this.loadHeadle.bind(this);
	}
	//获取LoadMore传来的数据
	reGetData(data){
		let tmp=this.props.productListData;
		if(data){
			data.map(function(item){
				tmp.push(item)
			})
			this.setState({
				reGet:true,
				productListData:tmp
			})
		}else{
			this.setState({
				reGet:false
			})
		}
	}
	//图片加载出错时执行
	errorLoad(){
		this.setState({
			errorSrc:'../assets/images/unload.png',
			classN:'errorLoad'
		})
		
		
	}
	//图片加载完成前
	loadHeadle(e){
		let active=e.currentTarget;
		let comp=active.complete;
		let dataSrc=active.getAttribute('data-src');
		this.setState({
			classN:'errorLoad'
		});
		if(comp){
			this.setState({
				classN:''
			})
			active.src=dataSrc;
		}
	}
	render(){
		// 定义热销商品列表
		let productListData=this.props.productListData||this.state.productListData;
		let len=productListData.length;
		const productList = (
				  <Grid avg={2}>
				  	{productListData&&productListData.map(function(item,i){
				  		return (
					  			<Col key={i} className='productCol'>
					            	<Link className='productListStyle' to={'/ProductDtailPage?uuid=' + item.uuid} data-uuid={item.uuid}>
							  			<LazyLoad offsetVertical={50} className={i===len-1?'hotImgLast hotImgWrapper':'hotImgWrapper'}>
						            		<img onError={this.errorLoad} className={this.state.classN||'productImg'}  onLoad={this.loadHeadle} data-src={bee.image(item.thumb,280,400)} src={this.state.errorSrc||'../assets/images/preLoad.gif'}/>
						            	</LazyLoad>	
						            	<div className='productDiscribe'>
							            	<p className='productChName text-truncate'>{item.chinese_name}</p>
							            	<p className='productEnName text-truncate'>{item.english_name}</p>
							            	<img className='flagImg' src={bee.image(item.country_flag)}/>
							            	<span className='productCountry'>{item.country_name}</span>
							            	<span className='productOrigin'>{item.label}</span>
							            	<p className='productPrice'>{item.lowest_price===0?'请登录':'￥'+bee.currency(item.lowest_price)}</p>
						            	</div>
				            		</Link>
			            		</Col>
				  		)
				  	},this)}
		            
		          </Grid>
		         );

		return (
		     <div className='hotProductContainer'>
				<HomeHotTitle hotProductImg={this.props.hotProductImg}/>
		 		<section className='mainWap'>
			 		{productList}
				</section>
				<LoadMore loadUrl={this.props.loadUrl} reGetData={this.reGetData.bind(this)} reGete={this.state.reGet} loadStyle={this.props.loadStyle} loadUuid={this.props.loadUuid}/>
			</div>
	)
	}
}
export default pureRender(HomeHotProduct);