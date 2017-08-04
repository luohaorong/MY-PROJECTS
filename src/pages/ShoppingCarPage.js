import React from 'react';
import ShoppingCarEditGoods from '../components/ShoppingCarEditGoods';
import ShoppingCarDeport from '../components/ShoppingCarDeport';
import '../assets/styles/shoppingCar.less';
import {Container,View} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class ShoppingCarPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			title:'购物车'
		}
	}
	componentDidMount(){
		document.title = this.state.title;
		
	}
	render(){
		const data=[
					{
						title:'天津仓境内发货',
						detailData:[
									{
										img:'../assets/images/shoppingCar/product.png'
										,productName:'玛南佳酿红葡萄酒'
										,price:'￥150/瓶'
										,goodsNumber:'6支装'
										,type:'现货'
										,uuid:'1'
										,selected:'yes'
										,quantity:'20'
									}
									,{
										img:'../assets/images/shoppingCar/product.png'
										,productName:'玛南佳酿红葡萄酒'
										,price:'￥150/瓶'
										,goodsNumber:'6支装'
										,type:'现货'
										,uuid:'2'
										,selected:'yes'
										,quantity:'20'
									}
									,{
										img:'../assets/images/shoppingCar/product.png'
										,productName:'玛南佳酿红葡萄酒'
										,price:'￥150/瓶'
										,goodsNumber:'6支装'
										,type:'现货'
										,uuid:'3'
										,selected:'yes'
										,quantity:'10'
									}
									]
					}
					,{
						title:'广东仓境内发货',
						detailData:[
									{
										img:'../assets/images/shoppingCar/product.png'
										,productName:'玛南佳酿红葡萄酒'
										,price:'￥150/瓶'
										,goodsNumber:'6支装'
										,type:'现货'
										,uuid:'4'
										,selected:'yes'
										,quantity:'200'
									}
									
									]
					}
					,{
						title:'宁波仓境内发货',
						detailData:[
									{
										img:'../assets/images/shoppingCar/product.png'
										,productName:'玛南佳酿红葡萄酒'
										,price:'￥150/瓶'
										,goodsNumber:'6支装'
										,type:'现货'
										,uuid:'5'
										,selected:'yes'
										,quantity:'50'
									}
									,{
										img:'../assets/images/shoppingCar/product.png'
										,productName:'玛南佳酿红葡萄酒'
										,price:'￥150/瓶'
										,goodsNumber:'6支装'
										,type:'现货'
										,uuid:'6'
										,selected:'yes'
										,quantity:'20'
									}
									
									]
					}
					]
		
		return(
			<View>
				<ShoppingCarDeport data={data}/>
			</View>
			
		)
	}
}
export default pureRender(ShoppingCarPage);