import React from 'react';
import {Tabs,Container,View} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
import '../assets/styles/deliveryAddress.less';
class DeliveryAddress extends React.Component{
	constructor(props){
		super(props);
		
	}
	render(){
		const add1Data=this.props.addr;
		const addContainer=(
				add1Data.length&&add1Data.map(function(item,i){
					return(
						<div key={i} className="DeliveryContainer">
							<p className='DeliveryWords'>
								<span>{item.name}</span>
								<span>{item.num}</span>
							</p>
							<p className='DeliveryWords'>
								{item.address}
							</p>
							<ul className="DeliveryButton">
								<li className='DeliveryDefault'>
									<img className='DeliveryImage DeliveryImageFirst' src={item.status==='select'?'/assets/images/address/select.png':'/assets/images/address/noselect.png'}/>
									默认地址
								</li>
								<li className='DeliveryEdit'>
									编辑
									<img className='DeliveryImage' src='/assets/images/address/edit.png'/>
								</li>
								<li className='DeliveryDelete'>
									删除
									<img className='DeliveryImage' src='/assets/images/address/deletes.png'/>
								</li>
							</ul>
						</div>
						)
					
				},this)
			)
		return(
				<div>
					{addContainer}
					<div className='deliverEmpty' style={{'width':'100%','height':'1rem','backgroundColor':'#efeff4'}}></div>
					
				</div>
				
				
				
			   
			)
	}
}
export default pureRender(DeliveryAddress);
