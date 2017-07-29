import React from 'react';
import HomeFloorTitle from './HomeFloorTitle';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import tiletBgImg from '../assets/images/home/footer4.png';
import '../assets/styles/homeBubbleSweet.less';
class HomeDoc extends React.Component{

	render(){
		let bgImg={
			backgroundImage:'url('+tiletBgImg+')',
			color:'#bba12e'
		}


		const homeDocData=this.props.homeDocData;

		const topUl=(
			<ul id='topList' className='topList'>
			{
				homeDocData&&homeDocData.goods.map(function(item,i){
					if ((i+1)%3==0) {
							return(
								<li key={i} className='subtList'  style={{borderTop:'none',borderRight:'none'}}>
									<Link className='swiperLink' to={'/ProductDtailPage?uuid='+item.goods_uuid} data-uuid={item.goods_uuid}>	
											<img className='subImg' src={bee.image(item.thumb,280,400)}/>
											<p className='subName'>
												{item.chinese_name}
											</p>
											<p className='subPrice'>
												{item.lowest_price===0?'请登录':'￥'+bee.currency(item.lowest_price)}
											</p>
									</Link>
								</li>
							)
					}else{
						return(


								<li key={i} className='subtList'  style={{borderTop:'none',borderRight:'1px solid #e6e6e6'}}>
									<Link className='swiperLink' to={'/ProductDtailPage?uuid='+item.goods_uuid} data-uuid={item.goods_uuid}>	
											<img className='subImg' src={bee.image(item.thumb,280,400)}/>
											<p className='subName'>
												{item.chinese_name}
											</p>
											<p className='subPrice'>
												{item.lowest_price===0?'请登录':'￥'+bee.currency(item.lowest_price)}
											</p>
									</Link>
								</li>
							)
					}
					
				})
			}
				
			</ul>
		)
			
		
		
		return (
			<div className='bubbleSweetContainer'>
				<HomeFloorTitle bgImg={bgImg} titleText={homeDocData&&homeDocData.title}/>
				<div className='productList'>
					{topUl}
				</div>
			</div>
		)
	}
}
export default pureRender(HomeDoc);