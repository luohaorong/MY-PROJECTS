import React from 'react';
import {Container,View} from 'amazeui-touch';
import OrderHead from '../components/OrderHead';
import CouponContainer from '../components/CouponContainer';
import pureRender from 'pure-render-decorator';
class CouponPaperPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			orders_state:'no',
			couponData:[]
		}
		this.postParent=this.postParent.bind(this);
	}
	componentDidMount(){
		let This = this;
		document.title="我的荟酒券";
		let orders_state = bee.cache('orders_states');
		this.setState({
			orders_state:orders_state
		})
		bee.pushUrl();
		bee.post('/wechat/voucher/list',{
			'status':'no'
		},function(data){
			if (data.error_code==0) {
				This.setState({
					couponData:data.data
				})
			}
		},true);
	}
	postParent(state){
		let This = this;
		bee.post('/wechat/voucher/list',{
			'status':state
		},function(data){
			if (data.error_code==0) {
				This.setState({
					couponData:data.data,
					orders_state:state
				})
			}
		},true);
	}
	render(){
		let lists=[
			{
				state:'no',
				text:'未使用'
			},
			{
				state:'over_time',
				text:'已过期'
			},
			{
				state:'yes',
				text:'已使用'
			}
		];
		
		return(
			<View>
				<OrderHead postParent={this.postParent} lists={lists} orders_state={this.state.orders_state}/>
				<Container scrollable={true}>
					<CouponContainer empty='您还没有该荟酒券～' couponContainerData={this.state.couponData}/>
				</Container>
			</View>
			)
	}
}
export default pureRender(CouponPaperPage);