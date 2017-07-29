import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/regionContainer.less';
class RegionContainer extends React.Component{
	render(){
		let regionContainer=this.props.regionContainer;
		const regionInfo=(
				regionContainer.map(function(i,j){
					return(
						<div className='regionContent' key={j}>
							<p className='regionContentLeft'>{i.areas_name}</p>
							<p className='regionContentRight'>{i.staff_name?(i.staff_name+'('+i.staff_mobile+')'):'暂无代理商'}</p>
						</div>
						)
				})
				
			)
		return(
				<div className='regionContainer'>
					{regionInfo}
				</div>
			)
	}
}
export default pureRender(RegionContainer)