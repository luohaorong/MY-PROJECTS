import React from 'react';
import pureRender from 'pure-render-decorator';
import StaffHead from '../components/StaffHead';
import ServiceTitle from '../components/ServiceTitle';
import ServiceInformation from '../components/ServiceInformation';
import BusinessProfile from '../components/BusinessProfile';
import RegionalManagement from '../components/RegionalManagement';
import {Container,View} from 'amazeui-touch';
class StaffIndexPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			indexData:{}
		}
		this.fenhongClick=this.fenhongClick.bind(this);
	}
	fenhongClick(e){
		let active=e.currentTarget;
		let type= active.getAttribute('data-type');
		let words=active.getAttribute('data-title');
		let obj={
			'type':type,
			'words':words
		}
		sessionStorage.setItem('type',JSON.stringify(obj));
	}
	componentDidMount(){
		let that=this;
		bee.post('/index', {}, function(data){
			/*optional stuff to do after success */
			if (data.code) {
				alert(data.info);
				return;
			}
			sessionStorage.setItem('areas_name',data.data.areas_name);
			data.data.inducted_at=data.data.inducted_at.split(' ')[0];
			if (data.data.agency_started_at !== undefined) {
				data.data.agency_started_at=data.data.agency_started_at.split(' ')[0];
				data.data.agency_ended_at=data.data.agency_ended_at.split(' ')[0];
			}
			data.data.today_bonus=bee.currency(data.data.today_bonus);
			data.data.last_month_bonus=bee.currency(data.data.last_month_bonus);
			data.data.this_month_bonus=bee.currency(data.data.this_month_bonus);
			that.setState({
				indexData:data.data
			});
		},true);
		
		
	}
	
	render(){
		// console.log(this.state.indexData)
		let dataHead={
			img:this.state.indexData.avatar,
			province:this.state.indexData.areas_name,
			name:this.state.indexData.real_name,
			time:this.state.indexData.inducted_at
		};
		const businessProfile=[
										{
											title:'今日',
											money:this.state.indexData.today_bonus,
											many:this.state.indexData.today_orders+'笔订单',
											hash:'/StaffProfilePage',
											uuid:'1',
											timeType:'today'
										}
										,{
											title:'本月',
											money:this.state.indexData.this_month_bonus,
											many:this.state.indexData.this_month_orders+'笔订单',
											hash:'/StaffProfilePage',
											uuid:'2',
											timeType:'this_month'
										}
										,{
											title:'上月',
											money:this.state.indexData.last_month_bonus,
											many:this.state.indexData.last_month_orders+'笔订单',
											hash:'/StaffProfilePage',
											uuid:'3',
											timeType:'last_month'
										}
		];
			 	const agencyInformation=[
	 				
					{
						title:'代理商信息',
						detailData:[
										{
											title:'姓名',
											content:this.state.indexData.agency_name?this.state.indexData.agency_name:'无',
											uuid:'1'
										}
										,{
											title:'时长',
											content:this.state.indexData.agency_started_at&&this.state.indexData.agency_ended_at?this.state.indexData.agency_started_at+'至'+this.state.indexData.agency_ended_at:'无',
											uuid:'2'
										}
										,{
											title:'电话',
											content:this.state.indexData.agency_mobile?this.state.indexData.agency_mobile:'无',
											uuid:'3'
										}
									],
						uuid:'1'			
					}
					
					];
		const regionalManagement={
			province:this.state.indexData.areas_name,
			detail:'还有'+this.state.indexData.no_staff+'个区域无业务经理',
			hash:'/RegionAdminPage'
		}
		const StaffInfo=(
					agencyInformation?agencyInformation.map(function(j,i){
							return(
									<div key={j.uuid}>
										<ServiceTitle text={j.title}/>
										{
											j.detailData.map(function(item,i){
													if(i===j.detailData.length-1){
														return(<ServiceInformation noBorder={true} key={item.uuid} content={item.content} title={item.title}/>)

													}else{
														return(<ServiceInformation key={item.uuid} content={item.content} title={item.title}/>)

													}
											})
										}
									</div>

								)
								
								

					}):""
				)
		let secStyle={};
		if(this.state.indexData.areas_layout){
			if(this.state.indexData.areas_layout===2){
				secStyle={display:'block'}
			}else{
				secStyle={display:'none'}
			}
		}
		return(
			<View>
				<Container scrollable={true}>
					<StaffHead dataHead={dataHead}/>
					<ServiceTitle text='业务概况'/>
					<BusinessProfile businessProfile={businessProfile} fenhongClick={this.fenhongClick}/>
					<section style={secStyle}>
					<ServiceTitle text='区域管理'/>
					<RegionalManagement regionalManagement={regionalManagement}/>
					</section>
					{StaffInfo}
					<div style={{height:'3.56rem'}}></div>
				</Container>
			</View>
			)
	}
}
StaffIndexPage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(StaffIndexPage);