import React from 'react';
import {Container} from 'amazeui-touch';
import '../assets/styles/orderHead.less';
import pureRender from 'pure-render-decorator';
class OrderHead extends React.Component{
	constructor(props){
		super(props);
		this.state={
			styleArry:[]
		}
		this.handlesClick = this.handlesClick.bind(this);
	}
	componentWillMount(){
		let lists=this.props.lists;
		let styleArry=this.state.styleArry;
		lists&&lists.map(function(item,i){
			styleArry.push(item.state===bee.cache('orders_states'));
		})
		this.setState({
			styleArry:styleArry
		})
	}
	//查找所有的兄弟节点
	 siblings(elm) {
			var arr = [];
			var p = elm.parentNode.children;
			for(var i =0,pl= p.length;i<pl;i++) {
			if(p[i] !== elm) arr.push(p[i]);
			}
			return arr;
		}
	handlesClick(e) {

    	let active=e.currentTarget;//绑定事件的元素   而target是触发事件的元素
		active.setAttribute('class','activeLi');
		let state=active.getAttribute('data-state');
		this.siblings(active).map(function(item,i){
			item.setAttribute('class','orderHeadLi')	
		});
		bee.cache('orders_states',state);
		this.props.postParent(state);
	}

	render(){
		let lists=this.props.lists;
		const tabs=(
				lists?lists.map(function(item,i){
					return(
							<li className={this.state.styleArry[i]?'activeLi':'orderHeadLi'} data-state={item.state} key={i} onClick={this.handlesClick}>{item.text}</li>
						)
				},this):""
			)
		return(
				<div className="headUl">
					<ul className="orderHeadUl">
						{tabs}
					</ul>
				</div>
			)
	}
}
export default pureRender(OrderHead);