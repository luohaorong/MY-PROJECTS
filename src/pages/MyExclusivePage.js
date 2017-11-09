import React from 'react';
import ExclusiveContainer from '../components/ExclusiveContainer';
import {View,Container} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class MyExclusivePage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			exclusiveData:[]
		}
	}
	componentDidMount(){
		document.title='我的独家';
		bee.pushUrl();
		let This = this;
		bee.post('/wechat/my/exclusive',{
			'page':1,
			'size':3
		},function(data){
			if (data.error_code==0) {
				This.setState({
					exclusive:data.data
				})
			}
		},true)
	}
	render(){
		return(
			<Container scrollable={true}>
				<ExclusiveContainer empty='您还没有独家记录' exclusive={this.state.exclusive} />				
			</Container>
			)
	}
}
export default pureRender(MyExclusivePage);