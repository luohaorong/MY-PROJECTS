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
			Data2:{}
		}
	}
	componentWillMount(){
		const Data1=[
			{
						name:'张三',
						type:'（经销商）',
						totalMoney:'2000',
						detailData:[
										{
											time:'2017.01.01 12:12:00',
											singleMoney:'20',
											uuid:'1'
										}
										,{
											time:'2017.01.01 12:12:00',
											singleMoney:'20',
											uuid:'2'
										}
									],
						uuid:'1'			
					}
					,{
						name:'晕哥',
						type:'（经销商）',
						totalMoney:'20001',
						detailData:[
										{
											time:'2017.01.01 12:12:00',
											singleMoney:'20',
											uuid:'3'
										}
										,{
											time:'2017.01.01 12:12:00',
											singleMoney:'20',
											uuid:'4'
										}
									],
						uuid:'2'			
					}
		];
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
		this.setState({
			Data1:Data1,
			Data2:Data2
		})
	}
	render(){
		let Data1=this.state.Data1;
		let Data2=this.state.Data2;
		return(
				<View>
					<Container scrollable={true}>
						<AgencyHeader moneyNum='134800.56' probably={true}/>
						<AgencyBox Data1={Data1} Data2={Data2} maybe={true}/>
					</Container>
				</View>
			)
	}
}
export default pureRender(TestPage);