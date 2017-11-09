import React from 'react';
import '../assets/styles/loadMore.less';
import pureRender from 'pure-render-decorator';
let This,_hStart,start,end;
class LoadMore  extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isNone:{},
			loadText:'上滑加载更多...'
		};
	}
	componentDidMount(){
		document.addEventListener("touchend", this.touchEndHandle, false);
		document.addEventListener("touchstart", this.touchStartHandle, false);
		This=this;
		This.nodeIsNone();
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
	touchStartHandle(evt) {
			clearTimeout(_hStart);
			_hStart = setTimeout(function() {
			//获取开始的坐标
				start = evt.touches[0].pageY;
			}, 0);
		}
	touchEndHandle(evt){
		let scrollWrapper=document.querySelector('.scrollWrapper');//获取滚动元素
		let docEle= document.documentElement;//获取html
		let scrollLen=scrollWrapper.scrollTop;//滚动高度
		let wrapperH=scrollWrapper.scrollHeight;//滚动元素的高度
		let winH = docEle.clientHeight;//内容可视区域的高度
		end = evt.changedTouches[0].pageY;//获取结束时的坐标
		This.nodeIsNone();
		//start-end>60用于控制灵敏度
		if(start-end>60){
			wrapperH<=scrollLen+winH+1&&This.isPost();
		}
	}
	isPost(){
		This.props.isGetData(true)
	}
	componentWillUnmount(){
		document.removeEventListener("touchend",this.touchEndHandle,false);
		document.removeEventListener("touchstart",this.touchStartHandle,false);
	}
	componentWillReceiveProps(nextProps){
		switch(nextProps.noData)
		{
			case 'preLoad':
			this.setState({
				loadText:'上滑加载更多...'
			});
			break;
			case 'loading':
			this.setState({
				loadText:'正在加载数据...'
			});
			break;
			case 'onData':
			this.setState({
				loadText:'没有更多了...'
			});
			break;
			default:'';
		}
	}
	render(){
		This=this;
		let content=(
			<div className='loadMoreText'>
		    		{
		    				
    					this.props.noListData?(
    						<div className='noData'>
								<img src='../assets/images/noData.png'/>
								<p>
									已经在路上了...
								</p>
    						</div>
    					):<span  style={this.state.isNone}>
    					{this.state.loadText}
    					</span>
		    				
		    			
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
