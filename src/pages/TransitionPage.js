import React from 'react';
import pureRender from 'pure-render-decorator';
import {Container} from 'amazeui-touch';
import '../assets/styles/transitionPage.less';
let timer;
class TransitionPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			time:6
		}
	}
	componentDidMount(){
		let This=this;
		let time=this.state.time;
		timer=setInterval(function(){
			This.setState({
				time:time--
			})
			if(time===0){
				window.location.href=bee.cache('redirectUri')
			}
		},1000)
	}
	componentWillUnmount(){
		clearInterval(timer);
	}
	render(){
		return (
			<Container>
				<img className='transitionImg' src='/assets/images/transition.png'/>
				<a href='http://app.qq.com/#id=detail&appid=1106222451' className='transitionText androidText'>Android 安卓应用市场下载</a>
				<a href='https://itunes.apple.com/app/id1258403931' className='transitionText iosText'>iOS  苹果App Store下载</a>
				<p className='goToIndex'><span style={{color:'#ff0000'}}>{this.state.time}</span>后跳到首页</p>
			</Container>
		)
	}
}
TransitionPage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(TransitionPage)