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
		let share_code=bee.cache('share_code');
		timer=setInterval(function(){
			This.setState({
				time:time--
			})
			if(time === -1){
				//判断是否从分享页面过来
				if(!share_code && bee.cache('redirectUri').indexOf('/GuidePage') === -1){
					window.location.href = bee.cache('redirectUri');
				}else{
					This.context.router.push('/index/HomePage'); // 手动路由
				}
				clearInterval(timer);
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
				<a href={bee.link.downLoadApp} className='transitionText androidText'>Android 安卓应用市场下载</a>
				<a href={bee.link.downLoadApp} className='transitionText iosText'>iOS  苹果App Store下载</a>
				<p className='goToIndex'><span style={{color:'#ff0000'}}>{this.state.time}</span>后跳往商城</p>
			</Container>
		)
	}
}
TransitionPage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(TransitionPage)