import React from 'react';
import Header from '../components/Header';
import '../assets/styles/registrationProtocol.less';
import {
	Container,
	View,
	Card
} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class RegistrationProtocol extends React.Component{
	render(){
		return(
			<View>
				<Header middleTop={true} MiddleTextTop='芸酒荟注册协议'/>
				<Container className='textWapper' scrollable={true}>
					<Card>
			          怎能就让这不停燃烧的心，
			          	就这样耗尽消失在平庸里。
			        </Card>

				</Container>
			</View>
		)
	}
}
export default pureRender(RegistrationProtocol);