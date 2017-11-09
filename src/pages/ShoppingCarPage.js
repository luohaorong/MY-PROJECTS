import React from 'react';
import ShoppingCarEditGoods from '../components/ShoppingCarEditGoods';
import ShoppingCarDeport from '../components/ShoppingCarDeport';
import '../assets/styles/shoppingCar.less';
import {Container,View} from 'amazeui-touch';
import Bottom from '../components/Bottom';
import pureRender from 'pure-render-decorator';
class ShoppingCarPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			title:'购物车',
			shoppingData:{},
			cartsnum:0
		}
		this.pushHistory=this.pushHistory.bind(this);
	}
	componentDidMount(){
		bee.pushUrl();
		let This =this;
		document.title = this.state.title;
		this.pushHistory();
		window.addEventListener("popstate", function(e) {  
	        window.location.href='/index/HomePage';  
	    }, false);
	    let token=localStorage.getItem('token');
		if (token) {
		    bee.post('/wechat/carts/count',{},function(data){
		      if (data.error_code==0) {
		      		This.setState({
		      			cartsnum:+data.data.count
		      		})
		      }
		    },true);
		};
	}
	pushHistory(){
		 let state = {
	        title: "首页",
	        url: "/index/ShoppingCarPage"
    	};
    	window.history.pushState(state, state.title, state.url);
	}
	render(){
		return(
			<View>
				<ShoppingCarDeport/>
				<Bottom cartsnum={this.state.cartsnum}/>
			</View>
			
		)
	}
}
export default pureRender(ShoppingCarPage);