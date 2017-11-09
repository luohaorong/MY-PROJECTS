import React from 'react';
import {View,Container} from 'amazeui-touch';
import img from '../assets/images/integral_top.png';
import GoldHead from '../components/GoldHead';
import ServiceTitle from '../components/ServiceTitle';
import BalancePayments from '../components/BalancePayments';
import pureRender from 'pure-render-decorator';
class GoldPointPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pointData:[],
			pointAmount:'',
			noData:'preLoad',
			page:2,
			count:2
		}
		this.getListData=this.getListData.bind(this);
		this.isGetData=this.isGetData.bind(this);
	}
	componentDidMount(){
		document.title='我的积分';
		bee.pushUrl();
		let This = this;
		bee.post('/wechat/points',{
			'page':1,
			'size':6
		},function(data){
			if (data.error_code==0) {
				This.setState({
					pointData:data.data.points_record,
					pointAmount:data.data.points
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
			
		bee.post('/wechat/points',{
				"page":page,
				"size":3
			},function(data){
				if(data.error_code===0){
					let getPost=data.data.points_record;
					let tmp=This.state.pointData;
						getPost.map(function(item){
							tmp.push(item);
						});
					if(getPost.length){
						
						This.setState({
							pointData:tmp,
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
		let bgStyle={
			'background':'#e6e6e6'
		}
		return(
			<View>
				<GoldHead img={img} amount={this.state.pointAmount}/>
				<ServiceTitle text='积分获取记录' bgStyle={bgStyle}/>
				<BalancePayments wordShow={true} noData={this.state.noData} isGetData={this.isGetData} DataMoneyDetail={this.state.pointData} empty='您还没有积分记录'loadStyle={{'height':'1.5rem'}}/>
			</View>

			)
	}
}
export default pureRender(GoldPointPage);