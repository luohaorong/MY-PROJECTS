import React from 'react';
import '../assets/styles/bottom.less';
import {Link} from 'react-router';
import {Col,Grid} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class Bottom extends React.Component{
	render(){
		return(
				<Grid className='bottomHomeContainer' avg={2}>
					<Col className='bottomHome' style={this.props.bgImage}>
		            	<Link className='homeLink homeTitle  homeImage' activeStyle={{color: '#333333',backgroundImage:'url(../assets/images/bottom/my_hover.png)'}} to='/index/AgencyIndexPage'>
			            	首页
	            		</Link>
		            </Col>
		            <Col className='bottomHome' style={this.props.bgImage}>
		            	<Link className='homeLink homeTitle  listImage' activeStyle={{color: '#333333',backgroundImage:'url(../assets/images/bottom/tixian_hover.png)'}} to='/index/CashPage'>
			            	分类
	            		</Link>
		            </Col>
		            
		    </Grid>
			)
	}
}
Bottom.defaultProps={
	bgImage:{}
}
export default pureRender(Bottom);