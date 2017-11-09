import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/fileInput.less';
import fileImg from '../assets/images/register/file.png';
import Axios from 'axios';
class FileInput extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			fileImgCss:{},
			pass:'no',
			describe:this.props.describe,
			describeCss:{}
		}
	this.changeHandler=this.changeHandler.bind(this);
	this.getValue=this.getValue.bind(this);
	}
	componentDidMount(){
		let u = navigator.userAgent;
		if(u.indexOf('android')>-1){
		 document.querySelector('.fileInput').setAttribute('capture','camera');
		}else if(u.indexOf('iPhone')>-1){         
		  document.querySelector('.fileInput').removeAttribute('capture');
		}
	}
	getValue(){
		if(this.state.pass==='yes'){
			return this.state.dataUrl
		}
	}
	changeHandler(event){
		let This=this;
		let wapId=this.props.wapId;
		let imgId=this.props.imgId;
		event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）
		let files=event.target.files;
		let fileInp=this.refs.inp;
		let imgSize = files[0].size / 1024 / 1024;//获取图片大小
		let allowExtention = '.jpg,.jpeg,.png';
		let extention = fileInp.value.substring(fileInp.value.lastIndexOf('.') + 1).toLowerCase();
		if(allowExtention.indexOf(extention)>-1){
			this.setState({
				describe:this.props.describe,
				describeCss:{
					color:'#999999'
				}
			})
			if(imgSize<=6){
				let reader = new FileReader();
				let param = new FormData(); //创建form对象
				let that=this;
				let active=event.target;
			    param.append('files[]',files[0]);//通过append向form对象添加数据
		        //console.log(param.get('files[]')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
//		        let config = {
//			            headers:{'Content-Type':'multipart/form-data'}
//			          };  //添加请求头
//		        Axios.post('http://admin.weifanyun.com/upload/register',param,config);
		        this.setState({
		        	describe:'图片上传中,请稍等.....',
					describeCss:{
						color:'#999999'
					},
					pass:'yes'
		        })
		        Axios.post(bee.link.uploadImg+'/register',param)
				.then(function (response) {
				   	that.setState({
				   		dataUrl:response.data.files[0].url,
				   		describe:'图片上传完成',
						describeCss:{
							color:'#999999'
						},
						pass:'yes'
				   	});
				   	reader.onload = function(e) {
						let img_preview = document.getElementById(imgId);
						let tempDivPreview = document.getElementById(wapId);
						if(img_preview == null) {
							let img = document.createElement('img');
							img.setAttribute('id', imgId);
							img.setAttribute('src', e.target.result);
							tempDivPreview.appendChild(img);
							img.style.width='2.5rem';
							img.style.height='2.5rem';
							This.setState({
								fileImgCss:{
									opacity: 0
								}
							})
						} else {
							tempDivPreview.removeChild(img_preview);
							let img = document.createElement('img');
							img.setAttribute('id', imgId);
							img.setAttribute('src', e.target.result);
							tempDivPreview.appendChild(img);
							img.style.width='2.5rem';
							img.style.height='2.5rem';
							This.setState({
								fileImgCss:{
									opacity: 0
								}
							})
						}
						document.getElementById(imgId).src = e.target.result;
					}
					reader.readAsDataURL(files[0]);
				 });
//					bee.post('/register', param, function (data) {
//						if (data.code) {
//							alert(data.info);
//							return;
//						}
//						console.log(data)
//					},'',true);
					
			}else{
				this.setState({
					describe:'请上传小于6M的图片',
					describeCss:{
						color:'#9e1b1b'
					}
				})
			}
		}else{
			this.setState({
				describe:'请上传格式为.jpg、.jpeg、.png的图片',
				describeCss:{
					color:'#9e1b1b'
				}
			})
		}
	}
	render(){
		let inputName=this.props.name;
		let imgWapCss={
			width:'2.5rem',
			height:'2.5rem',
			position: 'absolute',
	        top: '0.8rem',
	        right: '0',
	        textAlign:'center',
	        lineHeight:'2.5rem'
		}
		return(
			<form  name='file[]' encType="multipart/form-data" className='fileContainer'>
				<span className='fileText'>
					{this.props.promptText}
				</span>
				<input type='file' data-pass={this.state.pass} name='files[]' className='fileInput' onChange={this.changeHandler} ref='inp' />
				<img className='fileImg' style={this.state.fileImgCss} src={fileImg}/>
				<p className='describe' style={this.state.describeCss}>{this.state.describe}</p>
				<div id={this.props.wapId} style={imgWapCss}></div>
				
			</form>
		)
	}
}
export default pureRender(FileInput);