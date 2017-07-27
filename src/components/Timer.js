import React from 'react';
import pureRender from 'pure-render-decorator';
import { Calendar } from 'react-date-range';
import moment from 'moment';
import '../assets/styles/timer.less';
class Timer extends React.Component{
	constructor(props, context) {
    super(props, context);

    this.state = {
      'datePicker' : '',
      'calendarStyle':'',
      'imgStyle':{}
    }
    this.clickHandle=this.clickHandle.bind(this);
 }
	componentWillMount(){
		moment.locale('zh-cn');
		moment().format('L');
	}
  handleChange(which, payload) {
    this.setState({
      [which] : payload
    });
  	this.setState({
  		calendarStyle:{
  			display:'none'
  		},
  		imgStyle:{
  			transform:'rotate(0deg)',
  			transition:'transform 0.5s'
  		}
  	});
  	
  	
  }
  
  clickHandle(event){
  	let active=event.currentTarget;
  	let activeParents=active.parentNode;
//	let activeClid=active.childNodes.item(2);
	activeParents.className='Picker active';
  	this.setState({
  		calendarStyle:{
  			display:'block'
  		},
  		imgStyle:{
  			transform:'rotate(-90deg)',
  			transition:'transform 0.5s'
  		}
  		
  	})
  	
  }
  getValue(){
  	let inputVal=this.refs.inputVal;
  	return inputVal.value;
  }
	render(){
		const {datePicker} = this.state;
    	const format = 'YYYY-MM-D';
    	
		return(
				<div title='Date Picker' className='Picker' ref='Picker' >
		          <div style={this.props.inputWrapStyle} className='inputWrapStyle'  onClick={this.clickHandle}>
		          	<span className='timerTitle'>
		          		{this.props.timerTitle}
		          	</span>
		            <input
		              ref='inputVal'
		              className='inputStyle'
		              style={this.props.inputStyle}
		              type='text'
		              readOnly
		              value={ datePicker && datePicker.format(format).toString() }
		            />
		            <img style={this.state.imgStyle} className='imgStyle' src='../assets/images/searchDetail/jiantou.png'/>
		          </div>
		          <Calendar
		            date={ now => { return now.add(0, 'days') } }
		            onInit={ this.handleChange.bind(this, 'datePicker') }
		            onChange={ this.handleChange.bind(this, 'datePicker') }
		            lang='cn'
		            style={this.state.calendarStyle}
		            
		          />
        	</div>
			)
	}
}
export default pureRender(Timer);