import React from 'react';
import RegisterInput from '../components/RegisterInput';
//import Axios from 'axios';
import '../assets/styles/regionalLinkage.less';
import pureRender from 'pure-render-decorator';
class RegionalLinkage extends React.Component {
	constructor(props){
		super(props);
		this.state={
			provinceData:this.props.data,
			
			cityData:[],
			areaData:[],
			proProvinceData:'',
			proCityData:'',
			proAreaData:'',
			layerWapStyle:{
				display:'none'
			},
			cityStyle:{
				display:'none'
			},
			areaStyle:{
				display:'none'
			},
			pass:'no',
			regionalLayerStyle:{},
			listItemStyle:{}
		};
		this.clickHeadler=this.clickHeadler.bind(this);
		this.provinceClick=this.provinceClick.bind(this);
		this.cityClick=this.cityClick.bind(this);
		this.areaClick=this.areaClick.bind(this);
	}
	componentWillMount(){
		//发请求并更新provinceData:[]状态
//		Axios.get('/regional')
//		.then(function(response){
//			this.setState:{
//				provinceData:response
//			}
//		})
//		.catch(function(error){
//		})
		
			
	}
	clickHeadler(){
		if(this.props.type==='warehouse'||this.props.type==='time'){
			 this.setState({
			 	layerWapStyle:{
					display:'block'
				},
				regionalLayerStyle:{
					width:'90%',
					margin:'0 auto'
				},
				listItemStyle:{
					margin:'0 auto'
				}
			 })
		}else{
			this.setState({
			 	layerWapStyle:{
					display:'block'
				}
			 })
		}
	}
	//点击省
	provinceClick(event){
		let targ=event.target;
		let dataKey=targ.getAttribute('data-Key');
		//获得dataKey以后发送给后台，拿到新的城市信息并更新,cityData:[]状态将areaData:[]清空
		
		
		
		let province=targ.innerHTML;
		this.refs['mainRegion'].state.value=province;
		this.refs['mainRegion'].state.redBorder={borderBottom:'1px solid #ea0000'};
		this.refs['mainRegion'].state.pass='no';
		if(this.props.type==='regional'){
			this.setState({
				cityStyle:{
					display:'block'
				},
				proProvinceData:province
			})
		}
		if(this.props.type==='warehouse'||this.props.type==='time'){
			this.setState({
				layerWapStyle:{
					display:'none'
				},
				pass:'yes'
			})
			this.refs['mainRegion'].state.redBorder={borderBottom:'1px solid #999999'};
			this.refs['mainRegion'].state.pass='yes';
		}
		this.changeBgColor(targ)
	}
	//点击城市
	cityClick(event){
		let targ=event.target;
		let dataKey=targ.getAttribute('data-Key');
		//发送dataKey给服务器后去新的区县并更新areaData:[]状态
		
		
		
		let city=targ.innerHTML;
		this.setState({
			areaStyle:{
				display:'block'
			},
			proCityData:city
		})
		this.refs['mainRegion'].state.value=this.state.proProvinceData+city;
		this.refs['mainRegion'].state.redBorder={borderBottom:'1px solid #ea0000'};
		this.refs['mainRegion'].state.pass='no';
		this.changeBgColor(targ)
	}
	//点击区县
	areaClick(event){
		let targ=event.target;
		let dataKey=targ.getAttribute('data-Key');
		let areaData=targ.innerHTML;
		this.setState({
			layerWapStyle:{
				display:'none'
			},
			pass:'yes'
		})
		this.refs['mainRegion'].state.value=this.state.proProvinceData+this.state.proCityData+areaData;
		this.refs['mainRegion'].state.redBorder={borderBottom:'1px solid #999999'};
		this.refs['mainRegion'].state.pass='yes';
		this.changeBgColor(targ)
	}
	//被选中后变换背景颜色
	changeBgColor(elment){
		elment.style.backgroundColor='#cccccc';
		let siblingds=this.siblings(elment);
		for(var i=0;i<siblingds.length;i++){
			siblingds[i].style.backgroundColor='#ffffff'
		}
	}
	//查找兄弟节点
	siblings(elm) {
		var a = [];
		var p = elm.parentNode.children;
		for(var i =0,pl= p.length;i<pl;i++) {
		if(p[i] !== elm) a.push(p[i]);
		}
		return a;
	}
	//获取值
	getValue(){
		if(this.state.pass==='yes'){
			return this.refs['mainRegion'].getValue()
		}
	}
	render(){
		let This=this;
		let provinceData=this.state.provinceData;
		return(
			<div className='regional' style={this.props.regionalStyle}>
				<RegisterInput regional={true} inputStyle={this.props.inputStyle} onClick={this.clickHeadler} promptText={this.props.promptText} name={this.props.name} vText={this.props.vText} ref='mainRegion'/>
				<div className='regionalLayerWap' style={this.state.layerWapStyle}>
					<ul className='regionalLayer' style={this.state.regionalLayerStyle}>
						{
							provinceData.map(function (item,index) {
								return 	<li style={This.state.listItemStyle} onClick={This.provinceClick} ref='list' key={index} data-Key={index} className='listItem'>{item.name}</li>;
								})
						}
					</ul>
					<ul className='regionalLayer' style={this.state.cityStyle}>
						{
							provinceData.map(function (item,index) {
								return 	<li onClick={This.cityClick} ref='listCity' key={index} data-Key={index} className='listItem'>{item.name}</li>;
								})
						}
					</ul>
					<ul className='regionalLayer' style={this.state.areaStyle}>
						{
							provinceData.map(function (item,index) {
								return 	<li onClick={This.areaClick} ref='listArea' key={index} data-Key={index} className='listItem'>{item.name}</li>;
								})
						}
					</ul>
				</div>
			</div>
		)
	}
}
export default pureRender(RegionalLinkage);