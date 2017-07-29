import React from 'react';
import pureRender from 'pure-render-decorator';
import {Container} from 'amazeui-touch';
import '../assets/styles/queryContent.less';
class QueryContent extends React.Component{
	
	
	render(){
	let queryData=this.props.queryData;
	const query=(
			<div className='profileCont'>
					{
						queryData.bonuses?queryData.bonuses.map(function(i,j){
							return(
								<div  key={'k'+j}>
									<div className='profileTtile'>
										<p className='profileTtileName'>{i.merchant_name}</p>
										<p className='profileType'>{i.bonus_source==='agency'?'(经销商)':'(企业用户)'}</p>
										<p className='profileTtileMoney'>&yen;{bee.currency(i.total_bonus)}</p>
									</div>
									{
										i.detail.map(function(p,q){
										return(
												<div className='proContainer' key={'d'+q}>
													<p className='proContainerLeft'>{p.created_at}</p>
													<p className='proContainerRight'>&yen;{bee.currency(p.amount)}</p>
												</div>
											)
										})
									}
								</div>	
								)
						}):''
						
					}
			</div>           
		)
		
		return(
			<Container>
				{query}
			</Container>
			)
	}
}
export default pureRender(QueryContent);