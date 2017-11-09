import React from 'react';
import {Container,Tabs,Grid,Col} from 'amazeui-touch';
import '../assets/styles/productDetailInformation.less';
import pureRender from 'pure-render-decorator';
class ProductDetailInformation extends React.Component{
	constructor(props){
		super(props);
		
	}
	
	render(){
		let base=this.props.detailIfo.base;//基本信息数据
		let taste=this.props.detailIfo.tasty;//品尝信息数据
		let packing=this.props.detailIfo.packing;//包装信息数据
		let baseLen;
		let tasteLen;
		let packingLen;
		if(base){
			baseLen=base.length;
		};
		if(taste){
			tasteLen=base.length;
		};
		if(packing){
			packingLen=base.length;
		};
		let Ptitle1=(
						<div>
							<span>基本信息</span>
							<p className='underLine'></p>
						</div>
					)
		let Ptitle2=(
						<div>
							<span>品尝信息</span>
							<p className='underLine'></p>
						</div>
					)
		let Ptitle3=(
						<div>
							<span>包装信息</span>
							<p className='underLine'></p>
						</div>
					)

		let Pdesc1=(
						<Grid avg={2} className='detailInformation'>
						{
							base&&base.map(function(item,i){
								let val=item.value;
								if(i<=baseLen/2){
									return(
										<Col key={item.uuid}>
					                  	 	<Grid>
					                  	 		<Col shrink>
					                  	 			{item.name}:
					                  	 		</Col>
					                  	 		<Col className='text-truncate'>
					                  	 			{
					                  	 				item.value.map(function(item){
					                  	 					if(val.length>1){
						                  	 					return item.name+"、";
					                  	 					}else{
					                  	 						return item.name;
					                  	 					}
					                  	 				})
					                  	 			}
					                  	 		</Col>
					                  	 	</Grid>
				                  		</Col>
									)
									
								}else{
									return(
										<Col  key={item.uuid}>
	   									 	<Grid>
					                  	 		<Col shrink>
					                  	 			{item.name}:
					                  	 		</Col>
					                  	 		<Col className='text-truncate'>
					                  	 			{
					                  	 				item.value.map(function(item){
					                  	 					if(val.length>1){
						                  	 					return item.name+"、";
					                  	 					}else{
					                  	 						return item.name;
					                  	 					}
					                  	 				})
					                  	 			}
					                  	 		</Col>
					                  	 	</Grid>
           								</Col>
									)
								}
								
							})
						}
			            </Grid>
					)
		let Pdesc2=(
					
						<Grid avg={2} className='detailInformation'>
						{
							taste&&taste.map(function(item,i){
								let val=item.value;
								if(i<=tasteLen/2){
									return(
										<Col key={item.uuid}>
					                  	 	<Grid>
					                  	 		<Col shrink>
					                  	 			{item.name}:
					                  	 		</Col>
					                  	 		<Col className='text-truncate'>
					                  	 			{
					                  	 				item.value.map(function(item){
					                  	 					if(val.length>1){
						                  	 					return item.name+"、";
					                  	 					}else{
					                  	 						return item.name;
					                  	 					}
					                  	 				})
					                  	 			}
					                  	 		</Col>
					                  	 	</Grid>
				                  		</Col>
									)
									
								}else{
									return(
										<Col  key={item.uuid}>
	   									 	<Grid>
					                  	 		<Col shrink>
					                  	 			{item.name}:
					                  	 		</Col>
					                  	 		<Col className='text-truncate'>
					                  	 			{
					                  	 				item.value.map(function(item){
					                  	 					if(val.length>1){
						                  	 					return item.name+"、";
					                  	 					}else{
					                  	 						return item.name;
					                  	 					}
					                  	 				})
					                  	 			}
					                  	 		</Col>
					                  	 	</Grid>
           								</Col>
									)
								}
								
							})
						}            	
		                </Grid>
						                  
						             
					)
		let Pdesc3=(
					<Grid avg={2} className='detailInformation'>
				      {
						packing&&packing.map(function(item,i){
							let val=item.value;
							if(i<=packingLen/2){
								return(
									<Col key={item.uuid}>
				                  	 	<Grid>
				                  	 		<Col shrink>
				                  	 			{item.name}:
				                  	 		</Col>
				                  	 		<Col className='text-truncate'>
				                  	 			{
				                  	 				item.value.map(function(item){
				                  	 					if(val.length>1){
						                  	 					return item.name+"、";
					                  	 					}else{
					                  	 						return item.name;
					                  	 					}
				                  	 				})
				                  	 			}
				                  	 		</Col>
				                  	 	</Grid>
			                  		</Col>
								)
								
							}else{
								return(
									<Col  key={item.uuid}>
   									 	<Grid>
				                  	 		<Col shrink>
				                  	 			{item.name}:
				                  	 		</Col>
				                  	 		<Col className='text-truncate'>
				                  	 			{
				                  	 				item.value.map(function(item){
				                  	 					if(val.length>1){
						                  	 					return item.name+"、";
					                  	 					}else{
					                  	 						return item.name;
					                  	 					}
				                  	 				})
				                  	 			}
				                  	 		</Col>
				                  	 	</Grid>
       								</Col>
								)
							}
								
							})
						}            	 
                  	</Grid>
					)
		let albums = [
						  {
						    title:Ptitle1,
						    desc: Pdesc1
						      
						  },
						  {
						    title: Ptitle2,
						    desc: Pdesc2
						  },
						  {
						    title: Ptitle3,
						    desc:Pdesc3
						  },
						  
						];
		let num=albums.length;
		return(
				<Container>
					<Tabs id='proDeInfoContainer'>
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