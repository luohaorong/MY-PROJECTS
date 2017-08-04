import React from 'react';
import ServiceInformation from '../components/ServiceInformation';
import Number from '../components/Number';
import '../assets/styles/shoppingNumber.less';
import pureRender from 'pure-render-decorator';
class ShoppingNumber extends React.Component{
	valueData(data){
		this.props.getNumber(data);
	}
	render(){
		let packingData=this.props.data;
		bee.cache("quantity",packingData.moq);
		//定义ServiceInformation组件的样式
		let titleStyle={
			width:'auto',
			paddingRight:'1rem'
		}
		let contentStyle={
			width:'79%',
			marginTop:'6px'
		}
		const content=(
			<div className='numberContainer'>
				<Number ref='number' moq={packingData.moq} isMoq={this.props.isMoq} valueData={this.valueData.bind(this)}/>
				<span className='shoppingDescribe text-truncate'>
					{packingData.stocking_unit+"("+packingData.stocking_pricing_ratio+"支装"+")，共"+this.props.bottleNum*packingData.stocking_pricing_ratio+packingData.pricing_unit}
				</span>
			</div>
		)
		return(
			<ServiceInformation titleStyle={titleStyle} contentStyle={contentStyle} title='数量' content={content}/>
		)
	}
}
export default pureRender(ShoppingNumber);