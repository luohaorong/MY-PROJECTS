import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/queryBottom.less';
class QueryBottom extends React.Component{
	render(){
		let queryData=this.props.queryBottom;
		return(
				<div className='queryBottom'>
					<p className='queryBottomWords'>当前条件汇总：<span className='queryBottomMoney'>&yen;{queryData}</span></p>
				</div>
			)
	}
}
export default pureRender(QueryBottom);
