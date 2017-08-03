import React from 'react';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import '../assets/styles/registrationPortal.less';

class RegistrationPortal extends React.Component{
	constructor(props){
		super(props);
		this.bindClick=this.bindClick.bind(this);
	}
	bindClick(e){
		let dataSign = e.currentTarget.getAttribute('data-sign');
		sessionStorage.setItem('dataSign',dataSign)
	}
	render(){
		return(
			<div className='bindAccountWrap'>
				<img className='bindImgTop' src='../assets/images/bindAccount/register.png'/>
				<div className='bindListWrap'>
					<Link className='agencyList' onClick={this.bindClick} data-sign='agency' to='/RegisterCompanyAccountPage'>
						<p className='listText'>我是经销商</p>
						<p className='listEn'>BUSINESS</p>
					</Link>
					<Link className='companyList' onClick={this.bindClick} data-sign='company' to='/RegisterCompanyAccountPage'>
						<p className='listText'>我是企业采购</p>
						<p className='listEn'>PROCUREMENT</p>
					</Link>
				</div>
				<img className='bindImgBottom' src='../assets/images/bindAccount/huabian.png'/>
			</div>
		)
	}
}
export default pureRender(RegistrationPortal);
