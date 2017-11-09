import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/confirmOrderStatistics.less';
class ConfirmOrderStatistics extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let {statistics} = this.props;
		return(
			<section className = 'statisList'>
				{
					statistics.map(function(item,k){
						return(
							<p key = {'statis' + k} className = 'statisItem'>
								<span className = 'statisTitle'>
									{item.title}
								</span>
								<span className = 'statisContent'>
									{item.content}
								</span>
							</p>
						)
					})
					
				}
			</section>
		)
	}
}

export default pureRender(ConfirmOrderStatistics);
