import React from 'react';
import '../assets/styles/filterBottom.less';
import {Group,Grid,Col,Container} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class FilterBottom extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isBloon:true,
			check:true
		}
		this.reset=this.reset.bind(this);
		this.choose=this.choose.bind(this);
	}
	//点击重置按钮
	reset(e){
		let postP=false;
		this.props.postParent(postP);//将一个bool值传回父组件（ClassTabs）
		this.state.isBloon?this.setState({
			isBloon:false
		}):this.setState({
			isBloon:true
		})
		let getC=this.state.isBloon;
		this.props.getChildren(getC);//将一个bool值传回父组件（ClassTabs）
		
	}
	choose(){
		this.context.router.push('/ProductListPage'); // 手动路由
	}
	render(){
		return(
              <div className={this.props.isShow?'tabsRightBottom isBlock':'tabsRightBottom'}>
              			<div className='tabsBottomLeft' onClick={this.reset}>重置</div>
              			<div className='tabsBottomRight' onClick={this.choose}>筛选</div>
              </div>
			)
	}
}
// 静态属性
FilterBottom.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(FilterBottom);