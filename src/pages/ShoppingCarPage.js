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
			title:'购物车',
			shoppingData:{}
		}
	}
	componentDidMount(){
		document.title = this.state.title;
	}
	render(){
		return(
			<View>
				<ShoppingCarDeport/>
			</View>
			
		)
	}
}
export default pureRender(ShoppingCarPage);