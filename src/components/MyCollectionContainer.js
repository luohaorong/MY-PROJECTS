import React from 'react';
import myCollectionContainer from '../assets/styles/myCollectionContainer.less';
import noSelect from '../assets/images/shoppingCar/ischeck_false.png';
import Selected from '../assets/images/shoppingCar/ischeck_true.png';
import orders_empty from '../assets/images/orders_empty.png';
import product from '../assets/images/home/product.png';
import LoadMore from './LoadMore';
import pureRender from 'pure-render-decorator';
let uuidArr=[];
class MyCollectionContainer extends React.Component{
	constructor(props){
		super(props);
		this.state={
			noData:false,
			empty:false
		}
		this.deleteClick=this.deleteClick.bind(this);
	}
	
	deleteClick(e){
		let active = e.currentTarget;
		let uuid=active.getAttribute('data-uuid');
		let index=active.getAttribute('data-index');
		if (this.props.editState==true) {
			if (active.children[0].src==noSelect) {
				active.children[0].src=Selected;
				uuidArr.push(uuid);
			}else {
				active.children[0].src=noSelect;
				uuidArr.map(function(item,i){
					if(uuidArr[i]==uuid){
						uuidArr.splice(i,1)
					}
				})
			}
			bee.cache('deleteUuid',JSON.stringify(uuidArr));
		}else{
			this.context.router.push('/ProductDtailPage?uuid='+uuid);
		}
	}
	
	render(){
		let editStyle=this.props.editState==true?'block':'none';
		let myCollectionContainer;
		if (this.props.collectionData.length>0) {
			myCollectionContainer=(
					this.props.collectionData&&this.props.collectionData.map(function(item,i){
						return(
								<div className="myCollectionContainer" key={i} data-index={i} data-uuid={item.goods_uuid} onClick={this.deleteClick}>
									<img className="myCollectionContainerSelect" ref="selectImg" style={{display:editStyle}} src={noSelect}/>
									<img className="myCollectionContainerProduct" src={bee.image(item.goods_image,280,400)}/>
									<div className="myCollectionContainerDetail">
										<p className="myCollectionContainerDetailChinese">{item.goods_chinese_name}</p>
										<p className="myCollectionContainerDetailEnglish">{item.goods_english_name}</p>
										<p className="myCollectionContainerDetailPrice">￥{bee.currency(item.price)}</p>
									</div>
								</div>

							)
					},this)
				)
		}else{
			myCollectionContainer=(
				<div className="MoneyDetailEmptyContainer" style={{textAlign:'center'}}>
							<img className='MoneyDetailEmptyContainerImg' src={orders_empty}/>
							<p>{this.props.empty}</p>
				</div>
			)
		}
		return(
				<div>
					{myCollectionContainer}
					<LoadMore isGetData={this.props.isGetData} noData={this.props.noData} loadStyle={this.props.loadStyle}/>
				</div>
			)
	}
}
MyCollectionContainer.contextTypes= {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(MyCollectionContainer);