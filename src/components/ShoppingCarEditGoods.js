import React from 'react';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import '../assets/styles/shoppingCarEditGoods.less';
import noSelect from '../assets/images/shoppingCar/ischeck_false.png';
import Selected from '../assets/images/shoppingCar/ischeck_true.png';
import {Container} from 'amazeui-touch';
class ShoppingCarEditGoods extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isEdit:false,
			price_amount:0,
			goods_amount:0,
			goods_total:0
		};
		this.editClick=this.editClick.bind(this);
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			price_amount:+nextProps.price_amount,
			goods_amount:+nextProps.goods_amount,
			goods_total:+nextProps.goods_total
		})
	}
	editClick(){
		this.state.isEdit?this.setState({isEdit:false}):this.setState({isEdit:true})
	}
	render(){
		let bottom = this.props.bottom||false;
		return(
			<Container>
				{
					bottom?(<div className='editGoodsWrap bottomStyle'>
					<div className='bottomSelect'>
						<p onClick={this.props.onClick}>
							<img className='selectImg' src={this.props.src}/>
							<span className='selectText'>
								全选
							</span>
						</p>
					</div>
					<div className='bottomCount'>
						<p className='bottomTatal'>
							<span>
								合计：
							</span>
							<span>
								￥{bee.currency(this.state.price_amount)}
							</span>
						</p>
						<p className='bottomBox'>
							<span>
								共{this.state.goods_amount}箱
							</span>
							<span>
								（{this.state.goods_total}瓶(支)）
							</span>
						</p>
					</div>
					<Link className='bottomBtn' to='/ConfirmOrderPage'>
						结算
					</Link>
				</div>):(<div className='editGoodsWrap topGoodsWrap'>
					<div>
						<p onClick={this.props.onClick}>
							<img className='selectImg' src={this.props.src}/>
							<span className='selectText'>
								全选
							</span>
						</p>
					</div>
						{this.state.isEdit?
							(<div className='editMiddle'>
							<p className='collection' onClick={this.props.collectionClick}>
							移入收藏夹
						</p>
						<p className='delet' onClick={this.props.deletClick}>
							删除
						</p></div>):(<p></p>)}
					
					<div className='editOperation' onClick={this.editClick}>
						{this.state.isEdit?'取消':'编辑商品'}
					</div>
				</div>)
				}
				
			</Container>
		)
	}
}
export default pureRender(ShoppingCarEditGoods);