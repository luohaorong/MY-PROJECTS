import React from 'react';
import shareBanner from '../assets/images/myinformation/share_banner.png';
import shareFace from '../assets/images/myinformation/share_face.png';
import shareFriend from '../assets/images/myinformation/share_friend.png';
import shareRight from '../assets/images/myinformation/share_right.png';
import mySharePage from '../assets/styles/mySharePage.less';
import {Container,Notification,View} from 'amazeui-touch';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
class MySharePage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			myshareData:{},
			layerStyle:{
				display:'none'
			},
			shareRightStyle:{
				display:'none'
			},
			qrcode:'',
			visible : false,
			errorContent:''
		}
		this.faceClick = this.faceClick.bind(this);//面对面邀请
		this.layerClick = this.layerClick.bind(this);//关闭二维码
		this.rightClick = this.rightClick.bind(this);//打开分享遮罩
		this.offClick = this.offClick.bind(this);//关闭分享遮罩
		this.closeNotification = this.closeNotification.bind(this);
	}
	componentDidMount(){
		document.title='我的分享';
		let This = this;
		let url =window.location.href;
		//let url = 'http://www.zongjiuhui.com/share/VIQPWO/register';
		bee.post('/wechat/share/code',{
			'url':url
		},function(data){
			if (data.error_code===0) {
				This.setState({
					qrcode:data.data.data.qrcode
				});
				wx.config({
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: data.data.config.appId, // 必填，公众号的唯一标识
				    timestamp:data.data.config.timestamp , // 必填，生成签名的时间戳
				    nonceStr: data.data.config.nonceStr, // 必填，生成签名的随机串
				    signature: data.data.config.signature,// 必填，签名，见附录1
				    jsApiList: data.data.config.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				//分享朋友圈
				wx.onMenuShareTimeline({
				    title: data.data.data.share_title, // 分享标题
				    link: data.data.data.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				    imgUrl: data.data.data.share_thumb, // 分享图标
				    desc:data.data.data.share_description, //描述
				    success: function () { 
				       This.openNotification();
						//  callback
						var timeId = setTimeout(This.closeNotification,3000);
						This.setState({
							timeId : timeId,
							errorContent:'已分享成功！'
						});
				        This.offClick();
				    },
				    cancel: function () { 
				    	 This.openNotification();
						//  callback
						var timeId = setTimeout(This.closeNotification,3000);
						This.setState({
							timeId : timeId,
							errorContent:'已取消分享！'
						});
				        This.offClick();
				    }
				});
				//分享给微信好友
				wx.onMenuShareAppMessage({
				   	title: data.data.data.share_title, // 分享标题
				    link: data.data.data.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				    imgUrl: data.data.data.share_thumb, // 分享图标
				    desc:data.data.data.share_description, //描述
				    type: '', // 分享类型,music、video或link，不填默认为link
				    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				    success: function () { 
				        This.openNotification();
						//  callback
						var timeId = setTimeout(This.closeNotification,3000);
						This.setState({
							timeId : timeId,
							errorContent:'已分享成功！'
						});
				        This.offClick();
				    },
				    cancel: function () { 
				        This.openNotification();
						//  callback
						var timeId = setTimeout(This.closeNotification,3000);
						This.setState({
							timeId : timeId,
							errorContent:'已取消分享！'
						});
				        This.offClick();
				    }
				});
				//分享给qq好友
				wx.onMenuShareQQ({
				   	title: data.data.data.share_title, // 分享标题
				    link: data.data.data.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				    imgUrl: data.data.data.share_thumb, // 分享图标
				    desc:data.data.data.share_description, //描述
				    success: function () { 
				      This.openNotification();
						//  callback
						var timeId = setTimeout(This.closeNotification,3000);
						This.setState({
							timeId : timeId,
							errorContent:'已分享成功！'
						});
				        This.offClick();
				    },
				    cancel: function () { 
				       This.openNotification();
						//  callback
						var timeId = setTimeout(This.closeNotification,3000);
						This.setState({
							timeId : timeId,
							errorContent:'已取消分享！'
						});
				        This.offClick();
				    }
				});
				//分享给腾讯微博
				wx.onMenuShareWeibo({
				    title: data.data.data.share_title, // 分享标题
				    link: data.data.data.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				    imgUrl: data.data.data.share_thumb, // 分享图标
				    desc:data.data.data.share_description, //描述
				    success: function () { 
				      This.openNotification();
						//  callback
						var timeId = setTimeout(This.closeNotification,3000);
						This.setState({
							timeId : timeId,
							errorContent:'已分享成功！'
						});
				        This.offClick();
				    },
				    cancel: function () { 
				       This.openNotification();
						//  callback
						var timeId = setTimeout(This.closeNotification,3000);
						This.setState({
							timeId : timeId,
							errorContent:'已取消分享！'
						});
				        This.offClick();
				    }
				});
			}else{
				alert(data.msg);
				This.context.router.push('/index/MyInformationPage');
			}
		},true);
		bee.post('/wechat/share/result',{},function(data){
			if (data.error_code===0) {
				This.setState({
					myshareData:data.data
				});
			}
		},true);
		

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
	//点击面对面邀请
	faceClick(){
		let This = this;
		let layerStyle={
			display:'block'
		}
		This.setState({
					layerStyle:layerStyle
					
				});
		
	}
	//点击二维码遮层
	layerClick(){
		let layerStyle = {
			display:'none'
		}
		this.setState({
			layerStyle:layerStyle
		})
	}
	//打开右上角遮罩
	rightClick(){
		let shareRightStyle = {
			display:'block'
		}
		this.setState({
			shareRightStyle:shareRightStyle
		})
	}
	//关闭右上角遮罩
	offClick(){
		let shareRightStyle = {
			display:'none'
		};
		this.setState({
			shareRightStyle:shareRightStyle
		})
	}
	render(){
		let myshareData = this.state.myshareData;
		return(
			<View>
				<Notification
				          title="荟酒国际提示"
				          amStyle='alert'
				          visible={this.state.visible}
				          animated
				          onDismiss={this.closeNotification}
				        >
				          {this.state.errorContent}
			        </Notification>
				<Container scrollable={true} className="myShareContainer">
					<div className="myShareHead">
						<img src={shareBanner}/>
					</div>
					<div className="myShareMiddle">
						<div className="myShareMiddleContent" onClick={this.faceClick}>
							<img src={shareFace} />
							<p className="middleWords">面对面邀请</p>
						</div>
						<div className="myShareMiddleContent" onClick={this.rightClick}>
							<img src={shareFriend} />
							<p className="middleWords">分享给好友</p>
						</div>
					</div>
					<Link className="myShareLink" to='/MyShareDetailPage'>
						<div className="myShareLinkLeft">
							<p>已赚取金币<span>{myshareData.coins || 0}</span>个</p>
							<p>成功邀请<span>{myshareData.count || 0}</span>人,已有<span>{myshareData.buy_count}</span>人购买</p>
						</div>
						<div className="myShareLinkRight">
							点击领取
						</div>
					</Link>
					<div className="shareLayer" style={this.state.layerStyle} onClick={this.layerClick}>
						<div className="shareLayerContainer">
							<img className="shareCodeImg" src={'data:image/png;base64,'+this.state.qrcode} />
							<p>扫一扫注册荟酒网</p>
							<p>立得荟酒券</p>
						</div>
					</div>
					<div className="shareRight" onClick={this.offClick} style={this.state.shareRightStyle}>
						<img className="shareRightImg" src={shareRight} />
					</div>
				</Container>
			</View>
			)
	}
}
MySharePage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(MySharePage);