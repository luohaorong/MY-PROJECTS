import React from 'react';
import orders_empty from '../assets/images/orders_empty.png';
import {Container} from 'amazeui-touch';
import '../assets/styles/couponContainer.less';
import pureRender from 'pure-render-decorator';
class CouponContainer extends React.Component{
	constructor(props){
		super(props);
	}
	render(){

		let couponContainerData = this.props.couponContainerData || [];
		let couponDetail;
		if (couponContainerData.length>0) {
			couponDetail=(
					couponContainerData&&couponContainerData.map(function(item,i){
						return(
							<div className="couponContainer" key={i}>
								<img className="couponContainerImg" src={bee.image(item.image,268,120)}/>
								<p className="couponContainerMoney">￥<span>{bee.currency(item.value)}</span></p>
								<p className="couponContainerDate">限{item.end_time}前使用</p>
							</div>
							)
					},this)
				)
		}else{
			couponDetail=(
					<div className="couponContainer">
						<img className='MoneyDetailEmptyContainerImg' src={orders_empty}/>
						<p>{this.props.empty}</p>
					</div>
	
			)
		}
		return(
			<Container>
				{couponDetail}
			</Container>
			)
	}
}
export default pureRender(CouponContainer);