import React from 'react';
import pureRender from 'pure-render-decorator';
import CashListTab from '../components/CashListTab';
import AgencyBox from '../components/AgencyBox';
import {Container,View} from 'amazeui-touch';
class CashDetailPage extends React.Component{
	constructor(props){
		super(props);
		this.clickHeadle=this.clickHeadle.bind(this);
	}
	componentWillMount(){
		let status=sessionStorage.getItem('status');
		this.setState({
			type:status
		})
	}
	componentDidMount(){
		let that=this;
		bee.post('/withdrawal', {
			'status':that.state.type
		}, function (data) {
			if (data.code) {
				alert(data.info);
				return;
			}
			that.setState({
				Data:data.data
			})
		}, true);
	}
	clickHeadle(event){
		let active=event.currentTarget;
		let activeStatus=active.getAttribute('data-status');
		let that=this;
		bee.post('/withdrawal', {
			'status':activeStatus
		}, function (data) {
			if (data.code) {
				alert(data.info);
				return;
			}
			that.setState({
				Data:data.data
			})
		}, true);
		
	}
	render(){
		const arr=['','ing','yes','no'];
		const tmp=[];
		const listData=[
							{
								title:'全部'
								,img:''
								,selectTab:true
								,status:''
							}
							,{
								title:'审核中'
								,img:''
								,selectTab:false
								,status:'ing'
							}
							,{
								title:'已完成'
								,selectTab:false
								,status:'yes'
							}
							,{
								title:'未通过'
								,selectTab:false
								,status:'no'
							}
						]
		arr.map(function(i){
			tmp.push(i===this.state.type)
		},this)
		listData.map(function(i,k){
			i.selectTab=tmp[k]
		})
		const Data2=[
					{
						uuid:'1',
						title:'tx201705',
						type:'已完成',
						name:'张三',
						time:'2017.01.01',
						money:'200',
						account:'6220 1646 4165 1654 705',
						bank:'建设银行xxx路xx支行',
						remark: '已经完成'
			
					}
					,{
						uuid:'2',
						title:'tx201705',
						type:'审核中',
						name:'李四',
						time:'2017.01.01',
						money:'201',
						account:'6220 1646 4165 1654 705',
						bank:'建设银行xxx路xx支行',
						remark: ''
						
					}
					,{
						uuid:'3',
						title:'tx201705',
						type:'未成功',
						name:'王麻子',
						time:'2017.01.01',
						money:'202',
						account:'6220 1646 4165 1654 705',
						bank:'建设银行xxx路xx支行',
						remark: '账号异常'
					}
		];
		return(
			<View>
			<Container scrollable={true}>
				<CashListTab listData={listData} onClickData={this.clickHeadle}/>
				<AgencyBox Data2={this.state.Data} profileStyle={{marginTop:'4rem'}}/>
			</Container>
			</View>
			
		)
	}
}
export default pureRender(CashDetailPage);
