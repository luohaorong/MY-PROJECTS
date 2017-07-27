import React from 'react';
import '../assets/styles/bank.less';
import pureRender from 'pure-render-decorator';
import {Link} from 'react-router';
class Bank extends React.Component{
	render(){
		return(
			<div className='bankCard'>
					<img className='bankLogo' src='../assets/images/cashApplay/bankLogo.png'/>
					<div className='bankContent'>
						<p className='bankTitle'>
							{this.props.bankName}
						</p>
						<p className='bankLast'>
							尾号为{this.props.bankNum}的银行卡
						</p>
					</div>
					<Link className='editImg' to='/ChangeBankPage' >
						<img  src='../assets/images/cashApplay/edit.png'/>
					</Link>
				</div>
		)
	}
}
export default pureRender(Bank);
