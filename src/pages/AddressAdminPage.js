import React from 'react';
import {Tabs,View,Container} from 'amazeui-touch';
import AddressAdmin from '../components/AddressAdmin';
import pureRender from 'pure-render-decorator';
class AddressAdminPage extends React.Component{
	constructor(props){
		super(props);
		
	}
	componentWillMount(){
		document.title = '';
	}
	render(){
		const address=[
			{
				name:'罗号容',
				num:'13551372341',
				address:'四川省成都市金牛区盛大国际5栋1202',
				status:'select'
			},
			{
				name:'罗号容',
				num:'13551372341',
				address:'四川省成都市金牛区盛大国际5栋1203',
				status:'noselect'
			}
		];
		const main=[
			{
				address:'成都市金牛区盛大国际5栋1202',
				status:'审核中'
			},
			{
				address:'成都龙泉洪河',
				status:'已通过'
			},
			{
				address:'成都龙泉大面',
				status:'已通过'
			}
		];
		return(
			
				<View>
					<AddressAdmin address={address} main={main}/>
				</View>
			
			)
	}
}
export default pureRender(AddressAdminPage);
