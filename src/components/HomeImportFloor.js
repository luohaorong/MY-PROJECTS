import React from 'react';
import {Link} from 'react-router';
import '../assets/styles/homeImportFloor.less';
import HomeFloorTitle from './HomeFloorTitle';
import tiletBgImg from '../assets/images/home/footer1.png';
import Swiper from 'swiper';
import pureRender from 'pure-render-decorator';
class HomeImportFloor extends React.Component{
	render(){
		//初始化swipe，swiper-container1是swiper容器的类名，如果一个页面有多个swiper的话，类名不能相同
		var mySwiper =setTimeout(function(){
				new Swiper('.swiper-container1',{
					slidesPerView : 5,
					slidesPerGroup : 1,
					lazyLoading : true,
					spaceBetween:8,
					slidesOffsetBefore:8,
					slidesOffsetAfter:8
			});
		},100);
		let bgImg={
			backgroundImage:'url('+tiletBgImg+')'
		}
		//获取到父组件传过来的进口馆最上面图片数据
		let importListImg=this.props.importListImg;
		const firstList=(
			<div className="swiper-container swiper-container1">
				  <div className="swiper-wrapper">
				    {
				    	importListImg&&importListImg.map(function(item,i){
				    		return(
				    			<div  key={i} className="swiper-slide">
					    				<Link className='swiperLink' to={'/ProductDtailPage?uuid='+ item.uuid} data-uuid={item.uuid}>
												<img src={bee.image(item.image)}/>
												<span className='importCountry'>{item.title}</span>
										</Link>
								</div>
							)
						},this)
				    }
				  </div>
			</div>
		);
		//获取到父组件传过来的进口馆下面三张主图图片数据
		let importMainImg=this.props.importMainImg;
		let leftImg;
		let leftTitle;
		let leftUuid;
		let rightImg=[];
		importMainImg&&importMainImg.map(function(i,j){
			if(j>=1){
				rightImg.push(i)
			}else{
				leftImg=bee.image(i.image);
				leftTitle=i.title;
				leftUuid=i.uuid;
			}
		},this);
		const rightImgContent=(
				<div className='rightImgContent' id='rightImgContent'>
				{
					rightImg&&rightImg.map(function(item,i){
						return (
							<div key={i} className='rightImg'>
								<Link className='swiperLink' to={'/ProductDtailPage?uuid='+item.uuid} data-uuid={item.uuid}>
									<p className='rightTitle'>{item.title}</p>
									<img className='rightImage' src={bee.image(item.image)}/>
								</Link>	
							</div>
						)
					})
				}
				</div>
			
		)
		let moreStyle={
			display:'none'
		}
		return(
			<div className='importFloorContainer'>
				<HomeFloorTitle bgImg={bgImg} titleText='国际进口馆' more={moreStyle}/>
				{firstList}
				<div className='mainImgContainer'>
					<div className='leftImgContent'>
						<Link className='swiperLink' to={'/ProductDtailPage?uuid='+leftUuid} data-uuid={leftUuid}>
							<p className='leftTitle'>{leftTitle}</p>
							<img className='leftImage' src={leftImg}/>
						</Link>	
					</div>
					{rightImgContent}
				</div>
			</div>
		)
	}
}
export default pureRender(HomeImportFloor);