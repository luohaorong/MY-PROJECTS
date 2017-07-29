import React from 'react';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import '../assets/styles/businessProfile.less';
import {Container} from 'amazeui-touch';
class BusinessProfile extends React.Component{
	constructor(props){
		super(props);
		
	}
	componentDidMount(){
		
	}

	render(){
		let businessProfile=this.props.businessProfile;
		const business=(
				businessProfile.map(function(item,i){
					return(
					<Link onClick={this.props.fenhongClick}  className='profileContainer' to={item.hash} key={i} data-type={item.timeType} data-title={item.title}>
						<div className='profileContent'>
							<div className='profileLeft'>
								{item.title}
							</div>
							<div className='profileRight'>
								<div className='rightWords'>
									<p className='profileMoney'>
										{item.money}
									</p>
									<p className='profileOrder'>
										{item.many}
									</p>
								</div>
								<img className='profileImg' src='../assets/images/right.png'/>
							</div>
						</div>
					</Link>
						)
				},this)
			)
		return(
				<Container>
					{business}
				</Container>
			)
	}
}
export default pureRender(BusinessProfile);