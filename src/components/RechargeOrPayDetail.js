import React from 'react';
import {Tabs,Container,View} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
import BalancePayments from './BalancePayments';
import '../assets/styles/rechargeOrPayDetail.less';
class RechargeOrPayDetail extends React.Component{
	constructor(props){
		super(props);
		this.state={
			albums:{},
			boos:{}
		}
	}
	componentDidMount(){
		let isRecharge=bee.getQueryString('isRecharge');
		let payNode=document.querySelector('.btnPay');
		if(isRecharge==='false'){
			payNode.click()

		}
	}
	render(){
		const Ptitle1=(
						
							<p className='btnNav'>充值记录</p>
						
					)
		const Ptitle2=(
						
							<p className='btnNav btnPay'>消费记录</p>
						
					)
		const DataMoneyDetail1=[
			{
				type:'recharge',
				ordernum:'12121233333',
				time:'2016-05-05   04:51:32',
				money:'+0.01'
			},
			{
				type:'recharge',
				ordernum:'12331212121',
				time:'2016-05-05   04:51:32',
				money:'+0.02'
			},
			{
				type:'recharge',
				ordernum:'1444421212121',
				time:'2016-05-05   04:51:32',
				money:'+0.03'
			},
			{
				type:'recharge',
				ordernum:'12331212121',
				time:'2016-05-05   04:51:32',
				money:'+0.02'
			},
			{
				type:'recharge',
				ordernum:'1444421212121',
				time:'2016-05-05   04:51:32',
				money:'+0.03'
			},
			{
				type:'recharge',
				ordernum:'12331212121',
				time:'2016-05-05   04:51:32',
				money:'+0.02'
			},
			{
				type:'recharge',
				ordernum:'1444421212121',
				time:'2016-05-05   04:51:32',
				money:'+0.03'
			},
			{
				type:'recharge',
				ordernum:'12331212121',
				time:'2016-05-05   04:51:32',
				money:'+0.02'
			},
			{
				type:'recharge',
				ordernum:'1444421212121',
				time:'2016-05-05   04:51:32',
				money:'+0.03'
			},
			{
				type:'recharge',
				ordernum:'12331212121',
				time:'2016-05-05   04:51:32',
				money:'+0.02'
			},
			{
				type:'recharge',
				ordernum:'1444421212121',
				time:'2016-05-05   04:51:32',
				money:'+0.03'
			}

		];			
		const DataMoneyDetail2=[
			{
				type:'pay',
				ordernum:'12121233333',
				time:'2016-05-05   04:51:32',
				money:'-0.03'
			},
			{
				type:'pay',
				ordernum:'12331212121',
				time:'2016-05-05   04:51:32',
				money:'-0.01'
			},
			{
				type:'pay',
				ordernum:'1444421212121',
				time:'2016-05-05   04:51:32',
				money:'-0.02'
			}

		];
		const Pdesc1=(
						<BalancePayments DataMoneyDetail={DataMoneyDetail1}/>
					)
		const Pdesc2=(
						<BalancePayments DataMoneyDetail={DataMoneyDetail2}/>
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
				
				<View>
					<Container scrollable={true}>
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
			        </Container>
			   	</View>
				
				
			   
			)
	}
}
export default pureRender(RechargeOrPayDetail);