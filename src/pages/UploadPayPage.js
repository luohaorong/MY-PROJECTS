import React from 'react';
import uploadPayPage from '../assets/styles/uploadPayPage.less';
import {Notification,View} from 'amazeui-touch';
import camera from '../assets/images/camera_img.png';
import banner_logo from '../assets/images/banner_break.png';
import Button from '../components/Button';
import Axios from 'axios';
import pureRender from 'pure-render-decorator';
class UploadPayPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			describe:'请上传支付凭证的照片。',
			describeCss:{},
			dataUrl:'',
			pass:'no',
			visible : false,
			errorContent:'请先上传正确格式支付凭证'
		}
		this.changeHandler=this.changeHandler.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
		this.postFile = this.postFile.bind(this);
	}
	componentDidMount(){
		bee.pushUrl();
		document.title="上传支付凭证";
		let u = navigator.userAgent;
		if(u.indexOf('android')>-1){
		 document.querySelector('.uploadInput').setAttribute('capture','camera');
		}else if(u.indexOf('iPhone')>-1){         
		  document.querySelector('.uploadInput').removeAttribute('capture');
		}
	}
	// 打开对话框
    openNotification() {
	    this.setState({
	      visible: true
	    });
    }
	
	// 关闭对话框
	closeNotification() {
	    // 判断是否需要清除定时器
	    if(this.state.timeId){
	    	clearTimeout(this.state.timeId);
	    }
	    
	    this.setState({
	      visible: false,
	      timeId : null
	    });
	    
	}
	changeHandler(event){
		let This = this;
		event.preventDefault();
		let files = event.target.files;
		let fileInp = this.refs.inp;
		let imgSize = files[0].size / 1024 / 1024;
		let allowExtention = '.jpg,.jpeg,.png';
		let extention = fileInp.value.substring(fileInp.value.lastIndexOf('.') + 1).toLowerCase();
		if(allowExtention.indexOf(extention)>-1){
			this.setState({
				describe:'请上传支付凭证的照片。',
				describeCss:{
					color:'#999999'
				}
			});
			if(imgSize<=6){
				let reader = new FileReader();
				let param = new FormData();
				let that=this;
				let active=event.target;
				param.append('files[]',files[0]);
				this.setState({
		        	describe:'图片上传中,请稍等.....',
					describeCss:{
						color:'#999999'
					},
					pass:'yes'
		        });
		         Axios.post(bee.link.uploadImg+'/register',param)
		         .then(function(response){
		         	that.setState({
				   		dataUrl:response.data.files[0].url,
				   		describe:'图片上传完成',
						describeCss:{
							color:'#999999'
						},
						pass:'yes'
				   	});
		         	reader.onload = function(e){
		         		let img_preview = document.getElementById('previewImg');
		         		img_preview.setAttribute('src',e.target.result);
		         		document.getElementById('previewImg').src = e.target.result;
		         	}
		         	reader.readAsDataURL(files[0]);
		         })
			}else{
				this.setState({
					describe:'请上传小于6M的图片',
					describeCss:{
						color:'#9e1b1b'
					},
					pass:'no'
				})
			}
		}else{
			this.setState({
				describe:'请上传格式为.jpg、.jpeg、.png的图片',
				describeCss:{
					color:'#9e1b1b'
				},
				pass:'no'
			})
		}
	}
	postFile(){
		let This = this;
		let uuid =bee.getQueryString('uuid');
		if (this.state.pass==='yes') {
			bee.post('/wechat/upload/payment',{
				'uuid':uuid,
				'certificate_img':this.state.dataUrl
			},function(data){
				if (data.error_code) {
					This.openNotification();
					//  callback
					var timeId = setTimeout(This.closeNotification,3000);
					This.setState({
						timeId : timeId,
						errorContent:data.msg
					});
				}else{
					This.context.router.push('/MyOrdersPage');
				}
			},true);
		}else{
			This.openNotification();
			//  callback
			var timeId = setTimeout(This.closeNotification,3000);
			This.setState({
				timeId : timeId,
				errorContent:'请先上传正确格式支付凭证'
			});
		}
	}
	render(){
		let submitBtn={
			width:'100%',
			height:'3rem',
			borderRadius:0,
			marginTop:0
		}
		let order_sn=bee.getQueryString('order_sn');

		return(
				<View className="uploadContainer">
				 <Notification
				          title="荟酒国际提示"
				          amStyle='alert'
				          visible={this.state.visible}
				          animated
				          onDismiss={this.closeNotification}
				        >
				          {this.state.errorContent}
			        </Notification>
					<div className="uploadTop">
						<span>订单号：</span>
						<span>{order_sn}</span>
					</div>
					<form className='uploadFileContainer' name='file[]' encType="multipart/form-data" >
						<div className="uploadFileTop">
							<span className="uploadText">支付凭证（点击上传）</span>
							<span className="uploadDis" style={this.state.describeCss}>{this.state.describe}</span>
							<input type="file" accept="image/*" capture="camera" data-pass="no" name='files[]' className='uploadInput' onChange={this.changeHandler} ref='inp' />
							<img src={camera} className="uploadInputImg" />
						</div>
						<p className="yulan">预览：</p>
						<img id='previewImg' className="previewImg" src={banner_logo}/>
						
					</form>
					<Button onClick={this.postFile} btnStyle={submitBtn} content='上传' />
				</View>
			)
	}
}
UploadPayPage.contextTypes={
	router: React.PropTypes.object.isRequired
}
export default pureRender(UploadPayPage);