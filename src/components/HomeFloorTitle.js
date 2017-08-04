import React from 'react';
import '../assets/styles/homeFloorTitle.less';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
class FloorTitle extends React.Component{
	render(){
		return(
				<p className='floorTitle' style={this.props.bgImg}>
					{this.props.titleText}
					<Link style={this.props.more} to='/ProductDtailPage' className='more'>更多</Link>
				</p>
			
		)
	}
}
export default pureRender(FloorTitle);