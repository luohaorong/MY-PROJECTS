import React from 'react';
import {Container,View} from 'amazeui-touch';
import OrderHead from '../components/OrderHead';
import SamepleContainer from '../components/SamepleContainer';
import pureRender from 'pure-render-decorator';
class SameplePaperPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			orders_state:'no',
			samepleData:[]
		}
		this.postParent=this.postParent.bind(this);
	}
	componentDidMount(){
		document.title="我的样品券";
		bee.pushUrl();
		let This = this;
		let orders_state = bee.cache('orders_states');
		this.setState({
			orders_state:orders_state
		})
		bee.post('/wechat/sample/coupons',{
			'status':'no'
		},function(data){
			if (data.error_code==0) {
				This.setState({
					samepleData:data.data
				})
			}
		},true);
	}
	postParent(state){
		let This = this;
		bee.post('/wechat/sample/coupons',{
			'status':state
		},function(data){
			if (data.error_code==0) {
				This.setState({
					samepleData:data.data,
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
				state:'dayoff',
				text:'已过期'
			},
			{
				state:'already',
				text:'已使用'
			}
		];
		
		return(
			<View>
				<OrderHead postParent={this.postParent} lists={lists} orders_state={this.state.orders_state}/>
				<Container scrollable={true}>
					<SamepleContainer empty='您还没有该样品券～' samepleData={this.state.samepleData}/>
				</Container>
			</View>

			)
	}
}
export default pureRender(SameplePaperPage);