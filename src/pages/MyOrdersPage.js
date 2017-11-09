import React from 'react';
import {Container,View,Notification} from 'amazeui-touch';
import OrderHead from '../components/OrderHead';
import OrderContainer from '../components/OrderContainer';
import pureRender from 'pure-render-decorator';
class MyOrdersPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			orders_state:'',
			orders_data:[],
			noData:'preLoad',
			page:2,
			count:2,
			visible : false,
			errorContent:'请耐心等待审核结果'
		}
		this.postParent=this.postParent.bind(this);
		this.isGetData=this.isGetData.bind(this);
		this.getListData=this.getListData.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
		this.postAlert = this.postAlert.bind(this);
	}
	componentDidMount(){
		bee.pushUrl();
		document.title="我的订单";
		let orders_state=bee.cache('orders_states');
		let This=this;
		this.setState({
			orders_state:orders_state
			
		})
		bee.post('/wechat/order/list',{
			'page':'1',
			'size':'3',
			'state':orders_state
		},function(data){
			if (data.error_code===0) {
					This.setState({
					orders_data:data.data
				});
			}
			This.setState({
				noData:'preLoad'
			})
		},true);
	}
	// 打开对话框
    openNotification() {
	    this.setState({
	      visible: true
	    });
    }
	
	// 关闭对话框
	closeNotification() {
	    // 判断是否需要清除定时器
	    if(this.state.timeId){
	    	clearTimeout(this.state.timeId);
	    }
	    
	    this.setState({
	      visible: false,
	      timeId : null
	    });
	    
	}
	//上传凭证点击提示
	postAlert(state){
		if (state==='ing'||state==='yes') {
			this.openNotification();
			//  callback
			var timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId
			});
		}
	}		
	//切换状态
	postParent(state){
		let stateNext=state;
		let This=this;
		bee.post('/wechat/order/list',{
			'page':'1',
			'size':'3',
			'state':state
		},function(data){
			document.querySelector('.scrollWrapper').scrollTop=0;
			if (data.error_code===0) {
				This.setState({
					orders_data:data.data,
					page:2,
					count:2,
					noData:'preLoad',
					orders_state:stateNext
				})
			}
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
		let arrData=[];
		
		
		let page=this.state.page;//第几页
		let count=this.state.count;//每成功获取一次数据page加1
		let orders_state=bee.cache('orders_states');
		this.setState({
				noData:'loading'
			});
			
		bee.post('/wechat/order/list',{
				"page":page,
				"size":3,
				'state':orders_state
			},function(data){
				if(data.error_code===0){
					let getPost=data.data;
					let tmp=This.state.orders_data;
						getPost.map(function(item){
							tmp.push(item);
						});
					if(getPost.length){
						
						This.setState({
							orders_data:tmp,
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
		let lists=[
			{
				state:'',
				text:'全部'
			},
			{
				state:'not_payed',
				text:'待付款'
			},
			{
				state:'not_receive',
				text:'待收货'
			},
			{
				state:'finish',
				text:'已完成'
			},
			{
				state:'cancel',
				text:'未成功'
			}
		];
		return(
				<View className="orderHeadUlContainer">
					<Notification
				          title="荟酒国际提示"
				          amStyle='alert'
				          visible={this.state.visible}
				          animated
				          onDismiss={this.closeNotification}
				        >
				          {this.state.errorContent}
			        </Notification>
					<OrderHead postParent={this.postParent} lists={lists} orders_state={this.state.orders_state}/>
					<Container className='scrollWrapper' scrollable={true}>
						<OrderContainer postAlert={this.postAlert} postParent={this.postParent} noData={this.state.noData} isGetData={this.isGetData} orders_data={this.state.orders_data} loadStyle={{'height':'1.5rem'}}/>
					</Container>
				</View>
			)
	}
}
export default pureRender(MyOrdersPage);