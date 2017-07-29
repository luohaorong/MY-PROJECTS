import React from 'react';
import {Link} from 'react-router';
import '../assets/styles/smallButton.less';
import pureRender from 'pure-render-decorator';
class SmallButton extends React.Component{
	render(){
		return(
			<div className="smallButtonContainer">
				<div className="smallButtonCont">
					<Link className="orderCheck" to="/">
						订单查询
					</Link>
					<Link className="orderRecharge" to="/">
						充值
					</Link>
				</div>
			</div>
			)
	}	
}
export default pureRender(SmallButton);