import React from 'react';
import cashBoxPage from '../assets/styles/cashBoxPage.less';
import {Link} from 'react-router';
import failImg from '../assets/images/pay_fail_img.png';
import successImg from '../assets/images/pay_success_img.png';
import PureRendr from 'pure-render-decorator';
class CashBoxPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			payState:false,
			payWay:'微信'
		}
		this.pushHistory=this.pushHistory.bind(this);
	}
	componentDidMount(){
		document.title="收银台";
		bee.pushUrl();
		let cashBox = bee.cache('cashBox')&&JSON.parse(bee.cache('cashBox'));
		// bee.cache('orderDetailUuid',cashBox.order_uuid);
		this.setState({
			payState:cashBox.payState,
			payWay:cashBox.payWay
		})
		this.pushHistory();
		window.addEventListener("popstate", function(e) {  
	        window.location.href='/CashBoxPage';  
	    }, false);
	}
	pushHistory(){
		 let state = {
	        title: "收银台",
	        url: "/CashBoxPage"
    	};
    	window.history.pushState(state, state.title, state.url);
	}
	render(){
		let cashBoxTopWord2='支付失败！';
		let cashBoxTopWord1='已通过'+this.state.payWay+'方式支付成功！';
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth()+1;
		let day = date.getDate();
		let hour = date.getHours();
		let minute = date.getMinutes();
		let second = date.getSeconds();
		let dataStr=year +'-' +month +'-'+day+' '+hour+':'+minute+':'+second;
		const cashBoxMiddle=(
				this.state.payState!==true?(
					<div className="cashBoxMiddle">
						<div className="cashBoxMiddleP">
							<span className="cashBoxMiddlePleft">失败原因</span>
							<span className="cashBoxMiddlePright">{this.state.payWay+'支付失败'}</span>
						</div>
						<div className="cashBoxMiddleP">
							<span className="cashBoxMiddlePleft">支付时间</span>
							<span className="cashBoxMiddlePright">{dataStr}</span>
						</div>
						<div className="cashBoxMiddleP">
							<span className="cashBoxMiddlePleft">支付方式</span>
							<span className="cashBoxMiddlePright">{this.state.payWay}</span>
						</div>
						<div className="cashBoxMiddleP">
							<span className="cashBoxMiddlePleft2">未完成本次订单</span>
						</div>
					</div>
					):''
			)
		return(
			<div className="cashBoxContainer">
				<div className="cashBoxTop">
					<img src={this.state.payState==true?successImg:failImg}/>
					<p className="cashBoxTopWord">{this.state.payState==true?cashBoxTopWord1:cashBoxTopWord2}</p>
				</div>
				{cashBoxMiddle}
				<div className="cashBoxBottom">
					<Link className="cashBoxBottomLinkLeft" to='/'>返回首页</Link>
					<Link to='/MyOrdersDetailPage' className={this.state.payState==true?'cashBoxBottomLinkRight1':'cashBoxBottomLinkRight2'}>查看订单</Link>
				</div>
			</div>
			)
	}
}
export default PureRendr(CashBoxPage);