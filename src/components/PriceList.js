import React from 'react';
import '../assets/styles/priceList.less';
import Swiper from 'swiper';
import pureRender from 'pure-render-decorator';
class PriceList extends React.Component{
	constructor(props){
		super(props);
		this.clickHandler=this.clickHandler.bind(this)
	}
	componentDidMount(){
		//初始化swipe，PriceListContainer是swiper容器的类名，如果一个页面有多个swiper的话，类名不能相同
		var PriceListSwiper = new Swiper('.priceListContainer',{
			slidesPerView : this.props.slideNumber,
			slidesPerGroup : 1
		});
		
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
	clickHandler(event){
		let active=event.currentTarget;//绑定事件的元素   而target是触发事件的元素
		let priceUuid=active.getAttribute('data-uuid');
		this.props.getPriceUuid(priceUuid);
		active.style.border='0.07rem solid #9e1b1b';
		let parentElement=active.parentNode;
		this.siblings(parentElement).map(function(item,i){
			item.firstChild.style.border='0.07rem solid #e6e6e6'
		})
	}
	render(){
		const priceListData=this.props.priceListData;
		let dataPrice=priceListData.price;
		let dataDescrib=priceListData.attribute_labels;
		const ListData=(
			<div className="swiper-container priceListContainer">
				<div className="swiper-wrapper">
					    {
					    	JSON.stringify(priceListData)!=='{}'&&priceListData.value.map(function(item,i){
					    		return(
					    			<div key={i} className='swiper-slide'>
						    			<div className='priceListWrap' onClick={this.clickHandler} data-uuid={item.uuid}>
							            	<p className='listOrigin'>{item.name}</p>
							            	<p className='listPrice'>{dataPrice.map(function(j,k){
							            		if(i===k){return '￥'+bee.currency(j)}
							            	})}</p>
							            	<p className='listType'>{dataDescrib.map(function(n,m){
							            		if (i===m) {return n}
							            	})}</p>
					            		</div>
					    			</div>
								)
							},this)
					    }
				</div>
			</div>
			
		);
		         
		return(
			<div className='swiperListContainer'>
				{ListData}
			</div>
		)
	}
}
export default pureRender(PriceList);