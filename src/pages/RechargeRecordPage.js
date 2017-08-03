import React from 'react';
import {Tabs,View,Container} from 'amazeui-touch';
import RechargeOrPayDetail from '../components/RechargeOrPayDetail';
import pureRender from 'pure-render-decorator';
class RechargeRecordPage extends React.Component{
	constructor(props){
		super(props);
		
	}
	
	render(){
		return(
			
				
					<RechargeOrPayDetail/>
				
			
			)
	}
}
export default pureRender(RechargeRecordPage);