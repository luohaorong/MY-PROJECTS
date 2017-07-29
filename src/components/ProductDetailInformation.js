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
	componentWillMount(){
		const Ptitle1=(
						<div>
							<span>基本信息</span>
							<p className='underLine'></p>
						</div>
					)
		const Ptitle2=(
						<div>
							<span>品尝信息</span>
							<p className='underLine'></p>
						</div>
					)
		const Ptitle3=(
						<div>
							<span>包装信息</span>
							<p className='underLine'></p>
						</div>
					)
		const Pdesc1=(
					<div>
						<Grid avg={2} className='detailInformation'>
						                  	 <Col>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			分类111：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			葡萄酒
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid >
						                  	 		<Col shrink>
						                  	 			产区 : 
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			朗格多克-鲁西荣
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			等级：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			VDP 地区餐酒
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			年份：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			2014
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			酒精：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			13%
						                  	 		</Col>
						                  	 	</Grid>
						                  	 </Col>
           									 <Col>
           									 	<Grid>
						                  	 		<Col shrink>
						                  	 			产地：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			法国
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			次级产区:
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			奥克地区
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			容量:
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			750ML
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			葡萄：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			美乐
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			类型:
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			干红
						                  	 		</Col>
						                  	 	</Grid>
           									 </Col>
						                  </Grid>
						                  <Grid className='detailInformation message'>
						                  	 <Col shrink>厂家寄语：</Col>
           									 <Col>经橡木桶陈酿6个月，获得2016柏林葡萄酒大赛金奖。酒体饱满，带有黑醋栗。</Col>
						                  </Grid>
						        </div>          
					)
		const Pdesc2=(
					<div>
						<Grid avg={2} className='detailInformation'>
						                  	 <Col>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			分类222：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			葡萄酒
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid >
						                  	 		<Col shrink>
						                  	 			产区 : 
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			朗格多克-鲁西荣
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			等级：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			VDP 地区餐酒
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			年份：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			2014
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			酒精：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			13%
						                  	 		</Col>
						                  	 	</Grid>
						                  	 </Col>
           									 <Col>
           									 	<Grid>
						                  	 		<Col shrink>
						                  	 			产地：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			法国
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			次级产区:
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			奥克地区
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			容量:
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			750ML
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			葡萄：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			美乐
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			类型:
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			干红
						                  	 		</Col>
						                  	 	</Grid>
           									 </Col>
						                  </Grid>
						                  <Grid className='detailInformation message'>
						                  	 <Col shrink>厂家寄语：</Col>
           									 <Col>经橡木桶陈酿6个月，获得2016柏林葡萄酒大赛金奖。酒体饱满，带有黑醋栗。</Col>
						                  </Grid>
						    </div>              
					)
		const Pdesc3=(
					<div>
						<Grid avg={2} className='detailInformation'>
						                  	 <Col>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			分类333：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			葡萄酒
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid >
						                  	 		<Col shrink>
						                  	 			产区 : 
						                  	 		</Col>
						                  	 		<Col className='text-truncate'> 
						                  	 			朗格多克-鲁西荣
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			等级：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			VDP 地区餐酒
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			年份：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			2014
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			酒精：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			13%
						                  	 		</Col>
						                  	 	</Grid>
						                  	 </Col>
           									 <Col>
           									 	<Grid>
						                  	 		<Col shrink>
						                  	 			产地：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			法国
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			次级产区:
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			奥克地区
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			容量:
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			750ML
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			葡萄：
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			美乐
						                  	 		</Col>
						                  	 	</Grid>
						                  	 	<Grid>
						                  	 		<Col shrink>
						                  	 			类型:
						                  	 		</Col>
						                  	 		<Col className='text-truncate'>
						                  	 			干红
						                  	 		</Col>
						                  	 	</Grid>
           									 </Col>
						                  </Grid>
						                  <Grid className='detailInformation message'>
						                  	 <Col shrink>厂家寄语：</Col>
           									 <Col>经橡木桶陈酿6个月，获得2016柏林葡萄酒大赛金奖。酒体饱满，带有黑醋栗。</Col>
						                  </Grid>
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
						  },
						  {
						    title: Ptitle3,
						    desc:Pdesc3
						  },
						  
						];
	this.setState({
		albums:albums
	})
	}
	render(){
		let albums=this.state.albums;
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