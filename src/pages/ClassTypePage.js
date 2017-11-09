import React from 'react';
import {Container,View,Tabs,Card,Button,Notification} from 'amazeui-touch';
import SearchBar from '../components/SearchBar';
import ClassTabs from '../components/ClassTabs';
import Bottom from '../components/Bottom';
import pureRender from 'pure-render-decorator';
class ClassTypePage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			albums:[],
			products:[],
			cartsnum:0
		}
		this.closeNotification = this.closeNotification.bind(this);
		this.thumbClick = this.thumbClick.bind(this);
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
	    })
	}
	thumbClick(data){
		let This = this;
		bee.post('/wechat/goods/attr',{
			uuid:data
		},function(data){
			This.setState({
				products:data.data
			})
		},true)
	}
	componentDidMount(){
		bee.pushUrl();
		document.title='分类筛选';
		let This=this;
		let uuid;
		bee.post('/wechat/goods/categories',{},function(data) {
			if(data.error_code) {
				let Error=data.msg;
				// 如果失败，提示！！
				This.openNotification();
				//  callback
				var timeId = setTimeout(This.closeNotification,3000);
				This.setState({
					timeId : timeId,
					promptError:Error
				});
				return;
			}else{
				This.setState({
					albums:data.data
				});
				bee.post('/wechat/goods/attr',{
					uuid : data.data[0].uuid
				},function(dataContent){
					if(dataContent.error_code){
						let Error=dataContent.msg;
						// 如果失败，提示！！
						This.openNotification();
						//  callback
						var timeId = setTimeout(This.closeNotification,3000);
						This.setState({
							timeId : timeId,
							promptError:Error
						});
						return;
					}else{
						bee.cache('typeProduct',dataContent.data);
						This.setState({
							products:dataContent.data
						})
					}
				},true)
			}
		},true);
		let token=localStorage.getItem('token');
		if (token) {
		    bee.post('/wechat/carts/count',{},function(data){
		      if (data.error_code==0) {
		      		This.setState({
		      			cartsnum:+data.data.count
		      		})
		      }
		    },true);
		};
	}
	render(){
		let {albums,products} = this.state;
		return(
      		<View>
				<Notification
				      title="荟酒国际提示"
			          amStyle='alert'
			          visible={this.state.visible}
			          animated
			          onDismiss={this.closeNotification}
			        >
				         {this.state.promptError}
			        </Notification>
					<SearchBar/>
					<ClassTabs thumbClick = {this.thumbClick} album={albums} products = {products}/>
          			<Bottom cartsnum={this.state.cartsnum}/>
     	 	</View>
			)
	}
}
ClassTypePage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(ClassTypePage);