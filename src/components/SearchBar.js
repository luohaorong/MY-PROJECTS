import React from 'react';
import '../assets/styles/searchBar.less';
import {Container} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.clickHandle=this.clickHandle.bind(this);
		this.keyup=this.keyup.bind(this);
		this.stripscript=this.stripscript.bind(this);
	}
	clickHandle(e){
		let val=this.refs['filter'].value;
		this.props.postKeyWords&&this.props.postKeyWords(val);
		val!==''&&bee.cache('keywords',val);
		val!==''&&this.context.router.push('/SearchResultPage');
	}
	keyup(e){
		let active = e.currentTarget;
		active.value=this.stripscript(active.value);
	}
	stripscript(s) 
	{ 
		let pattern = new RegExp("[`~!@#$^&*()=|{}':;'\\[\\]<>/~！@#￥……&*（）——|{}【】‘；：”“'、]") 
		let rs = ""; 
		for (var i = 0; i < s.length; i++) { 
			rs = rs+s.substr(i, 1).replace(pattern, ''); 
		} 
		return rs; 
	} 
	render(){
		return(
			<div className='SearchBarContainer'>
				<div className='SearchBarContent'>
					<div className='SearchBarContentLeft' onClick={this.clickHandle}></div>
					<input ref='filter' onKeyUp={this.keyup} placeholder={this.props.place} className='SearchBarContentRight' type='text'/>
				</div>
				
			</div>
			
			)
	}
}
SearchBar.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(SearchBar);