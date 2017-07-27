import React from 'react';
import {Container} from 'amazeui-touch';
import '../assets/styles/agencyBox.less';
class AgencyBox extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}
		this.changeBg = this.changeBg.bind(this);
	}
	changeBg(type){
		let className;
			switch(type){
				case'yes':
				className= 'profileTtileType proGreen';
				break;
				case'ing':
				className= 'profileTtileType proOrigen';
				break;
				case'no':
				className= 'profileTtileType proRed';
				break;
				default:className='profileTtileType'
			}
		
		return className;
	}
	render(){
		let Data1=this.props.Data1;
		let Data2=this.props.Data2;
		const box=(
					this.props.maybe?(Data1?Data1.map(function(i,j){
						
							return(
								<div className='profileBox' key={'k'+j}>
									<div className='profileTtile'>
										<p className='profileTtileName aaa'>{i.merchant_name}</p>
										<p className='profileTtileMoney'>&yen;{bee.currency(i.total_bonus)}</p>
									</div>
									
									{i.detail.map(function(p,q){
										return(
												<div className='proContainer' key={'p'+q}>
													<p className='proContainerLeft'>{p.created_at}</p>
													<p className='proContainerRight'>&yen;{bee.currency(p.amount)}</p>
												</div>
											)
									})}
								</div>
								)
						}):''
						):(
							Data2?Data2.map(function(i,j){
								let status='';
								if(i.status==='yes'){status='已完成'};
								if(i.status==='ing'){status='审核中'};
								if(i.status==='no'){status='未通过'};
							return(
								<div className='profileBox' key={'d'+j}>
									<div className='profileTtile'>
										<p className='profileTtileName'>{i.withdrawal_sn}</p>
										<div className={this.changeBg(i.status)}>{status}</div>
									</div>
									<div className='proContainer'>
										<p className='proContainerLeft proContainerApply'>申请信息：</p>
										<p className='proContainerRight proContainerRightTime'>{i.created_at.split(' ')[0]}</p>
									</div>
									<div className='proApplyContainer'>
										<div className='applyLeft'>
											<p>户名：</p>
											<p>金额：</p>
											<p>账号：</p>
											<p>开户行：</p>
										</div>
										<div className='applyRight'>
											<p>{i.real_name}</p>
											<p>&yen;{bee.currency(i.amount)}</p>
											<p>{i.bank_account}</p>
											<p>{i.bank_name}</p>
										</div>
									</div>
									{i.remark?(<div className='remarkContainer'>
											<p className='remarkTitle'>备注：</p>
											<div className='remark'>{i.remark}</div>
										</div>):''}
										
									
									
								</div>
								)
						},this):''

						)
						
				
			)

		return(
			
			<Container className='profileCont' style={this.props.profileStyle}>
				{box}
			</Container>
			)
	}
}
export default AgencyBox;