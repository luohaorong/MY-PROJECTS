import React from 'react';
import '../assets/styles/button.less';
import pureRender from 'pure-render-decorator';
class Button extends React.Component {
	render(){
		let loginBtn=this.props.btnClass||'loginBtn'
		
		return(
			<button className={loginBtn} onClick={this.props.onClick} style={this.props.btnStyle}>{this.props.content}</button>
		)
	}
}
Button.defaultProps={
	btnStyle:{
		width:'96%',
		height:'3rem'

	}
}
export default pureRender(Button);