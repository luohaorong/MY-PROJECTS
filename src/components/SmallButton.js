import React from 'react';
import {Link} from 'react-router';
import '../assets/styles/smallButton.less';
import pureRender from 'pure-render-decorator';
class SmallButton extends React.Component{
	constructor(props){
		super(props);
		this.handleClick=this.handleClick.bind(this);
		this.goHref=this.goHref.bind(this);
	}
	goHref(e){
		let active = e.currentTarget;
		let hrf = active.getAttribute('data-hrf');
		window.location.href=hrf;
	}
	handleClick(e){
		let active = e.currentTarget;
		let state = active.getAttribute('data-state');
		bee.cache('orders_states',state);
	}
	render(){
		return(
			<div className="smallButtonContainer">
				<div className="smallButtonCont">
					<Link className="orderCheck" data-state='' onClick={this.handleClick} to="/MyOrdersPage">
						订单查询
					</Link>
					<div className="orderRecharge" onClick={this.goHref} data-hrf="/RechargePage">
						充值
					</div>
				</div>
			</div>
			)
	}	
}
export default pureRender(SmallButton);