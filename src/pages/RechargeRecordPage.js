import React from 'react';
import {Tabs,View,Container} from 'amazeui-touch';
import RechargeOrPayDetail from '../components/RechargeOrPayDetail';
import pureRender from 'pure-render-decorator';
class RechargeRecordPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			rechargeData:[],
			payData:[],
			noData1:'preLoad',
			page1:2,
			count1:2,

			noData2:'preLoad',
			page2:2,
			count2:2
		}
		this.getListData1=this.getListData1.bind(this);
		this.isGetData1=this.isGetData1.bind(this);
		this.getListData2=this.getListData2.bind(this);
		this.isGetData2=this.isGetData2.bind(this);
	}
	componentDidMount(){
		bee.pushUrl();
		document.title="充值/消费记录";
		let This = this;
		bee.post('/wechat/recharges/record',{
			'page':1,
			'size':8
		},function(data){
			if (data.error_code==0) {
				This.setState({
					rechargeData:data.data
				})
			}
			This.setState({
				noData1:'preLoad'
			})
		},true)
		bee.post('/wechat/consume/record',{
			'page':1,
			'size':8
		},function(data){
			if (data.error_code==0) {
				This.setState({
					payData:data.data
				})
			}
			This.setState({
				noData2:'preLoad'
			})
		},true)
		
	}
	isGetData1(data){
		if(data){
			this.getListData1()
		};
	}
	isGetData2(data){
		if(data){
			this.getListData2()
		};
	}
	//加载更多商品列表
	getListData1(){
		let This=this;
		let page=this.state.page1;//第几页
		let count=this.state.count1;//每成功获取一次数据page加1
		this.setState({
				noData1:'loading'
			});
		bee.post('/wechat/recharges/record',{
				"page":page,
				"size":3
			},function(data){
				if(data.error_code===0){
					let getPost=data.data;
					let tmp=This.state.rechargeData;
						getPost.map(function(item){
							tmp.push(item);
						});
					if(getPost.length){
						
						This.setState({
							rechargeData:tmp,
							noData1:'preLoad'
						});

					}else{
						This.setState({
							noData1:'onData'
						});
					}
					count++;
					This.setState({
						page1:count,
						count1:count
						
					})
				}
			},true);
	}
	//加载更多商品列表
	getListData2(){
		let This=this;
		let page=this.state.page2;//第几页
		let count=this.state.count2;//每成功获取一次数据page加1
		this.setState({
				noData2:'loading'
			});
			
		bee.post('/wechat/consume/record',{
				"page":page,
				"size":3
			},function(data){
				if(data.error_code===0){
					let getPost=data.data;
					let tmp=This.state.payData;
						getPost.map(function(item){
							tmp.push(item);
						});
					if(getPost.length){
						
						This.setState({
							payData:tmp,
							noData2:'preLoad'
						});

					}else{
						This.setState({
							noData2:'onData'
						});
					}
					count++;
					This.setState({
						page2:count,
						count2:count
						
					})
				}
			},true);
	}
	render(){
		return(
				<Container scrollable={true}>
					<RechargeOrPayDetail noData2={this.state.noData2} noData1={this.state.noData1} isGetData1={this.isGetData1} isGetData2={this.isGetData2} rechargeData={this.state.rechargeData} payData={this.state.payData}/>
				</Container>
			)
	}
}

export default pureRender(RechargeRecordPage);