import React from 'react';
import {Container} from 'amazeui-touch';
import redImg from '../assets/images/icon_arrive.png';
import grayImg from '../assets/images/icon_not_arrive.png';
import '../assets/styles/orderFollowPage.less';
import pureRender from 'pure-render-decorator';
class OrderFollowPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			orderFollow:[]
		}
	}
	componentDidMount(){
		document.title="订单跟踪";
		bee.pushUrl();
		let uuid = bee.getQueryString('uuid');
		let This = this;
		bee.post('/wechat/order/follow',{
			'uuid':uuid
		},function(data){
			if (data.error_code==0) {
				This.setState({
					orderFollow:data.data
				})
			}
		},true);
	}
	render(){
		const orderF=(
				this.state.orderFollow.length>0&&this.state.orderFollow.reverse().map(function(item,i){
					return(
						<div className="orderFollowWraper" key={i}>
							<div className="orderFollowWraperContent">
								<div className="orderFollowWraperContentDescrib">{item.message}</div>
								<p className="orderFollowWraperContentTime">{item.time}</p>
							</div>
							<img className="orderFollowWraperImg" src={i==0?redImg:grayImg} />
						</div>
						)
				},this)
			)
		return(
				<Container scrollable={true} className="orderFollowContainer">
					{orderF}
				</Container>
			)
	}
}
export default pureRender(OrderFollowPage);