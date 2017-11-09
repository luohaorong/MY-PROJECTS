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
		this.clickHeadle=this.clickHeadle.bind(this);
		this.clickExclusive=this.clickExclusive.bind(this);
	}
	componentWillReceiveProps(nextprops){
		this.setState({
			isExclusive:nextprops.isExclusive
		})
	}
	//加入购物车点击事件
	clickHeadle(e){
		this.props.submitCar(true);
	}
	//跳转独家协议页面点击事件
	clickExclusive(){
		let exclusive_uuid=this.props.exclusive_uuid;
		bee.cache('exclusive_uuid',exclusive_uuid);
	}
	render(){
		return(
			<div className='detailWrap'>
				{this.state.isExclusive?(
					<div className='detailBottomContainer'>
						<Link to='/index/ShoppingCarPage' className='detailLeft'>
								采购车
								<span className='shoppingNumber'>{this.props.shoppingNum}</span>
						</Link>
						<div className='detailRight'>
							<div className='detailRightShoppingCar' onClick={this.clickHeadle}>
								加入购物车
							</div>
							<Link to='/SoleAgencyPage' onClick={this.clickExclusive} className='detailRightExclusive'>
								独家代理
							</Link>
						</div>
					</div>
				):(
					<div className='detailBottomContainer'>
						<Link to='/index/ShoppingCarPage' className='detailLeft'>
								采购车
								<span className='shoppingNumber'>{this.props.shoppingNum}</span>
						</Link>
						<div className='detailRight' onClick={this.clickHeadle}>
								加入采购车
						</div>
					</div>)}
				
			</div>
		)
	}
}
export default pureRender(ProductDetailBttom)
