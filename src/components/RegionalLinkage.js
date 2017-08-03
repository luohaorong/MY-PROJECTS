import React from 'react';
import RegisterInput from '../components/RegisterInput';
import '../assets/styles/regionalLinkage.less';
import addressJson from './addressJson';
import pureRender from 'pure-render-decorator';
class RegionalLinkage extends React.Component {
	constructor(props){
		super(props);
		this.state={
			cityData:[],
			areaData:[],
			addressData:[],
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
	componentDidMount(){
		this.setState({
			addressData:addressJson
		})
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
		this.props.type==='warehouse'&&this.props.getStationUuid(dataKey);
		//获得dataKey以后发送给后台，拿到新的城市信息并更新,cityData:[]状态将areaData:[]清空
		let province=targ.innerHTML;
		this.refs['mainRegion'].state.value=province;
		this.refs['mainRegion'].state.redBorder={borderBottom:'1px solid #ea0000'};
		this.refs['mainRegion'].state.pass='no';
		let cityData=[]
		this.state.addressData&&this.state.addressData.map(function(i){
			if(i.uuid===dataKey){
				i.city.map(function(j){
					cityData.push(j)
				},this)
			}
		},this);
		this.setState({
			cityData:cityData,
			countryData:[]
		})
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
		let countryData=[];
		this.state.cityData&&this.state.cityData.map(function(k){
			if(k.uuid===dataKey){
				k.county.map(function(p){
					countryData.push(p)
				},this);
			}
		},this);
		this.setState({
			countryData:countryData
		})
		
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
		this.props.getCountyUuid(dataKey);
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
		let provinceData;
		if(this.props.type==='warehouse'||this.props.type==='time'){
			provinceData=this.props.data;
		}else{
			provinceData=this.state.addressData;
		}
		return(
			<div className='regional' style={this.props.regionalStyle}>
				<RegisterInput regional={true} readOnly={this.props.readOnly} inputStyle={this.props.inputStyle} onClick={this.clickHeadler} promptText={this.props.promptText} name={this.props.name} vText={this.props.vText} ref='mainRegion'/>
				<div className='regionalLayerWap' style={this.state.layerWapStyle}>
					<div className='regionalLayer' style={this.state.regionalLayerStyle}>
						{
							provinceData&&provinceData.map(function (item,index) {
								return 	<p style={This.state.listItemStyle} onClick={This.provinceClick} ref='list' key={index} data-Key={item.uuid} className='listItem'>{item.name}</p>;
								})
						}
					</div>
					<div className='regionalLayer' style={this.state.cityStyle}>
						{
							this.state.cityData&&this.state.cityData.map(function (item,index) {
								return 	<p onClick={This.cityClick} ref='listCity' key={index} data-Key={item.uuid} className='listItem'>{item.name}</p>;
								})
						}
					</div>
					<div className='regionalLayer' style={this.state.areaStyle}>
						{
							this.state.countryData&&this.state.countryData.map(function (item,index) {
								return 	<p onClick={This.areaClick} ref='listArea' key={index} data-Key={item.uuid} className='listItem'>{item.name}</p>;
								})
						}
					</div>
				</div>
			</div>
		)
	}
}
export default pureRender(RegionalLinkage);