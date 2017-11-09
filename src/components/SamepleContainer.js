import React from 'react';
import orders_empty from '../assets/images/orders_empty.png';
import {Container} from 'amazeui-touch';
import '../assets/styles/samepleContainer.less';
import pureRender from 'pure-render-decorator';
class SamepleContainer extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let samepleData = this.props.samepleData || [];
		let samepleDetail;
		if (samepleData.length>0) {
			samepleDetail=(
					samepleData&&samepleData.map(function(item,i){
						return(
								<div className="samepleContainer" key={i}>
									<img className="samepleContainerImg" src={bee.image(item.image,260,160)}/>
									<p className="samepleContainerRuler">
										{item.note}
									</p>
									<p className="samepleContainerDate">
										{'有效期：'+item.begin_time+'至'+item.end_time}
									</p>
									<p className="samepleContainerBottom">
										可申请一款样品
									</p>
								</div>
							)
					})
				)
		}else{
			samepleDetail=(
					<div className="couponContainer">
						<img className='MoneyDetailEmptyContainerImg' src={orders_empty}/>
						<p>{this.props.empty}</p>
					</div>
	
			)
		}
		return(
				<Container>
					{samepleDetail}
				</Container>
			)
	}
}
export default pureRender(SamepleContainer);