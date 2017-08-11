import React from 'react';
import '../assets/styles/number.less';
import pureRender from 'pure-render-decorator';
class Number extends React.Component{
	constructor(props){
		super(props);
		this.state={
			value:0
		};
		this.changeHandler=this.changeHandler.bind(this);
		this.blurHandler=this.blurHandler.bind(this);
		this.minusHandler=this.minusHandler.bind(this);
		this.addHandler=this.addHandler.bind(this);
	}
	componentWillMount(){
		this.setState({
			value:this.props.dataNum
		});
	}
	changeHandler(event){
		let count=event.target.value;
		this.setState({
			value:count.replace(/[^\d]/g,'')
		})
	}
	blurHandler(){
		this.props.valueData(+this.state.value,this.props.moq,this.props.stock,this.props.uuid,this.props.index);
	}
	addHandler(){
		let num=this.state.value;
		num++;
		this.setState({
			value:num
		});
		let countNum=this.state.value+1;
		this.props.valueData(countNum,this.props.moq,this.props.stock,this.props.uuid,this.props.index);
	}
	minusHandler(){
		let num=this.state.value;
		num--;
		if(num<=0){
			num=0
		}
		this.setState({
			value:num
		});
		let countNum=this.state.value-1;
		this.props.valueData(countNum,this.props.moq,this.props.stock,this.props.uuid,this.props.index);
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