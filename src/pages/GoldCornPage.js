import React from 'react';
import {View,Container} from 'amazeui-touch';
import img from '../assets/images/gold_top_img.png';
import GoldHead from '../components/GoldHead';
import ServiceTitle from '../components/ServiceTitle';
import BalancePayments from '../components/BalancePayments';
import pureRender from 'pure-render-decorator';
class GoldCornPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			cornData:[],
			cornAmount:'',
			noData:'preLoad',
			page:2,
			count:2
		}
		this.getListData=this.getListData.bind(this);
		this.isGetData=this.isGetData.bind(this);
	}
	componentDidMount(){
		bee.pushUrl();
		let This = this;
		document.title='我的金币';
		bee.post('/wechat/corns',{
			'page':1,
			'size':8
		},function(data){
			if (data.error_code==0) {
				This.setState({
					cornData:data.data.corns_record,
					cornAmount:data.data.corns
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
			
		bee.post('/wechat/corns',{
				"page":page,
				"size":3
			},function(data){
				if(data.error_code===0){
					let getPost=data.data.corns_record;
					let tmp=This.state.cornData;
						getPost.map(function(item){
							tmp.push(item);
						});
					if(getPost.length){
						
						This.setState({
							cornData:tmp,
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
	render(){
		
		let word = '可用金币';
		
		let bgStyle={
			'background':'#e6e6e6'
		}
		return(
			<View>
					<GoldHead img={img} word={word} amount={this.state.cornAmount}/>
					<ServiceTitle text='金币增减记录' bgStyle={bgStyle}/>
					<BalancePayments wordShow={true} noData={this.state.noData} isGetData={this.isGetData} DataMoneyDetail={this.state.cornData} empty='您还没有金币记录' loadStyle={{'height':'1.5rem'}}/>
			</View>

			)
	}
}
export default pureRender(GoldCornPage);