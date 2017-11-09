import React from 'react';
import '../assets/styles/classTabs.less';
import {Group,Grid,Col,Container} from 'amazeui-touch';
import Filter from './Filter';
import FilterBottom from './FilterBottom';
import pureRender from 'pure-render-decorator';

class ClassTabs extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isShow:false,
			name:'葡萄酒'
		}

		this.handleClick = this.handleClick.bind(this);
		this.checkFilter = this.checkFilter.bind(this);
		this.postParent = this.postParent.bind(this);
		this.getChildren = this.getChildren.bind(this);
		this.getActive=this.getActive.bind(this);
	}
	checkFilter(e){
		console.log(111);
	}
	//拿到FilterBottom传回的值
	getChildren(getC){
		this.setState({
			isReset:getC
		})
		
	}
	//拿到Filter组件传过来的值，并且设置isShow状态,将用来传给FilterBottom组件。
	postParent(postP){
		this.setState({
			isShow:postP
		})

	}
	//拿到Filter组件传过来的值，并且设置isActive状态，用来返回给Filter.
	getActive(active){
		this.setState({
			isActive:active
		})
	}
	//查找所有的兄弟节点
	 siblings(elm) {
			var arr = [];
			var p = elm.parentNode.children;
			for(var i =0,pl= p.length;i<pl;i++) {
			if(p[i] !== elm) arr.push(p[i]);
			}
			return arr;
		}
	handleClick(e) {

    	let active=e.currentTarget;//绑定事件的元素   而target是触发事件的元素
		//图片url
		let thum=active.getAttribute('data-thumb');
		let uuid=active.getAttribute('data-uuid');
		let name=active.getAttribute('data-name');
		this.props.thumbClick(uuid);
		this.setState({
			url:thum,
			name:name
		})
		active.style.background='#fff';
		active.style.color='#9e1b1b';
		this.siblings(active).map(function(item,i){
			item.style.background='#efeff4';
			item.style.color='#333';	
			
		})
	}

	render(){
		let alb=this.props.album&&this.props.album;
		let products = this.props.products;
		const classTabs=(
          alb?alb.map(function(item,i){
            return(
                <div key={i} data-name = {item.name} data-thumb={item.thumb} data-uuid={item.uuid} className='TabsLeftList' onClick={this.handleClick} >{item.name}</div>
              )
          },this):""
      );
		return(
			<Container  className='TabsContainer'>
                 <Container direction='column' className='TabsContainerLeft'>
                      {classTabs}
                 </Container>    
	             <Container direction='column' className='TabsContainerRightBig'>
	              		<Filter name={this.state.name} products = {products} data={alb} url={this.state.url} filterData={this.filterData} isReset={this.state.isReset} isActive={this.state.isActive} getActive={this.getActive} postParent={this.postParent}/>
	             </Container>
          	</Container>
			)
	}
}

export default pureRender(ClassTabs);