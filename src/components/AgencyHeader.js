import React from 'react';
import '../assets/styles/agencyHeader.less';
import pureRender from 'pure-render-decorator';
class AgencyHeader extends React.Component{
	render(){
		return(
			<div className='headerContainer'>
				{
					this.props.probably?(
						<div className='moneyNumWrap'>
							<p className='moneyNum'>
								{this.props.moneyNum}
							</p>
						</div>
					):(
						<div className='moneyNumWrap'>
							<p className='moneyTime'>
								{this.props.time}
							</p>
							<p className='moneyType'>
								{this.props.type}
							</p>
							<p className='moneyaddress'>
								{this.props.address}
							</p>
							<p className='moneyNum moneysub'>
								{this.props.moneyNum}
							</p>
						</div>
					)
						
				}
			</div>
		)
	}
}
export default pureRender(AgencyHeader);