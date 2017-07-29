import React from 'react';
import Header from '../components/Header';
import {Container,Card} from 'amazeui-touch';
import '../assets/styles/aboutUs.less';
import pureRender from 'pure-render-decorator';
//定义
class AboutUsPage extends React.Component{
	//渲染
	render(){
		return(
			<Container>
				<Header MiddleTextTop='关于我们' middleTop='true'/>
				<div className='aboutLogo'>
					<img src='../assets/images/logo.png' className='logoContainer'/>
				</div>
				<p className='aboutText'>荟酒国际是一家比较牛逼的一家卖红酒的集团！</p>
			</Container>
			)
	}

}
export default pureRender(AboutUsPage);