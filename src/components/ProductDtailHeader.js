import React from 'react';
import {Link} from 'react-router';
import '../assets/styles/productDtailHeader.less';
import {Container,Grid,Col} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class ProductDtailHeader extends React.Component{
	render(){
		return(
			<Grid align="center" className='gridContainer'>
		            <Col cols={2} className='colWrap'>
		           		<Link to='/ProductDtailPage' className='product' activeClassName='active'>
		           			商品
						</Link>		            
		            </Col>
		            <Col cols={2} className='colWrap'>
		            	<Link to='/ProdcutDtailImagePage' className='product' activeClassName='active'>
		           			详情
						</Link>
		            </Col>
		    </Grid>
		)
	}
}
export default pureRender(ProductDtailHeader);