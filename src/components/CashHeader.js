import React from 'react';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import  '../assets/styles/cashHeader.less';
class CashHeader extends React.Component{
	render(){
		return(
			<div className='cashHeaderWrapper'>
				<p className='remainder'>
					{this.props.remainder}
				</p>
				<p className='remainderMoney'>
					{this.props.remainderMoney}
				</p>
				<Link to='/CashApplay'>
					<img className='applayImg' src='../assets/images/cashPage/applay.png'/>
				</Link>
			</div>
		)
	}
}
export default pureRender(CashHeader);
