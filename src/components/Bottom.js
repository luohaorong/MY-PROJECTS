import React from 'react';
import '../assets/styles/bottom.less';
import {Link} from 'react-router';
import {Col,Grid} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class Bottom extends React.Component{
	render(){
		return(
				<Grid className='bottomHomeContainer' avg={4}>
					<Col className='bottomHome' style={this.props.bgImage}>
		            	<Link className='homeLink homeTitle  homeImage' activeStyle={{color: '#333333',backgroundImage:'url(../assets/images/bottom/index-yes.png)'}} to='/index/HomePage'>
			            	首页
	            		</Link>
		            </Col>
		            <Col className='bottomHome' style={this.props.bgImage}>
		            	<Link className='homeLink homeTitle  listImage' activeStyle={{color: '#333333',backgroundImage:'url(../assets/images/bottom/list-yes.png)'}} to='/index/ClassTypePage'>
			            	分类
	            		</Link>
		            </Col>
		            <Col className='bottomHome' style={this.props.bgImage}>
		            	<Link className='homeLink homeTitle shoppingImage' activeStyle={{color: '#333333',backgroundImage:'url(../assets/images/bottom/shopping-yes.png)'}} to='/index/ShoppingCarPage'>
			            	购物车
	            		</Link>
		            </Col>
		            <Col className='bottomHome' style={this.props.bgImage}>
		            	<Link className='homeLink homeTitle  myImage' activeStyle={{color: '#333333',backgroundImage:'url(../assets/images/bottom/my-yes.png)'}} to='/index/MyInformationPage'>
			            	我的
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