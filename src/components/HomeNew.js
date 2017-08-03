import React from 'react';
import Swiper from 'swiper';
import {Link} from 'react-router';
import '../assets/styles/homeNew.less';
import HomeFloorTitle from './HomeFloorTitle';
import tiletBgImg from '../assets/images/home/footer2.png';
import pureRender from 'pure-render-decorator';
class HomeNew extends React.Component{
	render(){
		var newSwiper = setTimeout(function(){
			new Swiper('.swiper-container2',{
				slidesPerView : 3,
				slidesPerGroup : 1,
				lazyLoading : true
			})
		},100);
		let bgImg={
			backgroundImage:'url('+tiletBgImg+')',
			color:'#bb070e'
		}
		//获取到父组件传过来的新品预热图片数据
		let newImage=this.props.newImage;
		const newList=(
			<div className="swiper-container swiper-container2">
				  <div className="swiper-wrapper">
				    {
				    	newImage&&newImage.goods.map(function(item,i){
				    		return(
				    			<div key={item.goods_uuid} className="swiper-slide">
					    			<Link className='swiperLink' to={'/ProductDtailPage?uuid='+item.goods_uuid} data-uuid={item.goods_uuid}>
										<img className='newImage' src={bee.image(item.thumb,280,400)}/>
										<p className='newName'>{item.chinese_name}</p>
										<p className='newPrice'>{item.lowest_price===0?'请登录':'￥'+bee.currency(item.lowest_price)}</p>
									</Link>	
								</div>
								
							)
						})
				    }
				  </div>
			</div>
		);
		return (
			<div className='homeNewContainer'>
				<HomeFloorTitle bgImg={bgImg} titleText={newImage&&newImage.title} />
				{newList}
			</div>
			
		)
			
		
	}
}
export default pureRender(HomeNew);