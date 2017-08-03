import React from 'react';
import '../assets/styles/number.less';
import pureRender from 'pure-render-decorator';
class Number extends React.Component{
	constructor(props){
		super(props);
		this.state={
			value:this.props.quantity,
			pass:'no'
		};
		this.changeHandler=this.changeHandler.bind(this);
		this.blurHandler=this.blurHandler.bind(this);
		this.minusHandler=this.minusHandler.bind(this);
		this.addHandler=this.addHandler.bind(this);
	}
	changeHandler(event){
		let count=event.target.value;
		this.setState({
			value:count
		})
	}
	blurHandler(){
		console.log(this.state.value)
	}
	addHandler(){
		console.log(111)
	}
	minusHandler(){
		console.log(111)
	}
	getValue(){
		if(this.state.pass==='yes'){
			return this.state.value;
		}
	}
	render(){
		return(
			<div className='countWrap'>
				<div className='minusAdd' onClick={this.minusHandler}>
					-
				</div>
				<input ref='shoppingInput' value={this.state.value} onBlur={this.blurHandler} onChange={this.changeHandler} className='shoppingInput'/>
				<div className='minusAdd' onClick={this.addHandler}>
					+
				</div>
			</div>
		)
	}
}
export default pureRender(Number);