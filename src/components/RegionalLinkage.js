import React from 'react';
import RegisterInput from '../components/RegisterInput';
//import Axios from 'axios';
import '../assets/styles/regionalLinkage.less';
import pureRender from 'pure-render-decorator';
class RegionalLinkage extends React.Component {
	constructor(props){
		super(props);
		this.state={
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
	}
	clickHeadler(){
		if(this.props.type==='warehouse'||this.props.type==='time'){
			 this.setState({
			 	layerWapStyle:{
					display:'block'
				},
				regionalLayerStyle:{
					width:'100%',
					margin:'0 auto',
					backgroundColor:'#ffffff'
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
//		let dataKey=targ.getAttribute('data-Key');
		let dataUuid=targ.getAttribute('data-uuid');
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
				pass:'yes',
				uuid:dataUuid
			})
			this.refs['mainRegion'].state.redBorder={borderBottom:'1px solid #999999'};
			this.refs['mainRegion'].state.pass='yes';
		}
		this.changeBgColor(targ)
	}
	//被选中后变换背景颜色
	changeBgColor(elment){
		elment.style.backgroundColor='rgba(255, 245, 161, 0.6)';
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
		return this.refs['mainRegion'].getValue();
	}
	getUuid(){
		return this.state.uuid
	}
	render(){
		let This=this;
		let provinceData=this.props.data;
		return(
			<div className='regional' style={this.props.regionalStyle}>
				<RegisterInput value={this.props.value} regional={true} inputStyle={this.props.inputStyle} onClick={this.clickHeadler} promptText={this.props.promptText} name={this.props.name} vText={this.props.vText} ref='mainRegion'/>
				<div className='regionalLayerWap' style={this.state.layerWapStyle}>
					<ul className='regionalLayer' style={this.state.regionalLayerStyle}>
						{
							provinceData.map(function (item,index) {
								return 	<li style={This.state.listItemStyle}  onClick={This.provinceClick} ref='list' key={index} data-Key={index} data-userType={item.userType} className='listItem' data-uuid={item.uuid}>{item.name}</li>;
								})
						}
					</ul>
				</div>
			</div>
		)
	}
}
export default pureRender(RegionalLinkage);