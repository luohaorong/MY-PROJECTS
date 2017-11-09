import React from 'react';
import {Container,View} from 'amazeui-touch';
import '../assets/styles/myBalancePage.less';
import {Link} from 'react-router';
import BalancePayments from '../components/BalancePayments';
import pureRender from 'pure-render-decorator';
class MyBalancePage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			myBalanceHeadMoney:'',
			DataMoneyDetail:[],
			noData:'preLoad',
			page:2,
			count:2
		}
		this.goHref=this.goHref.bind(this);
		this.getListData=this.getListData.bind(this);
		this.isGetData=this.isGetData.bind(this);
	}
	componentDidMount(){
		bee.pushUrl();
		document.title="我的余额";
		let This =this;
		bee.post('/wechat/balance',{
			'page':1,
			'size':6
		},function(data){
			if (data.error_code==0) {
				This.setState({
					myBalanceHeadMoney:bee.currency(data.data.balance),
					DataMoneyDetail:data.data.balance_record
				})
			}
			This.setState({
				noData:'preLoad'
			})
		},true);
		
	}
	isGetData(data){
		if(data){
			this.getListData()
		};
	}
	//加载更多商品列表
	getListData(){
		let This=this;
		let page=this.state.page;//第几页
		let count=this.state.count;//每成功获取一次数据page加1
		this.setState({
				noData:'loading'
			});
			
		bee.post('/wechat/balance',{
				"page":page,
				"size":3
			},function(data){
				if(data.error_code===0){
					let getPost=data.data.balance_record;
					let tmp=This.state.DataMoneyDetail;
						getPost.map(function(item){
							tmp.push(item);
						});
					if(getPost.length){
						
						This.setState({
							DataMoneyDetail:tmp,
							noData:'preLoad'
						});

					}else{
						This.setState({
							noData:'onData'
						});
					}
					count++;
					This.setState({
						page:count,
						count:count
						
					})
				}
			},true);
	}
	goHref(e){
		let active = e.currentTarget;
		let hrf = active.getAttribute('data-hrf');
		window.location.href=hrf;
	}
	render(){
		let DataMoneyDetail=this.state.DataMoneyDetail;
		return(
				
				<View className='myBalance'>
					<div className='myBalanceHead'>
						<div className='myBalanceHeadTop'></div>
						<div className='myBalanceHeadBottom'>
							<div className='myBalanceHeadBottomLeft'>
								<p className='myBalanceHeadTitle'>当前余额</p>
								<p className='myBalanceHeadMoney'>{'￥'+this.state.myBalanceHeadMoney}</p>
							</div>
							<div className='myBalanceHeadBottomRight'>
								<Link onClick={this.goHref} className='myBalanceToRecharge' data-hrf='/RechargePage'>前往充值</Link>
							</div>
						</div>
					</div>
					<div className='myBalanceContainer'>
						<div className='myBalanceContainerTitle'>收支明细</div>
					</div>
					<BalancePayments empty="您还没有收支记录～" noData={this.state.noData} isGetData={this.isGetData} DataMoneyDetail={this.state.DataMoneyDetail} loadStyle={{'height':'1.5rem'}}/>
				</View>
			)
	}
}
export default pureRender(MyBalancePage);