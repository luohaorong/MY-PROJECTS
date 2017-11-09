import React from 'react';
import {Tabs,Container,View} from 'amazeui-touch';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import DeliveryAddress from './DeliveryAddress';
import MainAreas from './MainAreas';
import AddAddress from './AddAddress';
import '../assets/styles/rechargeOrPayDetail.less';
class AddressAdmin extends React.Component{
	constructor(props){
		super(props);
		let str=(bee.getQueryString('origin')=='ConfirmOrderPage'?'AddDeliveryPage?origin=ConfirmOrderPage':'AddDeliveryPage');
		this.state={
			albums:{},
			hrfs:str,
			type:false
		}
		this.checkAdd=this.checkAdd.bind(this);
		
	}
	checkAdd(e){
		let hrf=e.currentTarget.getAttribute('data-add');
		this.setState({
			hrfs:hrf
		})
		if (hrf=='AddMainPage') {
			this.setState({
				type:true
			})
		}else{
			this.setState({
				type:false
			})
		}
	}
	render(){
		let addressDelivery=this.props.addressDelivery;
		let addressMain=this.props.addressMain;
		const Ptitle1=(
						
							<div className='btnNav' onClick={this.checkAdd} data-add={bee.getQueryString('origin')=='ConfirmOrderPage'?'AddDeliveryPage?origin=ConfirmOrderPage':'AddDeliveryPage'} >收货地址</div>
						
					)
		const Ptitle2=(
						
							<div className='btnNav' onClick={this.checkAdd} data-add={bee.getQueryString('origin')=='ConfirmOrderPage'?'AddMainPage?origin=ConfirmOrderPage':'AddMainPage'}>主营地区</div>
						
					)
		
		const Pdesc1=(
					
						<DeliveryAddress addr={addressDelivery}/>

					)
		const Pdesc2=(
						<MainAreas mai={addressMain}/>
					)
		
		const albums = [
						  {
						    title:Ptitle1,
						    desc: Pdesc1
						      
						  },
						  {
						    title: Ptitle2,
						    desc: Pdesc2
						  }
						];
		
		let num=albums.length;
		return(
				
				
					<Container scrollable={true}>
					<Tabs className='proDeInfoContainer'>
			            	{albums.map((ablum, i) => {
				              	return (
							                <Tabs.Item title={ablum.title} key={i} disabled={i === num}>
							                  		{ablum.desc}
							                </Tabs.Item>
				              		)
			            		})
			        		}
			        </Tabs>
			        	<AddAddress type={this.state.type} hrfs={this.state.hrfs}/>
				       
			        </Container>
			   
				
				
			   
			)
	}
}
export default pureRender(AddressAdmin);