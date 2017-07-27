import React from 'react';
import pureRender from 'pure-render-decorator';
import {Container,View} from 'amazeui-touch';
import Button from '../components/Button';
import Timer from '../components/Timer';
import RegionalLinkage from '../components/RegionalLinkage';
import '../assets/styles/searchDetail.less';
class SearchDetail extends React.Component{
	 constructor(props){
		super(props);
		this.state={
			areaDtata:[],
			content:'查询'
		}
		this.clickHeadler=this.clickHeadler.bind(this);
	}
	 //获取组件的value
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
		if(userType==='经销商'){userType='agency'}
		if(userType==='企业用户'){userType='company'}
		if(userType==='全部'){userType=''}
		userArea?'':userArea='';
		let data={'tmStart':tmStart,'tmEnd':tmEnd,'userType':userType,'userArea':userArea,'userText':userText};
		data=JSON.stringify(data);
		bee.cache('SearchDetail',data)
		this.context.router.push('/BonusDetailPage'); // 手动路由
	}
	componentDidMount(){
		
		let that=this;
		//发请求并更新provinceData:[]状态
		bee.post('/availableAreas', {}, function(data) {
			if(data.code) {
				alert(data.info);
				return;
			}
			data.data?data.data.map(function(i){
				let Data=that.state.areaDtata;
				Data.push(i)
				that.setState({
					areaDtata:Data
				})
			}):''
		}, true);
		
	}
	render(){
		let proviceData=[{name:'全部'},{name:'经销商',userType:'agency'},{name:'企业用户',userType:'company'}];
		let areaData=this.state.areaDtata
		let btnStyle={
			width:'96%',
			height:'2.6rem',
			background:'rgba(255, 245, 161, 0.6)',
			borderRadius:'0.5rem'
			
		}
		let regionalStyle={
			backgroundColor:'transparent'
		}
		return(
				<View>
					<Container className='searchWrapper'>
						<Timer ref='tmStart' timerTitle='从'/>
						<Timer ref='tmEnd' timerTitle='至'/>
						<RegionalLinkage data={proviceData} type='warehouse' regionalStyle={regionalStyle} promptText='商户类型' value='全部' name='userType' ref='userType'/>
				    	<RegionalLinkage data={areaData} type='warehouse' regionalStyle={regionalStyle} promptText='区域'  value='全国' name='userArea' ref='userArea'/>
						<Button ref='searchBtn' onClick={this.clickHeadler} content={this.state.content} btnStyle={btnStyle}/>
					</Container>
				</View>
			)
	}
}
// 静态属性
SearchDetail.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(SearchDetail);