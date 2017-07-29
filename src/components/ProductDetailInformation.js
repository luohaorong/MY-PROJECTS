import React from 'react';
import {Container,Tabs,Grid,Col} from 'amazeui-touch';
import '../assets/styles/productDetailInformation.less';
import pureRender from 'pure-render-decorator';
class ProductDetailInformation extends React.Component{
	constructor(props){
		super(props);
		this.state={
			albums:{}
		}
	}
	render(){
		let detailData=this.props.detailData;
		let Data1={};
		let Data2={};
		if(detailData instanceof Array){
			detailData.map(function (i,j) {
				if (i.bonus_source==='agency') {
					Data1=i
				} else {
					Data2=i
				}
			})
			
		}
		console.log(Data1,Data2)
		
		const Ptitle1=(
						<div>
							<span>经销商</span>
						</div>
					)
		const Ptitle2=(
						<div>
							<span>企业用户</span>
						</div>
					)
		
		const Pdesc1=(
					<div className='profileCont'>
								<div>
									<div className='profileTtile'>
										<p className='profileTtileName'>{Data1.merchant_name}<span className='profileType'>{'经销商'}</span></p>
										<p className='profileTtileMoney'>&yen;{Data1.total_bonus?bee.currency(Data1.total_bonus):'0.00'}</p>
									</div>
									
									{
										Data1.detail?Data1.detail.map(function(p,q){
										return(
												<div className='proContainer' key={'p'+q}>
													<p className='proContainerLeft'>{p.created_at}</p>
													<p className='proContainerRight'>&yen;{bee.currency(p.amount)}</p>
												</div>
											)
										}):''
									}
								</div>	
								
						
						
					</div>          
					)
		const Pdesc2=(
						<div className='profileCont'>
								<div>
									<div className='profileTtile'>
										<p className='profileTtileName'>{Data2.merchant_name}<span className='profileType'>{'企业用户'}</span></p>
										<p className='profileTtileMoney'>&yen;{Data2.total_bonus?bee.currency(Data2.total_bonus):'0.00'}</p>
									</div>
									
									{
										Data2.detail?Data2.detail.map(function(p,q){
										return(
												<div className='proContainer' key={'b'+q}>
													<p className='proContainerLeft'>{p.created_at}</p>
													<p className='proContainerRight'>&yen;{bee.currency(p.amount)}</p>
												</div>
											)
										}):''
									}
								</div>	
						</div>          
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
				<Container>
					<Tabs className='proDeInfoContainer'>
			            {albums.map((ablum, i) => {
				              	return (
						                <Tabs.Item title={ablum.title} key={i} disabled={i === num}>
						                  {ablum.desc}
						                 
						                </Tabs.Item>
						                
				              	)
			            	})
			        	}
			        </Tabs>
			        
        
				</Container>
			)
	}
}
export default pureRender(ProductDetailInformation);