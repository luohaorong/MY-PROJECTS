import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/regionHead.less'
class RegionHead extends React.Component{
	render(){
		let regionHeadData=this.props.regionHead;
		return(
				<div className='regionHead'>
					<p className='regionHeadProvince'>{regionHeadData.province}</p>
					<p className='regionHeadDetail'>共<span>{regionHeadData.total}</span>个区级地域，现有<span>{regionHeadData.none}</span>个无业务经理</p>
				</div>
			)
	}
}
export default pureRender(RegionHead)
