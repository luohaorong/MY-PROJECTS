import React from 'react';
import {Link} from 'react-router';
import {Slider,Container} from 'amazeui-touch';
import '../assets/styles/slide.less';
import pureRender from 'pure-render-decorator';
class Slide extends React.Component{
	constructor(props){
		super(props);
		this.state={
			errorSrc:''
		}
		this.errorLoad=this.errorLoad.bind(this);
	}
	//图片加载出错时执行
	errorLoad(){
		this.setState({
			errorSrc:'../assets/images/unload.png',
			classN:'errorLoad'
		})
		
		
	}
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
				          <img onError={this.errorLoad} className='productImage' src={this.state.errorSrc||bee.image(item,280,400)} />
				        </Link>
				        </Slider.Item>
				      );
				    },this)}
				  </Slider>
			</Container>
		)
	}
}
export default pureRender(Slide);