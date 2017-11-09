import React from 'react';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import '../assets/styles/registrationPortalPage.less';

class RegistrationPortalPage extends React.Component{
	constructor(props){
		super(props);
		this.bindClick=this.bindClick.bind(this);
	}
	componentDidMount(){
		bee.pushUrl();
		document.title='注册'
	}
	bindClick(e){
		let dataSign = e.currentTarget.getAttribute('data-sign');
		sessionStorage.setItem('dataSign',dataSign)
	}
	render(){
		return(
			<div className='bindAccountWrap'>
				<div className='bindTitle'>
					<p className='titleText titleTextTop'>为了更好的购物体验，请确认您的身份</p>
					<p className='titleText'>confirm your identity</p>
				</div>
				<div className='bindListWrap'>
					<Link className='rigisterList' onClick={this.bindClick} data-sign='agency' to='/RegisterCompanyAccountPage'>
						<p className='rigisterTypeWrap'>
							<img className='rigisterType' src='/assets/images/bindAccount/agency.png'/>
						</p>
						<ul className='contentList'>
							<li className='contentItem firstItem'>
								<p className='chineseTitle'>我是经销商</p>
								<p className='enTitle'>BUSINESS</p>
							</li>
							<li className='contentItem'>注册须知：</li>
							<li className='contentItem'>需要提供具备酒类经营范围的</li>
							<li className='contentItem'>有效营业执照。</li>
							
						</ul>
					</Link>
					<Link className='rigisterList' onClick={this.bindClick} data-sign='company' to='/RegisterCompanyAccountPage'>
						<p className='rigisterTypeWrap'>
							<img className='rigisterType' src='/assets/images/bindAccount/company.png'/>
						</p>
						<ul className='contentList'>
							<li className='contentItem firstItem'>
								<p className='chineseTitle'>我是企业采购</p>
								<p className='enTitle'>PROCUREMENT</p>
							</li>
							<li className='contentItem'>注册须知：</li>
							<li className='contentItem'>需要提供企事业单位的有效</li>
							<li className='contentItem'>授权采购证明。</li>
							
						</ul>
					</Link>
				</div>
			</div>
		)
	}
}
export default pureRender(RegistrationPortalPage);
