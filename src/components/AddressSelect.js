import React from 'react';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import '../assets/styles/addressSelect.less';
export default pureRender(class AddressSelect extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let defaultAddress = this.props.defaultAddress;
		let addressSelect = JSON.parse(bee.cache('addressObj'));
		let resetData = bee.cache('reset');
		return (
			<section className='addressSelectWrapper'>
				<article className='addressSelectContainer'>
					<div className='addressSelect'>
						<i className='addressImg'></i>
						{
								defaultAddress && (
										<Link className='selectLink' to={'/AddressAdminPage?origin=ConfirmOrderPage'}>
											<p className='receiveIfo'>
												<span className='receivePerson'>
													收货人:
												</span>
												<span className='receiveName'>
													{defaultAddress.real_name}
												</span>
												<span className='receivePhone'>
													{defaultAddress.mobile}
												</span>
											</p>
											<p className='receiveAddressIfo'>
												<span className='receiveAddressTitle'>
													收货地址:
												</span>
												<span className='receiveAddressText'>
													{defaultAddress.add + defaultAddress.detail}
												</span>
											</p>
										</Link>
								) || (
										addressSelect  ?(
											<Link  className='selectLink' to={'/AddressAdminPage?origin=ConfirmOrderPage'}>
												<p className='receiveIfo'>
													<span className='receivePerson'>
														收货人:
													</span>
													<span className='receiveName'>
														{addressSelect.real_name}
													</span>
													<span className='receivePhone'>
														{addressSelect.mobile}
													</span>
												</p>
												<p className='receiveAddressIfo'>
													<span className='receiveAddressTitle'>
														收货地址:
													</span>
													<span className='receiveAddressText'>
														{addressSelect.detail}
													</span>
												</p>
											</Link>
										):(
											<Link className='selectLink' to='/AddressAdminPage?origin=ConfirmOrderPage'>
												<p className='pleaseSelect'>请选择收货地址</p>
											</Link>
										)
									)
								
							
							
						}
						
						<i className='addressRight'></i>
					</div>
					<p className='addressSeparate'></p>
				</article>
			</section>
		)
	}
})