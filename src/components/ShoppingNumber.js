import React from 'react';
import ServiceInformation from '../components/ServiceInformation';
import Number from '../components/Number';
import '../assets/styles/shoppingNumber.less';
import pureRender from 'pure-render-decorator';
class ShoppingNumber extends React.Component{
	render(){
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
				<Number ref='number'/>
				<span className='shoppingDescribe text-truncate'>
					箱（6支装）共60瓶
				</span>
			</div>
		)
		return(
			<ServiceInformation titleStyle={titleStyle} contentStyle={contentStyle} title='数量' content={content}/>
		)
	}
}
export default pureRender(ShoppingNumber);