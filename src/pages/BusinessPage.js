import React from 'react';
import pureRender from 'pure-render-decorator';
import Header from '../components/Header';
import {Container,View} from 'amazeui-touch';
import Button from '../components/Button';
import Timer from '../components/Timer';
import RegionalLinkage from '../components/RegionalLinkage';
import '../assets/styles/businessPage.less';
class BusinessPage extends React.Component{
	 constructor(props){
		super(props);
		this.state={
			areaDtata:[],
			content:'查询'
		}
		this.clickHeadler=this.clickHeadler.bind(this);
	}
	getValue(key){
		return this.refs[key].getValue();
	}
	getUuid(key){
		return this.refs[key].getUuid();
	}
	clickHeadler(){
		let tmStart=this.getValue('tmStart');
		let tmEnd=this.getValue('tmEnd');
		let userType=this.getValue('userType');
		let userArea=this.getUuid('userArea');
		let userText=this.getValue('userArea');
		let firstUuid=this.state.firstUuid;
		let userTypeEn='';
		if(userType==='经销商'){userTypeEn='agency'}
		if(userType==='企业用户'){userTypeEn='company'}
		if(userType==='全部'){userTypeEn=''}
		userArea?'':userArea='';
		let data={'tmStart':tmStart,'tmEnd':tmEnd,'userType':userType,'userTypeEn':userTypeEn,'userArea':userArea,'userText':userText};
		data=JSON.stringify(data);
		bee.cache('SearchDetail',data)
		this.context.router.push('/QueryResultPage'); // 手动路由
	}
	componentDidMount(){
		let that=this;
		//发请求并更新provinceData:[]状态
		bee.post('/availableAreas', {}, function(data) {
			if(data.code) {
				alert(data.info);
				return;
			}
			data.data?data.data.map(function(i,j){
				let Data=that.state.areaDtata;
				if(j===0){
					Data.push({name:'全部',uuid:''});	
				}
				Data.push(i);
				that.setState({
					areaDtata:Data,
					firstUuid:Data[0].uuid
				})
			}):''
		}, true);
	}

    
	render(){
		let proviceData=[{name:'全部'},{name:'经销商'},{name:'企业用户'}];
		let Wdata=this.state.areaDtata;
		let btnStyle={
			width:'96%',
			height:'2.6rem',
			background:'rgba(0, 128, 0, 1)',
			borderRadius:'0.5rem'
			
		}
		let inputStyle={
			textAlign:'left',
			paddingLeft:'1rem'
		}
		let regionalStyle={
			backgroundColor:'#fff'
		}
		return(
				<View>
					<Container>
						<Header MiddleTextTop='业务量查询' middleTop='true'/>
						<Timer timerTitle='从' ref='tmStart'/>
						<Timer timerTitle='至' ref='tmEnd'/>
						<RegionalLinkage value='全部' data={proviceData} type='warehouse' regionalStyle={regionalStyle} promptText='商户类型'  ref='userType'/>
				    	<RegionalLinkage value='全部' data={Wdata} type='warehouse' regionalStyle={regionalStyle} promptText='区域' ref='userArea'/>
						<Button content={this.state.content} onClick={this.clickHeadler} btnStyle={btnStyle}/>
					</Container>
				</View>
			)
	}
}
// 静态属性
BusinessPage.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(BusinessPage);