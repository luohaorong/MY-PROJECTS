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
class AddDeliveryPage extends React.Component{
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
		this.getEditAreaUuid = this.getEditAreaUuid.bind(this);
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
	getEditAreaUuid(uuid){
		this.setState({
			countyUuid:uuid
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
		bee.pushUrl();
		if(bee.getQueryString('edit')=='true'){
			document.title = '编辑收货地址';
			let addressEdit=JSON.parse(bee.cache('addressEdit'));
			this.refs.realName.refs.inp.value=addressEdit.real_name;
			this.refs.realName.state.value = addressEdit.real_name;
			
			this.refs.phone.refs.inp.value=addressEdit.mobile;
			this.refs.phone.state.value = addressEdit.mobile;
			
			this.refs.dtailAddr.refs.inp.value=addressEdit.detail;
			this.refs.dtailAddr.state.value=addressEdit.detail;
		}else{
			document.title = '新增收货地址';
		}
	}
	//点击提交
	clickHandler(){
		let realName = this.refs.realName.refs.inp.value;
		let mobile = this.refs.phone.refs.inp.value;
		let dtailAddr = this.refs.dtailAddr.refs.inp.value;
		let mainRegion = this.state.countyUuid
		let addressEdit=bee.cache('addressEdit')&&JSON.parse(bee.cache('addressEdit'));
		let uuid = bee.cache('addressEdit')&&addressEdit.uuid;
		let This = this;
		if (realName!==''&&mobile!==''&&dtailAddr!==''&&mainRegion!=='') {
				if (bee.getQueryString('edit')=='true') {
					if (bee.getQueryString('origin')==='ConfirmOrderPage') {
						bee.post('/wechat/edit/address',{
						"real_name":realName,                 //收货人姓名
						"mobile":mobile,                 //收货人手机号
						"areas_uuid":mainRegion,            //地址uuid
						"detail":dtailAddr,               //详细地址
						"uuid":uuid
						},function(data){
							if (data.error_code==0) {
								This.context.router.push('/AddressAdminPage?origin=ConfirmOrderPage')
							}else{
								This.openNotification();
								//  callback
								var timeId = setTimeout(This.closeNotification,3000);
								This.setState({
									errorContent:{Error:data.msg},
									visible:true
								})
							}
						},true);
					}else{
						bee.post('/wechat/edit/address',{
						"real_name":realName,                 //收货人姓名
						"mobile":mobile,                 //收货人手机号
						"areas_uuid":mainRegion,            //地址uuid
						"detail":dtailAddr,               //详细地址
						"uuid":uuid
						},function(data){
							if (data.error_code==0) {
								This.context.router.push('/AddressAdminPage')
							}else{
								This.openNotification();
								//  callback
								var timeId = setTimeout(This.closeNotification,3000);
								This.setState({
									errorContent:{Error:data.msg},
									visible:true
								})
							}
						},true);
					}
			}else{
				bee.post('/wechat/add/address',{
					"real_name":realName,                 //收货人姓名
					"mobile":mobile,                 //收货人手机号
					"areas_uuid":mainRegion,            //地址uuid
					"detail":dtailAddr                 //详细地址
				},function(data){
					if (data.error_code==0) {
						This.context.router.push(bee.getQueryString('origin')==='ConfirmOrderPage'?'/AddressAdminPage?origin=ConfirmOrderPage':'/AddressAdminPage')
					}else{
						This.setState({
							errorContent:{Error:data.msg},
							visible:true
						})
					}
				},true);
			}
		}else{
			This.openNotification();
			//  callback
			var timeId = setTimeout(This.closeNotification,3000);
			This.setState({
				errorContent:{Error:'请完善所有信息！'},
				visible:true
			})
		}
		
		
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
		let addressEdit_realname=this.state.addressEdit_realname;
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
							<RegisterInput promptText='联系人' name='' vText='请输入您的姓名' ref='realName'/>
						</div>
						<div className='registerInputWrap'>
							<RegisterInput promptText='联系方式' name='' vText='请输入您的联系方式' ref='phone'/>
						</div>
						<div className='registerInputWrap'>
							<RegionalLinkage getEditAreaUuid={this.getEditAreaUuid} type='regional' getCountyUuid={this.getCountyUuid} promptText='选择地区' name='mainRegion' readOnly='readonly' vText='请选择   >' ref='mainRegion'/>
						</div>
						<div className='registerInputWrap'>
							<RegisterInput promptText='详细地址' name='' vText='请输入您的详细地址' ref='dtailAddr'/>
						</div>
						<Button btnStyle={submitBtn} content='保存并使用' onClick={this.clickHandler}/>
					</Container>
				</Container>
			</View>
		)
	}
}
// 静态属性
AddDeliveryPage.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(AddDeliveryPage);

