import React from 'react';
import {Container} from 'amazeui-touch';
import exclusiveInput from '../assets/styles/exclusiveInput.less';
import pureRender from 'pure-render-decorator';
class ExclusiveInput extends React.Component{
	constructor(props){
		super(props);
		this.state={
			excluName:'',
			excluUuid:'',
			layerStyle:{
				display:'none'
			}
		}
		this.checkClick=this.checkClick.bind(this);
		this.siblings=this.siblings.bind(this);
		this.showClick=this.showClick.bind(this);
	}
	
	//点击弹出下拉框
	showClick(){
		this.setState({
			layerStyle:{
				display:'block'
			}
		})
	}
	componentWillReceiveProps(nextprops){
			if (nextprops.first!==this.props.first) {
				this.setState({
					excluName:nextprops.first
				})
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
	//点击下拉选择
	checkClick(e){
		let active = e.currentTarget;
		let name = active.getAttribute('data-name');
		let uuid = active.getAttribute('data-uuid');
		active.style.backgroundColor='#ccc';
		this.props.changeClick(uuid);
		let siblings=this.siblings(active);
		for(var i =0;i<siblings.length;i++){
			siblings[i].style.backgroundColor='#fff'
		}
		this.setState({
			excluName:name,
			excluUuid:uuid,
			layerStyle:{
				display:'none'
			}
		})
	}

	render(){
		let exclusiveData = this.props.exclusiveData;
		return(
			<Container className="exclusiveContainer">
				<div className="exclusiveShowContainer">
					<div className="exclusiveShowLeft">{this.props.title}</div>
					<div ref='excluValue' onClick={this.showClick} className="exclusiveShowRight" data-uuid={this.state.excluUuid}>{this.state.excluName}</div>
				</div>
				<ul className="exclusiveHideContainer" style={this.state.layerStyle}>
					{
						exclusiveData.length>0&&exclusiveData.map(function(item,i){
							return(
								<li key={i} onClick={this.checkClick} className="active" data-uuid={item.uuid} data-name={item.name}>{item.name}</li>
							)	
						},this)
					}
				</ul>
			</Container>
			)
	}
}
export default pureRender(ExclusiveInput)