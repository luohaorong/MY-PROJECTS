import React from 'react';
import {Link} from 'react-router';
import {Slider,Container} from 'amazeui-touch';
import '../assets/styles/slide.less';
import pureRender from 'pure-render-decorator';
class Slide extends React.Component{
	render(){
		const slideImg=this.props.slideImg;
		const sliderCaption = (
					  <Slider controls={false} className='sliderContainer'>
					    {slideImg.map(function(item, i) {
					      return (
					        <Slider.Item
					          key={i}
					        >
					        <Link to='/ProductDtailPage'>
					          <img className='productImage' src={item.img} />
					        </Link>
					        </Slider.Item>
					      );
					    })}
					  </Slider>
					);
		return(
			<Container>
				{sliderCaption}
			</Container>
		)
	}
}
export default pureRender(Slide);