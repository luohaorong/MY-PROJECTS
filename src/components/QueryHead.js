import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/queryHead.less'
class QueryHead extends React.Component{
	render(){
		let queryData=this.props.queryHead;
		return(
				<div className='queryHead'>
					<div className='queryHeadLeft'>
						<p className='queryLeftWord'>{queryData.time}</p>
						<p className='queryLeftWord'>{queryData.type}</p>
					</div>
					<div className='queryHeadRight'>{queryData.province}</div>
				</div>
			)
	}
}
export default pureRender(QueryHead);