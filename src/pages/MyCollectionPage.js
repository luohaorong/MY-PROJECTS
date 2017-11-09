import React from 'react';
import {View,Container} from 'amazeui-touch';
import MyCollectionHead from '../components/MyCollectionHead';
import MyCollectionContainer from '../components/MyCollectionContainer';
import pureRender from 'pure-render-decorator';
class MyCollectionPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			editState:false,
			collectionData:[],
			noData:'preLoad',
			page:2,
			count:2
		}
		this.postEidtState=this.postEidtState.bind(this);
		this.isGetData=this.isGetData.bind(this);
		this.getListData=this.getListData.bind(this);
		this.postDelete=this.postDelete.bind(this);
	}
	componentDidMount(){
		document.title='我的收藏';
		bee.pushUrl();
		let This = this;
		bee.post('/wechat/list/favorites',{
			'page':1,
			'size':7
		},function(data){
				if (data.error_code==0) {
					This.setState({
						collectionData:data.data
					})
				}
				This.setState({
				noData:'preLoad'
				})
			},true)
	}
	postEidtState(postEidtState){
		postEidtState==true?this.setState({
			editState:true
		}):this.setState({
			editState:false
		})
	}
	isGetData(data){
		if(data){
			this.getListData()
		};
	}
		//加载更多商品列表
	getListData(){
		let This=this;
		let arrData=[];
		
		
		let page=this.state.page;//第几页
		let count=this.state.count;//每成功获取一次数据page加1
		this.setState({
				noData:'loading'
			});
			
		bee.post('/wechat/list/favorites',{
				"page":page,
				"size":3
			},function(data){
				if(data.error_code===0){
					let getPost=data.data;
					let tmp=This.state.collectionData;
						getPost.map(function(item){
							tmp.push(item);
						});
					if(getPost.length){
						
						This.setState({
							collectionData:tmp,
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
	postDelete(bool){
		let This = this;
		if (bool==true) {
			bee.post('/wechat/del/collection',{
				'goods_uuid':bee.cache('deleteUuid')
			},function(data){
				if (data.error_code==0) {
					This.setState({
						collectionData:data.data,
						editState:false
					})
					bee.cache('deleteUuid',[]);
				}
			},true);
		}
	}
	render(){
		return(
			<View>
				<MyCollectionHead postEidtState={this.postEidtState} postDelete={this.postDelete}/>
				<Container className='scrollWrapper' scrollable={true}>
					<MyCollectionContainer empty="您还没有收藏任何商品" noData={this.state.noData} editState={this.state.editState} collectionData={this.state.collectionData} isGetData={this.isGetData} loadStyle={{'height':'1.5rem'}}/>
				</Container>
			</View>

			)
	}
}
export default pureRender(MyCollectionPage);