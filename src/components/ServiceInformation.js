import React from 'react';
import '../assets/styles/serviceInformation.less';
import {Container} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class ServiceInformation extends React.Component{
	constructor(props){
		super(props);
		this.state={
			borderStyle:{}
			
		}
	}
	componentWillMount(){
		let noBorder=this.props.noBorder||false;
		if(noBorder){
			this.setState({
				borderStyle:{
					borderBottom:'none'
				}
			})
		}
	}
	render(){
		return(
			<Container>
				<div className='serviceInformation'>
					<div className='serviceText' style={this.state.borderStyle}>
						<div style={this.props.titleStyle} className='serviceLeft'>{this.props.title}</div>
						<div style={this.props.contentStyle} className='serviceRight'>{this.props.content}</div>
					</div>
				</div>
			</Container>
			)
	}
}
export default pureRender(ServiceInformation);