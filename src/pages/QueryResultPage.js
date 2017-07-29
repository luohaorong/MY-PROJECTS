import React from 'react';
import pureRender from 'pure-render-decorator';
import {View,Container} from 'amazeui-touch';
import QueryHead from '../components/QueryHead';
import QueryContent from '../components/QueryContent';
import QueryBottom from '../components/QueryBottom';
class QueryResultPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			SearchDetail:{},
			queryData:{}
		}
	}
	componentDidMount(){
		let SearchDetail=JSON.parse(sessionStorage.getItem('SearchDetail'));
		this.setState({
			SearchDetail:SearchDetail
		});
		let that=this;
		//发请求并更新provinceData:[]状态
		bee.post('/bonus', {
			"bonus_source":SearchDetail.userTypeEn ,
		    "started_at": SearchDetail.tmStart,
		    "ended_at": SearchDetail.tmEnd,
		    "areas_uuid": SearchDetail.userArea
		}, function(data) {
			if(data.code) {
				alert(data.info);
				return;
			}
			data.data.total_bonus=bee.currency(data.data.total_bonus)
			that.setState({
				queryData:data.data
			})
			
		}, true);
	}
	render(){
		const queryHead={
			time:this.state.SearchDetail.tmStart+'至'+this.state.SearchDetail.tmEnd,
			type:this.state.SearchDetail.userType,
			province:this.state.SearchDetail.userText
		}
		const queryData=this.state.queryData;
		const queryBottom=this.state.queryData.total_bonus;
		console.log(queryData);
		return(
				<View>
					<Container scrollable={true}>
						<QueryHead queryHead={queryHead}/>
						<QueryContent queryData={queryData}/>
						<QueryBottom queryBottom={queryBottom}/>
					</Container>
				</View>
			)
	}
}
export default pureRender(QueryResultPage);