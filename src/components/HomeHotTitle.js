import React from 'react';
import '../assets/styles/homeHotTitle.less';
import pureRender from 'pure-render-decorator';
class HomeHotTitle extends React.Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		if (this.props.height) {
			
		this.refs['hotTitle'].style.height=0
		}
	}
	render(){
		return(
			<div className='hotTitleContainer' ref='hotTitle'>
				<img src={this.props.hotProductImg}/>
			</div>
		)
	}
}
export default pureRender(HomeHotTitle);