import React from 'react';
import '../assets/styles/homeHotTitle.less';
import pureRender from 'pure-render-decorator';
class HomeHotTitle extends React.Component{
	render(){
		return(
			<div className='hotTitleContainer'>
				<img src={this.props.hotProductImg}/>
			</div>
		)
	}
}
export default pureRender(HomeHotTitle);