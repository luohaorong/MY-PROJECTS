import React from 'react';
import {Tabs,Container,View} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
import BalancePayments from './BalancePayments';
import '../assets/styles/rechargeOrPayDetail.less';
let getData,noData;
class RechargeOrPayDetail extends React.Component{
	constructor(props){
		super(props);
		this.state={
			albums:{},
			boos:{},
			getData:this.props.isGetData1,
			noData:this.props.noData1
		}
		this.recordClick=this.recordClick.bind(this);
	}
	componentDidMount(){
		let isRecharge=bee.getQueryString('isRecharge');
		let payNode=document.querySelector('.btnPay');
		getData=this.props.isGetData1;
		if(isRecharge==='false'){
			payNode.click()

		}

	}
	recordClick(e){
		let active = e.currentTarget;
		let name = active.getAttribute('data-name');
		if(name=='re'){
			getData=this.props.isGetData1;
			noData=this.props.noData1;
		}else{
			getData=this.props.isGetData2;
			noData=this.props.noData2;
		}
		this.setState({
			getData:getData,
			noData:noData
		})
	}
	render(){
		const Ptitle1=(
						
							<p className='btnNav' data-name='re' onClick={this.recordClick}>充值记录</p>
						
					)
		const Ptitle2=(
						
							<p className='btnNav btnPay' data-name='pa' onClick={this.recordClick}>消费记录</p>
						
					)
		const DataMoneyDetail1=this.props.rechargeData || [];
		
		const DataMoneyDetail2=this.props.payData || [];
		const Pdesc1=(
						<BalancePayments  noData={this.state.noData} isGetData={this.state.getData} DataMoneyDetail={DataMoneyDetail1} loadStyle={{'height':'1.5rem'}} empty='您还没有充值记录'/>
					)
		const Pdesc2=(
						<BalancePayments  noData={this.state.noData} isGetData={this.state.getData} DataMoneyDetail={DataMoneyDetail2} loadStyle={{'height':'1.5rem'}} empty='您还没有消费记录'/>
					)
		
		const albums = [
						  {
						    title:Ptitle1,
						    desc: Pdesc1
						      
						  },
						  {
						    title: Ptitle2,
						    desc: Pdesc2
						  }
						];
		
		let num=albums.length;
		return(
				
					<Tabs className='proDeInfoContainer'>
			            	{albums.map((ablum, i) => {
				              	return (
							                <Tabs.Item title={ablum.title} key={i}  disabled={i === num}>
							                  		{ablum.desc}
							                </Tabs.Item>
				              		)
			            		})
			        		}
			        </Tabs>
				
				
			   
			)
	}
}

export default pureRender(RechargeOrPayDetail);