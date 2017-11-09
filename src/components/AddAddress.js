import React from 'react';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
class AddAddress extends React.Component{
	constructor(props){
		super(props);
		this.state={
			url:this.props.hrfs,
			style:'deliverAdd'
		}
	}
	componentWillReceiveProps(nextProps){
		let user_type=bee.cache('user_type');
		if (nextProps.hrfs=='AddDeliveryPage') {
			this.setState({
				url:'AddDeliveryPage'
				
			})
		}
		if (nextProps.hrfs=='AddMainPage') {
			this.setState({
				url:'AddMainPage'
				
			})
		}
		if (nextProps.hrfs=='AddMainPage?origin=ConfirmOrderPage') {
			this.setState({
				url:'AddMainPage?origin=ConfirmOrderPage'
				
			})
		}
		if (nextProps.hrfs=='AddDeliveryPage?origin=ConfirmOrderPage') {
			this.setState({
				url:'AddDeliveryPage?origin=ConfirmOrderPage'
				
			})
		}
				if (nextProps.type==true) {
					if (user_type!=='agency') {

						this.setState({
							style:'deliverAddHide'
						})
					}else{
						this.setState({
							style:'deliverAdd'
						})
					}
				}else{
					this.setState({
						style:'deliverAdd'
					})
				}
	}

	render(){
		return(
				 <Link className={this.state.style} to={this.state.url}>
							<img src='/assets/images/address/addareas.png'/>
				 </Link>
			)
	}
}
export default pureRender(AddAddress);