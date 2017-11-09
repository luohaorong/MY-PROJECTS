import React from 'react';
import '../assets/styles/registerInput.less';
class RegisterInput extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			value:'',
			redBorder:{},
			inputStyle:{},
			valText:this.props.vText,
			showState:true,
			pass:'no'
		}
	this.changeHandler=this.changeHandler.bind(this);
	this.inpKeyUp=this.inpKeyUp.bind(this);
	this.inpFocus=this.inpFocus.bind(this);
	this.inpBlur=this.inpBlur.bind(this);
	}
	componentDidMount(){
		//以下代码用于向父组件传值      这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
    	let content=this.refs['inp'].value;
		!!this.props.callbackParent&&this.props.callbackParent(content);
		!!this.props.getV&&this.props.getV(content);
		this.props.show==false?this.setState({
			showState:false
		}):this.setState({
			showState:true
		});
		this.setState({
			value:this.props.showFirst
		})
		
	}
	getValue(){
		if(this.state.pass==='yes'){
			return this.state.value.replace(/\s+/g,'');
		}
	}
	inpKeyUp(){
		//以下代码用于向父组件传值      这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
    	let content=this.state.value.replace(/\s+/g,'');
		!!this.props.callbackParent&&this.props.callbackParent(content);
		!!this.props.getV&&this.props.getV(content);
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
		            textAlign:'right'
		          },
		          valText:this.props.vText
		        });
	      	}else{
		      		this.setState({
			          inputStyle:{
			            backgroundColor:'transparent',
			            textAlign:'right'
			          },
			          valText:this.props.vText
			        });
	      		
	      	}
	      }else{
	        this.setState({
	          redBorder:{
	            borderBottom:'1px solid  #999999'
	          },
	          inputStyle:{
	          	border: 0,
	            outline: 'none',
	            backgroundColor: 'transparent',
	            textIndent: '1rem',
	            color: '#333333',
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
		            borderBottom:'1px solid #999999'
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
			            borderBottom:'1px solid #999999'
			          },
			          pass:'yes'
			        });
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
		            borderBottom:'1px solid #999999'
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
		            borderBottom:'1px solid #999999'
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
		            borderBottom:'1px solid #999999'
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
		            borderBottom:'1px solid #999999'
		          },
		          pass:'yes'
		        });
		    }
		    }
		    if(inName=='picture'){
		    	this.setState({
		          pass:'yes'
		        });
		        
		    }
	      }
	}
	inpFocus(){
		if(bee.getQueryString('edit')!=='true'){
			this.setState({
		          valText:'',
		          inputStyle:{
		            outline: 'none',
		            backgroundColor: 'transparent',
		            textIndent: '1rem',
		            color: '#333333',
		            textAlign:'left'
		          }
		        });
		}
	}
	changeHandler(event){
		// 获取输入框的新内容
		let content = event.target.value.replace(/\s+/g,'');
		this.setState({
			value:content
		});
	}
	
	render(){
		let inputType = this.props.type||'text';
	    let inputName = this.props.name;
	    let inputStyle=this.props.inputStyle||this.state.inputStyle;
	    let bgImgStyle=this.props.bgImgStyle||{};
		return(
			<div className='inputContainer' style={this.state.showState==true?this.state.redBorder:this.props.inputWraperStyle}>
				{
					this.state.showState==true?(<span className='promptText' style={bgImgStyle}>
					{this.props.promptText}
				</span>):''
				}
				
				<input onClick={this.props.onClick} disabled = {this.props.disabled || ''} readOnly={this.props.readOnly||''} style={inputStyle}  type={inputType} data-pass={this.state.pass} name={inputName} className='registerInput' value={this.state.value} onKeyUp={this.inpKeyUp} onBlur={this.inpBlur} onFocus={this.inpFocus} onChange={this.changeHandler} placeholder ={this.state.valText} ref='inp' />
			</div>
		)
	}
}
RegisterInput.defaultProps = {
	isnecessary:true
};
export default RegisterInput;