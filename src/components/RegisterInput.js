import React from 'react';
import '../assets/styles/registerInput.less';
class RegisterInput extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			value:this.props.value,
			redBorder:{},
			inputStyle:{},
			valText:this.props.vText,
			pass:'no'
		}
	this.changeHandler=this.changeHandler.bind(this);
	this.inpBlur=this.inpBlur.bind(this);
	this.inpFocus=this.inpFocus.bind(this);
	}
	
	getValue(){
			return this.state.value;
	}
	inpBlur(){
		let checkphone = /^1[34578]\d{9}$/;
	    let checkpwd = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
	    let checkemail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	    let userName = /^[a-zA-Z][a-zA-Z\u4E00-\u9FA5]{5,17}$/;
	    let myage = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
	    let userId=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
	    let myInput = this.refs.inp;
	    let inputVal =myInput.value;
	    let inName = myInput.name;
	    let isNecessary=this.props.isnecessary;//判断是否为必填项
	      if(inputVal===''){
	      	if(isNecessary){
		      	this.setState({
		          redBorder:{
		            borderBottom:'1px solid  #ea0000'
		          },
		          inputStyle:{
		            backgroundColor:'transparent',
		            textAlign:'right',
		            color:'#ffffff'
		          },
		          valText:this.props.vText
		        });
	      	}else{
	      		this.setState({
		          inputStyle:{
		            backgroundColor:'transparent',
		            textAlign:'right',
		            color:'#ffffff'
		          },
		          valText:this.props.vText
		        });
	      	}
	      }else{
	        this.setState({
	          redBorder:{
	            borderBottom:'1px solid #ffc6b2'
	          },
	          inputStyle:{
	          	border: 0,
	            outline: 'none',
	            backgroundColor: 'transparent',
	            textIndent: '1rem',
	            color:'#ffffff',
	            textAlign: 'right'
	          },
	          	pass:'yes'
	        });
		      if (inName=='userId') {
		      if (!(userId.test(inputVal))) {
		      	if(isNecessary){
			        this.setState({
			          redBorder:{
			            borderBottom:'1px solid #ea0000'
			          },
			          pass:'no'
			        });
		      	}
		      }else{
		    	this.setState({
		          redBorder:{
		            borderBottom:'1px solid #ffc6b2'
		          },
		          pass:'yes'
		        });
		    }
		    }
		    if (inName=='phone') {
		      if (!(checkphone.test(inputVal))) {
		      	if(isNecessary){
			        this.setState({
			          redBorder:{
			            borderBottom:'1px solid #ea0000'
			          },
			          pass:'no'
			        });
		      	}
		      }else{
		    	this.setState({
		          redBorder:{
		            borderBottom:'1px solid #ffc6b2'
		          },
		          pass:'yes'
		        });
			        //以下代码用于向父组件传值      这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
		    	let content=this.state.value;
				this.props.callbackParent(content);
		    }
		    }
		    if (inName=='age') {
		      if (!(myage.test(inputVal))) {
		      	if(isNecessary){
			        this.setState({
			          redBorder:{
			            borderBottom:'1px solid #ea0000'
			          },
			          pass:'no'
			        });
		      	}
		      }else{
		    	this.setState({
		          redBorder:{
		            borderBottom:'1px solid #ffc6b2'
		          },
		          pass:'yes'
		        });
		    }
		    }
		    if (inName=='password') {
		      if (!(checkpwd.test(inputVal))) {
		      	if(isNecessary){
			        this.setState({
			          redBorder:{
			            borderBottom:'1px solid #ea0000'
			          },
			          pass:'no'
			        });
		      	}
		      }else{
		    	this.setState({
		          redBorder:{
		            borderBottom:'1px solid #ffc6b2'
		          },
		          pass:'yes'
		        });
		    }
		
		    }
		    if (inName=='email') {
		      if (!(checkemail.test(inputVal))) {
		      	if(isNecessary){
			        this.setState({
			          redBorder:{
			            borderBottom:'1px solid #ea0000'
			          },
			          pass:'no'
			        });
		      	}
		      }else{
		    	this.setState({
		          redBorder:{
		            borderBottom:'1px solid #ffc6b2'
		          },
		          pass:'yes'
		        });
		    }
		    }
		    if (inName=='username') {
		      if (!(userName.test(inputVal))) {
		      	if(isNecessary){
			        this.setState({
			          redBorder:{
			            borderBottom:'1px solid #ea0000'
			          },
			          pass:'no'
			        });
		      	}
		      }else{
		    	this.setState({
		          redBorder:{
		            borderBottom:'1px solid #ffc6b2'
		          },
		          pass:'yes'
		        });
		    }
		    }
	      }
	}
	inpFocus(){
		this.setState({
	          valText:'',
	          inputStyle:{
	            outline: 'none',
	            backgroundColor: 'transparent',
	            textIndent: '1rem',
	            color:'#ffffff',
	            textAlign:'left'
	          }
	        });
	}
	changeHandler(event){
		// 获取输入框的新内容
		let content = event.target.value;
		this.setState({
			value:content
		});
	}
	
	render(){
		let inputType = this.props.type||'text';
	    let inputName = this.props.name||'';
	    let inputStyle=this.props.inputStyle||this.state.inputStyle;
	    let bgImgStyle=this.props.bgImgStyle||{};
		return(
			<div className='inputContainer'>
				<span className='promptText' style={bgImgStyle}>
					{this.props.promptText}
				</span>
				<input onClick={this.props.onClick} style={inputStyle}  type={inputType} data-pass={this.state.pass} name={inputName} className='registerInput' value={this.state.value||''} onBlur={this.inpBlur} onFocus={this.inpFocus} onChange={this.changeHandler} placeholder ={this.state.valText} ref='inp' />
			</div>
		)
	}
}
RegisterInput.defaultProps = {
	isnecessary:true
};
export default RegisterInput;