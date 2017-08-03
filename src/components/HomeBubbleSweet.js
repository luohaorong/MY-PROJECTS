import React from 'react';
import HomeFloorTitle from './HomeFloorTitle';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import tiletBgImg from '../assets/images/home/footer3.png';
import '../assets/styles/homeBubbleSweet.less';
class HomeBubbleSweet extends React.Component{
	constructor(props){
		super(props);
		this.state={
			borderRight:{
				borderRight:'none'
			}
		}
	}
	render(){
		let bgImg={
			backgroundImage:'url('+tiletBgImg+')',
			color:'#ad239b'
		}
		const bubbleData=this.props.bubbleData;
		const topUl=(
			<ul id='topList' className='topList'>
			{
				bubbleData&&bubbleData.goods.map(function(item,i){
					if(i<=1){
						let borderR;
						i===1?borderR=this.state.borderRight:borderR='';
						return(
								<li key={item.goods_uuid} className='TopList' style={{borderR}}>
									<Link className='swiperLink' to={'/ProductDtailPage?uuid='+item.goods_uuid} data-uuid={item.goods_uuid}>
											<img className='topImg' src={bee.image(item.thumb,280,400)}/>
											<div className='topText'>
												<p className='topName'>
													{item.chinese_name}
												</p>
												<p className='topPrice'>
													{item.lowest_price===0?'请登录':'￥'+bee.currency(item.lowest_price)}
												</p>
											</div>
									</Link>	
								</li>
							)
					}else{
							let borderR;
							i===4?borderR=this.state.borderRight:borderR='';
							return(
								<li key={item.goods_uuid} className='subtList' style={{borderR}}>
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
				},this)
			}
				
			</ul>
		)
			
		
		
		return (
			<div className='bubbleSweetContainer'>
				<HomeFloorTitle bgImg={bgImg} titleText={bubbleData&&bubbleData.title}/>
				<div className='productList'>
					{topUl}
				</div>
			</div>
		)
	}
}
export default pureRender(HomeBubbleSweet);