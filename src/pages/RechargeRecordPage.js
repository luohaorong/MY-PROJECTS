import React from 'react';
import {Tabs,View,Container} from 'amazeui-touch';
import RechargeOrPayDetail from '../components/RechargeOrPayDetail';
import pureRender from 'pure-render-decorator';
class RechargeRecordPage extends React.Component{
	constructor(props){
		super(props);
		
	}
	
	componentDidMount(){
		bee.pushUrl();
		document.title="充值/消费记录";
		let This = this;
		bee.post('/wechat/recharges/record',{
			'page':1,
			'size':8
		},function(data){
			console.log(data)
		},true)
	}
	render(){
		return(
			
				
					<RechargeOrPayDetail/>
				
			
			)
	}
}
export default pureRender(RechargeRecordPage);