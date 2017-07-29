import React from 'react';
import '../assets/styles/serviceTitle.less';
import pureRender from 'pure-render-decorator';
class ServiceTitle extends React.Component{
	render(){
		return(
			<div className='serviceTitle'>{this.props.text}</div>
			)
	}
}
export default pureRender(ServiceTitle);