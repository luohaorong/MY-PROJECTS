import React from 'react';
import {Container,View} from 'amazeui-touch';
import myShareDetailPage from '../assets/styles/myShareDetailPage.less';
import orders_empty from '../assets/images/orders_empty.png';
import pureRender from 'pure-render-decorator';
class MyShareDetailPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			shareDetailData:{}
		}
	}
	componentDidMount(){
		bee.pushUrl();
		document.title="分享详情";
		let This = this;
		bee.post('/wechat/share/list',{},function(data){
			if (data.error_code===0) {
				This.setState({
					shareDetailData:data.data
				})
			}
		},true);
	}
	render(){
		let shareDetailData=this.state.shareDetailData;
		let shareList=shareDetailData.share_list;
		let shareContainer;
		if (shareList&&shareList.length<=0) {
			shareContainer=(
					<div className="ordersEmptyContainer">
						<img className="ordersEmpty" src={orders_empty}/>
						<p>暂时没有分享详情</p>
					</div>
				)
		}else{
			shareContainer=(
				shareList&&shareList.map(function(item,i){
					return(
						<div className="shareDetailList" key={i}>
							<div className="shareDetailListLeft">
								<p className="shareListName">{item.real_name+'（'+item.mobile+'）'}</p>
								<p>{item.created_at}</p>
							</div>
							<p className="shareDetailListRight">
								已返金币{item.corn}
							</p>
						</div>
					)
				},this)
			)
		}
		return(
			<View className="shareDetailContainer">
				<div className="shareDetailHead">
					<p className="shareHeadCoin">已赚取金币<span>{shareDetailData.coins}</span>个</p>
					<p className="shareHeadDetail">成功邀请<span>{shareDetailData.count}</span>人，已有<span>{shareDetailData.buy_count}</span>人购买商品</p>
				</div>
				<Container scrollable={true}>
					<div className="shareDetailBody">
						{shareContainer}
					</div>
				</Container>
			</View>
			)
	}
}
export default pureRender(MyShareDetailPage);