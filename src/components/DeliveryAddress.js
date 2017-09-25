import React from 'react';
import {Tabs,Container,View} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
import noselect from '../assets/images/address/noselect.png';
import select from '../assets/images/address/select.png';
import '../assets/styles/deliveryAddress.less';
class DeliveryAddress extends React.Component{
	constructor(props){
		super(props);
		this.state={
			selectArray:[]
		}
		this.delete=this.delete.bind(this);
		this.edit=this.edit.bind(this);
		this.setDelivery=this.setDelivery.bind(this);
	}
	componentDidMount(){
		let data = JSON.parse(bee.cache('addressDelivery'));
		let arr = [];
		let j=+bee.cache('addressIndex');
		if (bee.cache('newArr')) {
			data.map(function(item,i){
				arr.push(j===i);
			});
			bee.cache('newArr',arr)
			this.setState({
				selectArray:arr
			})
		}else if(data.length){
				this.setState({
					selectArray : this.int(data,arr)
				})
		}
		
	}
	int(data,selectArray){
		data.map(function(item,i){
			selectArray.push(item.is_default === 'true' ? true :false)
		})
		console.log(selectArray);
		return selectArray;
	}
	delete(e){
		let active = e.currentTarget;
		let uuid = active.getAttribute('data-uuid');
		if (confirm('确定要删除此地址？')) {
			this.context.postDelete(uuid);
		}
		
	}
	edit(e){
		let active = e.currentTarget;
		let real_name=active.getAttribute('data-name');
		let uuid=active.getAttribute('data-uuid');
		let mobile=active.getAttribute('data-mobile');
		let detail=active.getAttribute('data-detail');
		let areas_uuid=active.getAttribute('data-areas');
		let addressEdit={
			uuid:uuid,
			real_name:real_name,
			mobile:mobile,
			detail:detail,
			areas_uuid:areas_uuid
		}
		bee.cache('addressEdit',JSON.stringify(addressEdit));
		this.context.router.push('/AddDeliveryPage?edit=true&origin='+bee.getQueryString("origin"));
	}
	setDelivery(e){
		let active = e.currentTarget;
		let uuid = active.getAttribute('data-uuid');
		let real_name=active.getAttribute('data-name');
		let mobile=active.getAttribute('data-mobile');
		let detail=active.getAttribute('data-detail');
		let addressObj={
			uuid:uuid,
			real_name:real_name,
			mobile:mobile,
			detail:detail
		}
		bee.cache('addressObj',JSON.stringify(addressObj));
		let j= +active.getAttribute('data-index');
		let newArr=[];
		this.state.selectArray.map(function(item,i){
			newArr.push(j===i);
		})
		this.setState({
			selectArray:newArr
		})
		bee.cache('newArr',newArr);
		this.context.postSet(uuid);
		bee.cache('addressIndex',j);
		this.context.router.push('/ConfirmOrderPage?origin=ConfirmOrderPage');
	}
	render(){
		let origin = bee.getQueryString('origin');
		let addArry=[];
		let add1Data=this.props.addr;
		
		let addContainer1=(
				add1Data&&add1Data.map(function(item,i){
					return(
						<div key={i} className="DeliveryContainer">
							<p className='DeliveryWords'>
								<span>{item.real_name}</span>
								<span>{item.mobile}</span>
							</p>
							<p className='DeliveryWords'>
								{item.add + (item.detail!=='undefined'?item.detail:'')}
							</p>
							<ul className="DeliveryButton">
								<li className='DeliveryDefault' data-index={i} onClick={this.setDelivery} data-uuid={item.uuid} data-name={item.real_name} data-mobile={item.mobile} data-detail={item.add + (item.detail!=='undefined'?item.detail:'')}>
									<img className='DeliveryImage DeliveryImageFirst' src={this.state.selectArray[i]?select:noselect}/>
									设为收货地址
								</li>
								<li className='DeliveryEdit' data-areas={item.areas_uuid} data-detail={item.detail!=='undefined'?item.detail:''} data-mobile={item.mobile} data-name={item.real_name} data-uuid={item.uuid} onClick={this.edit}>
									编辑
									<img className='DeliveryImage' src='/assets/images/address/edit.png'/>
								</li>
								<li className='DeliveryDelete' onClick={this.delete} data-uuid={item.uuid}>
									删除
									<img className='DeliveryImage' src='/assets/images/address/deletes.png'/>
								</li>
							</ul>
						</div>

						)
				},this)
			)
			let addContainer2=(
				add1Data&&add1Data.map(function(item,i){
					return(
						<div key={i} className="DeliveryContainer">
							<p className='DeliveryWords'>
								<span>{item.real_name}</span>
								<span>{item.mobile}</span>
							</p>
							<p className='DeliveryWords'>
								{item.add}{item.detail!=='undefined'?item.detail:''}
							</p>
							<ul className="DeliveryButton">
								<li className='DeliveryEdit' data-areas={item.areas_uuid} data-detail={item.detail!=='undefined'?item.detail:''} data-mobile={item.mobile} data-name={item.real_name} data-uuid={item.uuid} onClick={this.edit}>
									编辑
									<img className='DeliveryImage' src='/assets/images/address/edit.png'/>
								</li>
								<li className='DeliveryDelete' onClick={this.delete} data-uuid={item.uuid}>
									删除
									<img className='DeliveryImage' src='/assets/images/address/deletes.png'/>
								</li>
							</ul>
						</div>

						)
				},this)
			)
		if (origin=='ConfirmOrderPage') {
			addArry.push(addContainer1)
		}else{
			addArry.push(addContainer2)
		}
		
		return(
				<div>
					{addArry[0]}
					<div className='deliverEmpty' style={{'width':'100%','height':'1rem','backgroundColor':'#efeff4'}}></div>
				</div>

			)
		}
	
}
DeliveryAddress.contextTypes={
	router: React.PropTypes.object.isRequired,// 向模块组件中，注入路由
	postDelete: React.PropTypes.func,
	postSet:React.PropTypes.func,
	postArray:React.PropTypes.array
}
export default pureRender(DeliveryAddress);
