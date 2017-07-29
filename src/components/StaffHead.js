import React from 'react';
import pureRender from 'pure-render-decorator';
import {Container} from 'amazeui-touch';
import '../assets/styles/staffHead.less';
class StaffHead extends React.Component{
	render(){
		let dataHead=this.props.dataHead;
		return(
			<Container className='headContainer'>
				<img src={dataHead.img} className='headImg' />
				<div className='headRight'>
					<p className='headProvince'>{dataHead.province}</p>
					<p className='headName'>{dataHead.name}<span className='headTime'>{dataHead.time}</span></p>
				</div>
			</Container>
			)
	}
}
export default pureRender(StaffHead);