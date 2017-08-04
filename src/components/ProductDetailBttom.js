import React from 'react';
import {Link} from 'react-router';
import '../assets/styles/productDetailBttom.less';
import pureRender from 'pure-render-decorator';
class ProductDetailBttom extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isExclusive:this.props.isExclusive
		}
	}
	render(){
		return(
			<div className='detailWrap'>
				{this.state.isExclusive?(
					<div className='detailBottomContainer'>
						<Link to='/index/ShoppingCarPage' className='detailLeft'>
								采购车
						</Link>
						<div className='detailRight'>
							<div className='detailRightShoppingCar'>
								加入购物车
							</div>
							<Link to='/SoleAgencyPage' className='detailRightExclusive'>
								独家代理
							</Link>
						</div>
					</div>
				):(
					<div className='detailBottomContainer'>
						<Link to='/index/ShoppingCarPage' className='detailLeft'>
								采购车
						</Link>
						<div className='detailRight'>
								加入采购车
						</div>
					</div>)}
				
			</div>
		)
	}
}
export default pureRender(ProductDetailBttom)
