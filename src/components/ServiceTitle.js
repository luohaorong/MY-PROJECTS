import React from 'react';
import '../assets/styles/serviceTitle.less';
import pureRender from 'pure-render-decorator';
class ServiceTitle extends React.Component{
	render(){
		let bgStyle=this.props.bgStyle;
		return(
			<div style={bgStyle&&bgStyle} className='serviceTitle'>{this.props.text}</div>
			)
	}
}
export default pureRender(ServiceTitle);