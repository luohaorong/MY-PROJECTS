import React from 'react';
import {Link} from 'react-router';
import Header from '../components/Header';
import Button from '../components/Button';
import RegionalLinkage from '../components/RegionalLinkage';
import '../assets/styles/soleAgencyDetailsPage.less';
import {
	Container,
	View,
	Notification,
	Card
} from 'amazeui-touch';
import Axios from 'axios';
import pureRender from 'pure-render-decorator';
class SoleAgencyDetailsPage extends React.Component {
	constructor(props){
		super(props);
		this.state={
			 isModalOpen: false,
			 regionalTime:'一年',
			 isDisplay:{
			 	display:'none'
			 },
			 visible : false,
			errorContent:{}
		};
		this.clickHeadler=this.clickHeadler.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
	}
	//打开模态框
	 openModal() {
    this.setState({
      isModalOpen: true
    })
  }
//关闭模态框
  closeModal() {
    this.setState({
      isModalOpen: false
    });
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
  //获取FileInput组件的图片内容
	getValue(key){
		return this.refs[key].getValue();
	}
  clickHeadler(){
	let mainRegion=this.getValue('agencyArea');
	let warehouse=this.getValue('warehouse');
	let agencyTime=this.getValue('agencyTime');
	let This=this;
	console.log(mainRegion,warehouse,agencyTime)
	if(mainRegion&&warehouse&&agencyTime){
		Axios.post('/agency',{
			mainRegion:mainRegion,
			warehouse:warehouse,
			agencyTime:agencyTime
		})
		.then(function(response){
			console.log(response);
		})
		.catch(function(error){
			// 如果失败，提示！！
			This.openNotification();
			//  callback
			var timeId = setTimeout(This.closeNotification,3000);
			This.setState({
				timeId : timeId,
				errorContent:error,
				isDisplay:{
			 	display:'block'
			 }
			});
		})
	}else{
		// 如果失败，提示！！
			This.openNotification();
			//  callback
			var timeId = setTimeout(This.closeNotification,3000);
			This.setState({
				timeId : timeId,
				errorContent:{
					Error:'请完善必填信息'
				}
			});
	}
  }
	render(){
		let isText={
			display:'none'
		}
		let submitBtn={
			width:'100%',
			height:'3rem',
			borderRadius:0,
			marginTop:0
		}
		const header = (
			  <Card.Child cover="http://lorempixel.com/1000/625/people/">
			  </Card.Child>
			);
		let proviceData=[{name:'四川省'},{name:'江苏省'},{name:'海南省'},{name:'浙江省'}];
		let Wdata=[{name:'宁波仓'},{name:'上海仓'},{name:'广州仓'},{name:'成都仓'}];
		let timeData=[{name:'三个月'},{name:'半年'},{name:'一年'}];
		return(
			<View className='soleAgencyDetails'>
						<Notification
				          title="荟酒国际提示"
				          amStyle='alert'
				          visible={this.state.visible}
				          animated
				          onDismiss={this.closeNotification}
				        >
				          {this.state.errorContent.Error}
			        </Notification>
				<Header middleTop={true} MiddleTextTop='独家代理' isText={isText}/>
				<Container scrollable={true}>
					<Container>
						<Card header={header}>
							<p className='productNameCh'>VDM干红</p>
							<p className='productNameEn'>VDM干红</p>
							<p className='productPrice'>￥25.00/瓶</p>
				        </Card>
				        <section>
				        	<RegionalLinkage type='regional' data={proviceData} promptText='独家地区' name='agencyArea' vText='请选择   >' ref='agencyArea'/>
				        	<RegionalLinkage type='warehouse' data={Wdata} promptText='发货仓库' name='warehouse' vText='请选择   >' ref='warehouse'/>
				        	<RegionalLinkage type='time' data={timeData} promptText='独家时长' name='agencyTime' vText='请选择   >' ref='agencyTime'/>
				        </section>
					</Container>
					<div className='regionalOutLayer' style={this.state.isDisplay}>
						<div className='regionalBox'>
							<p className='regionalText'>
							您该款酒的独家代理已生效，有效期为
							<span>{this.state.regionalTime}</span>
							，您现在可以：
							</p>
							<ul className='listBtn'>
								<li className='countinue'><Link to='/'>继续浏览商品</Link></li>
								<li className='lookOrder'><Link to='/'>查看此订单</Link></li>
							</ul>
						</div>
					</div>
					<Button btnStyle={submitBtn} content='马上成为独家代理' onClick={this.clickHeadler}/>
				</Container>
			</View>
		)
	}
}
export default pureRender(SoleAgencyDetailsPage);