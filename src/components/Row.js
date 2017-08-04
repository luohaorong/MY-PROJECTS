import React from 'react';
import '../assets/styles/row.less';
import {Link} from 'react-router';
import {Col,Grid} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class Row extends React.Component{
	render(){
		let newImg=this.props.newImg;

		const list=(
					<Grid avg={this.props.avg}>
					  	{
					  		newImg.map(function(item,i){
					  			let content=item.tit ?item.tit: "&nbsp;"
						  		return (
						  			<Col key={i} className='colContainer'>
						            	<Link className='rowLink' to={item.hrf}>
							            	<img className='rowImage' src={item.img} />
							            	<p className='rowTitle' dangerouslySetInnerHTML={{__html:content}}></p>
					            		</Link>
				            		</Col>
						  		)
					  		})
					  	}
		            
		           </Grid>
			)
		
		return(
				<div className='rowContainer'>
					
						{list}
					
				</div>
			)
	}
}
export default pureRender(Row);