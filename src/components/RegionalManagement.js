import React from 'react';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import '../assets/styles/regionalManagement.less';
class RegionalManagement extends React.Component{
	render(){
		let regionalManagement=this.props.regionalManagement;
		return(
				<Link className='regionalContainer' to={regionalManagement.hash}>
					<div className='regionalContent'>
						<div className='regionalLeft'>{regionalManagement.province}</div>
						<div className='regionalRight'>
							<p className='regionalTitle'>{regionalManagement.detail}</p>
							<img className='regionalImg' src='../assets/images/right.png'/>
						</div>
					</div>
				</Link>
			)
	}
}
export default pureRender(RegionalManagement);