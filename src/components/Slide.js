import React from 'react';
import {Link} from 'react-router';
import {Slider,Container} from 'amazeui-touch';
import '../assets/styles/slide.less';
import pureRender from 'pure-render-decorator';
class Slide extends React.Component{
	render(){
		const slideImg=this.props.slideImg;
		return(
			<Container>
					<Slider controls={false} className='sliderContainer'>
				    {slideImg.image&&slideImg.image.map(function(item, i) {
				      return (
				        <Slider.Item
				          key={i}
				        >
				        <Link to='/ProductDtailPage'>
				          <img className='productImage' src={bee.image(item,280,400)} />
				        </Link>
				        </Slider.Item>
				      );
				    })}
				  </Slider>
			</Container>
		)
	}
}
export default pureRender(Slide);