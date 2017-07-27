import React from 'react';
import pureRender from 'pure-render-decorator';
import {View,Container} from 'amazeui-touch';
import AgencyHeader from '../components/AgencyHeader';
import AgencyBox from '../components/AgencyBox';
class TestPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			Data1:{},
			headerData:{}
		}
	}
	componentDidMount(){
		let that = this;
		let searchData=sessionStorage.getItem('SearchDetail');
		searchData=JSON.parse(searchData);
		this.setState({
			headerData:searchData
		})
		bee.post('/bonus', {
//			"bonus_source": searchData.userType,
//		    "started_at": searchData.tmStart,
//		    "ended_at": searchData.tmEnd,
//		    "areas_uuid": searchData.userArea
		}, function(data) {
			if(data.code) {
				alert(data.info);
				return;
			}
			data.data.total_bonus = bee.currency(data.data.total_bonus);
			that.setState({
				Data1:data.data
			})
		}, true);
	
	}
	render(){
		let userType='';
		let userText=this.state.headerData.userText;
		if(this.state.headerData.userType){
			if(this.state.headerData.userType==='agency'){
				userType='经销商'
			}
			if(this.state.headerData.userType==='company'){
				userType='企业用户'
			}
		}else{
			userType='所有商户'
		}
		
			
		
		return(
				<View>
					<Container scrollable={true}>
						<AgencyHeader time={this.state.headerData.tmStart+'-'+this.state.headerData.tmEnd} type={userType} moneyNum={this.state.Data1.total_bonus} address={userText}/>
						<AgencyBox Data1={this.state.Data1.bonuses} maybe={true}/>
					</Container>
				</View>
			)
	}
}
export default pureRender(TestPage);
