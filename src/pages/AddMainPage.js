import React from 'react';
import Button from '../components/Button';
import FileInput from '../components/FileInput';
import RegisterInput from '../components/RegisterInput';
import RegionalLinkage from '../components/RegionalLinkage';
import {
	Container,
	View,
	Notification
} from 'amazeui-touch';
import Axios from 'axios';
import pureRender from 'pure-render-decorator';
class AddMainPage extends React.Component{
	constructor(props){
		//调用super
		super(props);
		// 初始化状态
		this.state = {
			visible : false,
			errorContent:{}
		}
		//初始化逻辑
		this.clickHandler=this.clickHandler.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
		this.getCountyUuid=this.getCountyUuid.bind(this);
	}
	//获取FileInput组件的图片内容
	getValue(key){
		return this.refs[key].getValue();
	}
	getCountyUuid(dataKey){
		this.setState({
			countyUuid:dataKey
		})
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
	//提交数据
	
	componentDidMount(){
		document.title = '添加主营地区';
		bee.pushUrl();
		
	}
	//点击提交
	clickHandler(){
		//获取输入框的内容
		let mainRegion = this.state.countyUuid;
		let dtailAddr = this.refs.dtailAddr.state.value;
		let origin = bee.getQueryString('origin');
		let This = this;
		bee.post('/wechat/add/area',{
			'uuid':mainRegion,
			'detail':dtailAddr
		},function(data){
			if (data.error_code==0) {
				if (origin=='ConfirmOrderPage') {
					This.context.router.push('/AddressAdminPage?origin=ConfirmOrderPage')
				}else{
					This.context.router.push('/AddressAdminPage')
				}
			}
		},true);
		
	}
	componentWillUnmount(){
		this.setState({
			visible : null,
			errorContent:null,
			dataAttr:null
		})
	}
	render(){
		let middleSub=true;
		let middleTop=true;
		let submitBtn={
			width:'100%',
			height:'3rem',
			borderRadius:0,
			marginTop:0
		}
		let isNecessary=false;
		return (
			<View className='viewWapper'>
				 <Notification
				          title="荟酒国际提示"
				          amStyle='alert'
				          visible={this.state.visible}
				          animated
				          onDismiss={this.closeNotification}
				        >
				          {this.state.errorContent.Error}
			        </Notification>
				<Container scrollable={true}>
					<Container className='companyInput'>
						<div className='registerInputWrap'>
							<RegionalLinkage type='regional' getCountyUuid={this.getCountyUuid} promptText='选择地区' name='mainRegion' readOnly='readonly' vText='请选择   >' ref='mainRegion'/>
						</div>
						<div className='registerInputWrap'>
							<RegisterInput promptText='详细地址' name='' vText='请输入街道门牌号等详细信息' ref='dtailAddr'/>
						</div>
						<Button btnStyle={submitBtn} content='提交' onClick={this.clickHandler}/>
					</Container>
				</Container>
			</View>
		)
	}
}
// 静态属性
AddMainPage.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(AddMainPage);
