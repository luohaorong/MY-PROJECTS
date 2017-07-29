import React from 'react';
import '../assets/styles/loadMore.less';
import pureRender from 'pure-render-decorator';
let This;
class LoadMore  extends React.Component{
	constructor(props){
		super(props);
		this.state={
			up:true,
			page:2,
			count:2,
			noData:false,
			isNone:{}
		};
	}
	componentDidMount(){
		document.title='商品列表';
		document.addEventListener("touchend", this.touchEndHandle, false);
		This=this;
		This.nodeIsNone();
	}
	nodeIsNone(){
		let loadMore=this.refs['loadMore'];
		let offsetT=loadMore.offsetTop;
		let bodyH=document.body.clientHeight;
		if(offsetT<bodyH){
			This.setState({
				isNone:{
					display:'none'
				}
			})
		}else{
			This.setState({
				isNone:{
					display:'block'
				}
			})
		}
	}
	touchEndHandle(e){
		let lastNode=e.currentTarget.querySelector('.hotImgLast');
		let bool = lastNode&&lastNode.hasChildNodes();//判断是否到底部
		let up=This.state.up;//
		let page=This.state.page;
		let reGete=This.props.reGete;
		let resetState=This.props.resetState;
		let count=This.state.count;
		This.nodeIsNone();
		if(reGete){
			This.setState({
				up:true,
				page:count
			});
		}
		if(bool&&up){
			bee.post(This.props.loadUrl,{
				page:page,
				size:16,
				uuid:This.props.loadUuid||''
			},function(data){
				if(data.error_code===0){
					let getPost=data.data;
					if(getPost.length){
						This.props.reGetData(getPost);
					}else{
						This.props.reGetData('');
						This.setState({
							up:false,
							noData:true
						})
					}
					count++;
					This.setState({
						up:false,
						page:count,
						count:count
					})
				}
			},true);
		}
	}
	componentWillUnmount(){
		document.removeEventListener("touchend",this.touchEndHandle,false)
	}
	render(){
		This=this;
		return(
	    	<div id='loadMore' ref='loadMore' className='loadMore' style={this.props.loadStyle}>
		    		<div className='loadMoreText' style={this.state.isNone}>
			    		<span>{this.state.noData?'没有更多了...':'上滑加载更多...'}</span>
		    		</div>
	    	</div>
		)
	}
}
export default pureRender(LoadMore);
