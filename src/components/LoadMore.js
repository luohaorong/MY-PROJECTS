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
	//当父组件的Reset为TRUE时重置状态
	componentWillReceiveProps(nextprops){
		if(nextprops.Reset){
			this.setState({
				up:true,
				page:2,
				count:2,
				noData:false
			});
		}
	}
	//是否显示加载更多
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
		let up=This.state.up;//控制是否加载数据
		let page=This.state.page;//第几页
		let reGete=This.props.reGete;//父组件拿到数据后reGete为true
		let count=This.state.count;//每成功获取一次数据page加1
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
				size:10,
				category:This.props.loadUuid||''
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
		let content=(
			<div className='loadMoreText'>
		    		{
		    				
    					this.props.noData?(
    						<div className='noData'>
								<img src='../assets/images/noData.png'/>
								<p>
									已经在路上了...
								</p>
    						</div>
    					):<span  style={this.state.isNone}>{this.state.noData?'没有更多了...':'上滑加载更多...'}</span>
		    				
		    			
		    		}
		    </div>
		)
		return(
	    	<div id='loadMore' ref='loadMore' className='loadMore' style={this.props.loadStyle}>
		    		{content}
	    	</div>
		)
	}
}
export default pureRender(LoadMore);
