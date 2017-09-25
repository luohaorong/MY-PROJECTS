import React from 'react';
import {Container,Col,Grid,View} from 'amazeui-touch';
import '../assets/styles/myInformation.less';
import {Link} from 'react-router';
import Row from '../components/Row';
import pureRender from 'pure-render-decorator';
class MyInformationPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:{},
			head:{},
			data1:{},
			newImg:{},
			headImages:'',
			myInContainer:''
		}
		this.postState=this.postState.bind(this)
	}
	postState(e){
		let active=e.currentTarget;
		let state=active.getAttribute('data-state');
		bee.cache('orders_states',state);
	}
	componentWillMount(){
		
		const headImages='../assets/images/myinformation/touxiang.png';
		
		const newImg=[
			{
				img:'../assets/images/myinformation/myrecharge.png',
				tit:'充值',
				hrf:'/RechargePage'
			}
			,{
				img:'../assets/images/myinformation/myrecharge-cord.png',
				tit:'充值记录',
				hrf:'/RechargeRecordPage?isRecharge=true'

			}
			,{
				img:'../assets/images/myinformation/parchase-cord.png',
				tit:'消费记录',
				hrf:'/RechargeRecordPage?isRecharge=false'
			}
			,{
				img:'../assets/images/myinformation/my-collection.png',
				tit:'我的收藏',
				hrf:'/RechargeRecordPage'
			}
			,{
				img:'../assets/images/myinformation/my-dingzhi.png',
				tit:'我的定制',
				hrf:'/RechargeRecordPage'
			}
			,{
				img:'../assets/images/myinformation/my-oem.png',
				tit:'我的独家',
				hrf:'/RechargeRecordPage'
			}
			,{
				img:'../assets/images/myinformation/adress.png',
				tit:'地址管理',
				hrf:'/AddressAdminPage'
			}
			,{
				img:'../assets/images/myinformation/service-center.png',
				tit:'服务中心',
				hrf:'/ServiceCenterPage'
			}
			,{
				img:'../assets/images/myinformation/agree-back.png',
				tit:'意见反馈',
				hrf:'/RechargeRecordPage'
			}
			,{
				img:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABTCAYAAAAx4jFYAAAAxklEQVR4nO3QQQ3AIADAQMC/Z8DC+iFL7hQ0nfsafLZeB/yVcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXHRAbIVBKJD8frrAAAAAElFTkSuQmCC',
				tit:"",
				hrf:''
			}
			,{
				img:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABTCAYAAAAx4jFYAAAAxklEQVR4nO3QQQ3AIADAQMC/Z8DC+iFL7hQ0nfsafLZeB/yVcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXHRAbIVBKJD8frrAAAAAElFTkSuQmCC',
				tit:"",
				hrf:''
			}
			,{
				img:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABTCAYAAAAx4jFYAAAAxklEQVR4nO3QQQ3AIADAQMC/Z8DC+iFL7hQ0nfsafLZeB/yVcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXGRcZFxkXHRAbIVBKJD8frrAAAAAElFTkSuQmCC',
				tit:"",
				hrf:''
			}
		];
		
		this.setState({
			
			newImg:newImg,
			headImages:headImages
			
		});
		 var ua = navigator.userAgent.toLowerCase(); 
		    if(ua.match(/iPad/i)=="ipad") { 
		       this.setState({
				myInContainer:'myInContainer'
				});
		    } else { 
		       this.setState({
				myInContainer:''
				});
		    } 
	}
	componentDidMount(){
		bee.pushUrl();
		document.title="个人中心";
		let This=this;
		let token=bee.cache('token');
		bee.post('/wechat/center',{'token':token},function(data) {
			if(data.error_code) {
				alert(data.info);
				return;
			}else{
				This.setState({
					data:data.data
				})
				bee.cache('user_type',data.data.type);
			}
		},true);
	}
	render(){
		
		
		let sData1=this.state.data1;
		let newImg=this.state.newImg;
		return(
			<View>
			<Container scrollable={true}>
				<div className='myInformationTop'>
					
					<div className='myHead'>
						<Link to='/'>
							<img className='myHeadImg' src={this.state.data.avatar!==''?this.state.data.avatar+'/origin':this.state.headImages}/>
						</Link>
					</div>
					<p className='myHeadText'>
						<span className='myHeadTitle'>{this.state.data.real_name}</span>
						<span className='myHeadNum'>{this.state.data.mobile}</span>
					</p>
					<Link className='setInformation' to='/'>
					</Link>
				</div>
				<div className='myOrders'>
					<Link className='myOrdersTop' to='/MyOrdersPage' onClick={this.postState} data-state="">
						<span className='myOrdersTopText'>我的订单</span>
						<span className='myOrdersTopTo'>
							查看全部订单
						</span>
					</Link>
					<Grid className='myOrdersTopContainer' avg={4}>
						<Col className='myOrdersCol' style={this.props.bgImage}>
			            	<Link className='ordersTitle  waitPayImage' onClick={this.postState} to='/MyOrdersPage' data-state="not_payed">
								<div className={this.state.data.not_pay_count===0?'ordersNum2':'ordersNum1'}>{this.state.data.not_pay_count}</div>
				            	<p>待付款</p>
		            		</Link>
			            </Col>
			            <Col className='myOrdersCol' style={this.props.bgImage}>
			            	<Link className='ordersTitle  waitShouImage' to='/MyOrdersPage' onClick={this.postState} data-state="not_receive">
				            	<div className={this.state.data.not_receive===0?'ordersNum2':'ordersNum1'}>{this.state.data.not_receive}</div>
				            	<p>待收货</p>
		            		</Link>
			            </Col>
			            <Col className='myOrdersCol' style={this.props.bgImage}>
			            	<Link className='ordersTitle alreadyImage' to='/MyOrdersPage' onClick={this.postState} data-state="finish">
				            	<p>已完成</p>
		            		</Link>
			            </Col>
			            <Col className='myOrdersCol' style={this.props.bgImage}>
			            	<Link className='ordersTitle  noSuccessImage' to='/MyOrdersPage' onClick={this.postState} data-state="cancel">
				            	<p>未成功</p>
		            		</Link>
			            </Col>
		    		</Grid>
				</div>
				<div className='myOrders'>
					<div className='myOrdersTop'>
						<span className='myOrdersTopText'>我的资金</span>
					</div>
					<Grid className='myMoney' avg={2}>
						<Col className='myMoneyCol'>
							<Link className='myMoneyColTo myMoneyBalance' to='/MyBalancePage'>
								<span className='myMoneyCommon'>余额</span>
								<span className='myMoneyContent'>￥{this.state.data.balance}</span>
							</Link>
						</Col>
						<Col className='myMoneyCol'>
							<Link className='myMoneyColTo myMoneyCoup' to='/index/MyInformationPage'>
								<span className='myMoneyCommon'>样品券</span>
								<span className='myMoneyContent'>0张</span>
							</Link>
						</Col>
						<Col className='myMoneyCol'>
							<Link className='myMoneyColTo myMoneyGold' to='/index/AboutUsPage'>
								<span className='myMoneyCommon'>金币</span>
								<span className='myMoneyContent'>{this.state.data.corns}</span>
							</Link>
						</Col>
						<Col className='myMoneyCol'>
							<Link className='myMoneyColTo myMoneyPoint' to='/index/ServiceCenterPage'>
								<span className='myMoneyCommon myMoneySpecail'>积分</span>
								<span className='myMoneyContent'>{this.state.data.points}</span>
							</Link>
						</Col>
					</Grid>
					
				</div>
				<Row newImg={newImg} avg={4}/>
				<div className={this.state.myInContainer}></div>
				<div style={{height:'3.5rem'}}></div>
			</Container>

			</View>
			
			
			
			)
	}
}
export default pureRender(MyInformationPage);
