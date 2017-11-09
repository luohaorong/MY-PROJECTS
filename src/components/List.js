import React from 'react';
import {Link} from 'react-router';
import {Container,Grid,Col} from 'amazeui-touch';
import '../assets/styles/list.less';
import pureRender from 'pure-render-decorator';
class List extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const featureImg=this.props.featureImg;
		// 定义feature特色
		const features = (
				  <Grid avg={this.props.avg} className='featureStyle'>
				  	{featureImg&&featureImg.map(function(item,i){
				  			return (
					  			<Col key={i}>
					            	<Link data-uuid={item.uuid} className='swiperLink' to={item.URL}>
						            	<img src={item.img} />
						            	<p>{item.content}</p>
				            		</Link>
			            		</Col>
					  		)
				  	},this)}
		            
		          </Grid>
		         );
		return(
			<Container>
				{features}
			</Container>
		)
	}
}
export default pureRender(List);