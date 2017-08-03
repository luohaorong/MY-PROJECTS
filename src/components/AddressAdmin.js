import React from 'react';
import {Tabs,Container,View} from 'amazeui-touch';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import DeliveryAddress from './DeliveryAddress';
import MainAreas from './MainAreas';
import '../assets/styles/rechargeOrPayDetail.less';
class AddressAdmin extends React.Component{
	constructor(props){
		super(props);
		this.state={
			albums:{},
			hrfs:''
		}
		this.checkAdd=this.checkAdd.bind(this);
	}
	checkAdd(e){
		let hrf=e.currentTarget.getAttribute('data-add');
		this.setState({
			hrfs:hrf
		})
	}
	render(){
		let address=this.props.address;
		let main=this.props.main
		const Ptitle1=(
						
							<div className='btnNav' onClick={this.checkAdd} data-add='AddDeliveryPage' >收货地址</div>
						
					)
		const Ptitle2=(
						
							<div className='btnNav' onClick={this.checkAdd} data-add='2'>主营地区</div>
						
					)
		
		const Pdesc1=(
					
						<DeliveryAddress addr={address}/>

					)
		const Pdesc2=(
						<MainAreas mai={main}/>
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
				        <Link className='deliverAdd' to={this.state.hrfs!==''?this.state.hrfs:'AddDeliveryPage'}>
							<img src='/assets/images/address/addareas.png'/>
				        </Link>
			        </Container>
			   
				
				
			   
			)
	}
}
export default pureRender(AddressAdmin);