import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/fromInput.less';
class FormInput extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			value:'',
			redBorder:{},
			pass:'no'
		}
	this.changeHandler=this.changeHandler.bind(this);
	this.inpBlur=this.inpBlur.bind(this);
	this.inpFocus=this.inpFocus.bind(this);
	}
	getValue(){
		if(this.state.pass==='yes'){
			return this.state.value;
		}
	}
	inpBlur(){
		let checkphone = /^1[34578]\d{9}$/;
	    let checkpwd = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
	    let checkemail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	    let userName = /^[a-zA-Z][a-zA-Z\u4E00-\u9FA5]{5,17}$/;
	    let myage = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
	    let myInput = this.refs.inp;
	    let inputVal =myInput.value;
	    let inName = myInput.name;
	    if (inName=='phone') {
	      if (!(checkphone.test(inputVal))) {
	        this.setState({
	          redBorder:{
	            border:'1px solid #ea0000'
	          },
	          pass:'no'
	        });
	      }else{
	    	this.setState({
	          redBorder:{
	            border:'1px solid #999999'
	          },
	          pass:'yes'
	        });
	    }
	    }
	    if (inName=='age') {
	      if (!(myage.test(inputVal))) {
	        this.setState({
	          redBorder:{
	            border:'1px solid #ea0000'
	          },
	          pass:'no'
	        });
	      }else{
	    	this.setState({
	          redBorder:{
	            border:'1px solid #999999'
	          },
	          pass:'yes'
	        });
	    }
	    }
	    if (inName=='password') {
	      if (!(checkpwd.test(inputVal))) {
	        this.setState({
	          redBorder:{
	            border:'1px solid #ea0000'
	          },
	          pass:'no'
	        });
	      }else{
	    	this.setState({
	          redBorder:{
	            border:'1px solid #999999'
	          },
	          pass:'yes'
	        });
	    }
	
	    }
	    if (inName=='email') {
	      if (!(checkemail.test(inputVal))) {
	        this.setState({
	          redBorder:{
	            border:'1px solid #ea0000'
	          },
	          pass:'no'
	        });
	      }else{
	    	this.setState({
	          redBorder:{
	            border:'1px solid #999999'
	          },
	          pass:'yes'
	        });
	    }
	    }
	    if (inName=='username') {
	      if (!(userName.test(inputVal))) {
	        this.setState({
	          redBorder:{
	            border:'1px solid #ea0000'
	          },
	          pass:'no'
	        });
	      }else{
	    	this.setState({
	          redBorder:{
	            border:'1px solid #999999'
	          },
	          pass:'yes'
	        });
	    }
	    }
	}
	inpFocus(){
		this.setState({
	          redBorder:{
	            border:'1px solid #999999'
	          }
	        });
	}
	changeHandler(event){
		// 获取输入框的新内容
		var content = event.target.value;
		this.setState({
			value:content
		})
	}
	
	render(){
		let inputType = this.props.type||'text';
	    let valText = this.props.vText;
	    let inputName = this.props.name;
	    let inputScr=this.props.inputScr
		return(
			<div className='loginFormContainer' style={this.state.redBorder}>
				<div className='icoWap'>
			 	<img className='loginIco' src={inputScr}/>
				</div>
				<input type={inputType} data-pass={this.state.pass} name={inputName} className='loginInput' value={this.state.value} onBlur={this.inpBlur} onFocus={this.inpFocus} onChange={this.changeHandler} placeholder ={valText} ref='inp' />
			</div>
			
		)
	}
}
 FormInput.propTypes = {
        inputScr:React.PropTypes.string.isRequired
};

export default pureRender(FormInput);