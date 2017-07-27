import React from 'react';
import pureRender from 'pure-render-decorator';
import {Container} from 'amazeui-touch';
import '../assets/styles/getMoneyPage.less';
class GetMoneyHelpPage extends React.Component{
	render(){
		return(
				<Container scrollable={true}>
					<div className='getMoneyContainer'>
						<p className='getHlep'>
							1、可提现已到账分红余额;
						</p>
						<p className='getHlep'>
							 2、单次20000以上余额可申请提取;
						</p>
						<p className='getHlep'>
							 3、提交申请请保持户名与代理商姓名相同;
						</p>
					</div>
				</Container>
			)
	}
}
export default pureRender(GetMoneyHelpPage);