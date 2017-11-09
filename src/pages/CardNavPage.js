import React from 'react';
import {Link} from 'react-router';
import '../assets/styles/cardNavPage.less';
import coupon from '../assets/images/coupon.png';
import sample from '../assets/images/sample.png';
import rightImg from '../assets/images/myinformation/lookall.png';
import pureRender from 'pure-render-decorator';
class CardNavPage extends React.Component{
	constructor(props){
		super(props);
		this.handleClick=this.handleClick.bind(this);
	}
	componentDidMount(){
		bee.pushUrl();
		document.title='我的卡券';
	}
	handleClick(e){
		let active = e.currentTarget;
		let orders_states=active.getAttribute('data-status');
		bee.cache('orders_states',orders_states);
	}
	render(){
		return(
			<div className="cardNavContainer">
				<Link className="cardNavLink cardNavLink1" onClick={this.handleClick} data-status='no' to='/CouponPaperPage'>
					<img className="cardNavLinkImg" src={coupon}/>
					<span className="cardNavLinkWord">荟酒券</span>
					<img className="cardNavLinkRight" src={rightImg}/>
				</Link>
				<Link className="cardNavLink" onClick={this.handleClick} data-status='no' to='/SameplePaperPage'>
					<img className="cardNavLinkImg" src={sample}/>
					<span className="cardNavLinkWord">样品券</span>
					<img className="cardNavLinkRight" src={rightImg}/>
				</Link>
			</div>
			)
	}
}
export default pureRender(CardNavPage);