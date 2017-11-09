import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/orderBlankGoods.less';
import {Link} from 'react-router';
import {Container} from 'amazeui-touch';
export default pureRender(class OrderBlankGoods extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let {goods} = this.props;
		return(
			<Container style={{background:'#fff',marginBottom:'0.4rem'}}>
			{
				goods.length&&goods.map(function(item,k){
					let {sub_label} = item;
					return (
						<Link to={'/ProductDtailPage?uuid='+item.goods_uuid} key = {'orderGoods' + k} className = 'orderGoodsContainer'>
							<div className = 'orderGoodsImgWrap'>
								<img className = 'orderGoodsImg' src = {bee.image(item.goods_image,280,400)} />
							</div>
							<div className = 'orderGoodsDescribe'>
								<p className = 'title'>
									{item.goods_chinese_name}
								</p>
								<p className = 'priceBottle'> 
									<span className = 'price'>
										￥{bee.currency(item.goods_price)}/瓶
									</span>
									<span className = 'bottleNum'>
									{item.stocking_pricing_ratio}瓶装   X  {item.goods_num + item.stocking_unit}
									</span>
								</p>
								{
									sub_label.map(function(j,q){
										return (
											<p key = {q} className = 'type'>
												{j.name + j.remark}
											</p>
										)
									})
								}
								
							</div>
						</Link>
					)
				})
			}
			</Container>
		)
	}
})
