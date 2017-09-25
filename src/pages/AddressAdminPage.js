import React from 'react';
import {Tabs,View,Container} from 'amazeui-touch';
import AddressAdmin from '../components/AddressAdmin';
import pureRender from 'pure-render-decorator';
class AddressAdminPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			addressDelivery:[],
			addressMain:[],
			user_type:''
		}
		this.postDelete = this.postDelete.bind(this);
		this.postSet = this.postSet.bind(this);
	}
	getChildContext(){
		return {
			postDelete:this.postDelete,
			postSet :this.postSet,
			postArray:this.state.addressDelivery
		}
	}
	postDelete(data){
		let This=this;
		bee.post('/wechat/delete/address',{
			'uuid':data
		},function(data){
			if (data.error_code==0) {
				This.setState({
					addressDelivery:data.data.address
				})
				bee.cache('addressDelivery',data.data.address);
			}
		},true)
	}
	postSet(uuid){
		let This=this;
		if (bee.getQueryString('origin')=='ConfirmOrderPage') {
			bee.cache('address_uuid',uuid);
		}
	}
	componentDidMount(){
		document.title = '地址管理';
		bee.pushUrl();
		let token=bee.localCache('token');
		let This=this;
		bee.post('/wechat/list/address',{
			'token':token
		},function(data){
			if (data.error_code==0) {
				This.setState({
					addressDelivery:data.data.address,
					user_type:data.data.member_type
				})
				bee.cache('user_type',data.data.member_type);
				bee.cache('addressDelivery',data.data.address);
			}
		},true);
		let user_type=bee.cache('user_type');
		if (user_type=='agency') {
			bee.post('/wechat/areas/list',{
				'page':1,
				'size':6
			},function(data){
				if (data.error_code==0) {
					This.setState({
						addressMain:data.data
					})
				}
			},true);
		}
	}
	render(){
		let user_type=this.state.user_type;
		return(
			
				<View>
					<AddressAdmin addressDelivery={this.state.addressDelivery} addressMain={this.state.addressMain} user_type={user_type}/>
				</View>
			
			)
	}
}
AddressAdminPage.childContextTypes={
	postDelete:React.PropTypes.func,
	postSet:React.PropTypes.func,
	postArray:React.PropTypes.array
}
export default pureRender(AddressAdminPage);
