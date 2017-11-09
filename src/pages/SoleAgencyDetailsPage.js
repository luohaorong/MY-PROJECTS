import React from 'react';
import {Link} from 'react-router';
import Header from '../components/Header';
import Button from '../components/Button';
import ExclusiveInput from '../components/ExclusiveInput';
import Number from '../components/Number';
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
			 visible : false,
			 excluFirst:'',
			 timeFirst:'',
			 stationStock:'',
			promptError:'',
			resultInfo:{},
			exclusiveImage:{},
			area_uuid:'',
			exclusiveTime:'',
			station_uuid:'',
			station_post_uuid:'',
			exclusiveData:[],
			timeData:[],
			exclusiveResult:[],
			bottleNum:0
		};
		this.clickHeadler=this.clickHeadler.bind(this);//点击代理
		this.closeNotification = this.closeNotification.bind(this);
		this.upData=this.upData.bind(this);//拼接uuid
		this.valueData=this.valueData.bind(this);//返回数量
		this.changeClick1 = this.changeClick1.bind(this);//点击切换地区
		this.changeClick2 = this.changeClick2.bind(this);//点击切换独家时长
	}
	componentDidMount(){
		bee.pushUrl();
		let This = this;
		let uuid = bee.cache('exclusive_uuid');
		document.title='独家代理';
		bee.post('/wechat/exclusives',{
			'uuid':uuid
		},function(data){
			if (data.error_code==0) {
				let exclusiveStation=data.data.station[0];
				let station_uuid=exclusiveStation.uuid;//第一个仓库
				let station_post_uuid = exclusiveStation.station_uuid;
				let stock = exclusiveStation.stock;
				let exclusiveArea=data.data.members_areas[0];
				let area_uuid = exclusiveArea.area.uuid;//第一地区
				let exclusiveTime = data.data.time[0];//第一个独家时长
				let resultInfo;
				resultInfo=This.upData(station_uuid,exclusiveTime,area_uuid,data.data.exclusive_data);//初始数据
				let bottleNum = resultInfo.moq;
				let exclusiveArr=[];
				let timeData=[];
				data.data.members_areas.map(function(item,i){
					exclusiveArr.push({'name':item.area.name,'uuid':item.area.uuid});
					
				});
				let excluFirst='';
				exclusiveArr.map(function(item,i){
					if (i===0) {
						excluFirst=item.name
					}
				})
				data.data.time.map(function(item,i){
					let time = '';
					if (item=='quarter') {
						time='一季度';
					}
					if (item=='year') {
						time='一年';
					}
					if (item=='half') {
						time='半年';
					}
					timeData.push({'name':time,'uuid':item});
				});
				let timeFirst='';
				timeData.map(function(item,i){
					if (i===0) {
						timeFirst=item.name
					}
				})
				This.setState({
					excluFirst:excluFirst,
					timeFirst:timeFirst,
					stationStock:stock,
					bottleNum:bottleNum,
					exclusiveImage:data.data.goods,
					exclusiveData:exclusiveArr,
					timeData:timeData,
					area_uuid:area_uuid,
					exclusiveTime:exclusiveTime,
					station_uuid:station_uuid,
					station_post_uuid:station_post_uuid,
					exclusiveResult:data.data.exclusive_data,
					resultInfo:resultInfo//初始拼接结果
				})
				
				
			}
		},true);

	}
	//返回地区uuid
	changeClick1(uuid){
		let resultInfo = this.upData(this.state.station_uuid,this.state.exclusiveTime,uuid,this.state.exclusiveResult);
		this.setState({
			area_uuid:uuid,
			resultInfo:resultInfo
		});

	}
	//返回时长uuid
	changeClick2(uuid){
		let resultInfo=this.upData(this.state.station_uuid,uuid,this.state.area_uuid,this.state.exclusiveResult);
		this.setState({
			exclusiveTime:uuid,
			resultInfo:resultInfo
		})
	}
	//拼接uuid找结果
	upData(stationUuid,time,areaUuid,resultData){
		let resultUuid1;
		let resultUuid2;
		let resultIfo;
		resultUuid1=stationUuid+'_'+time+'_'+areaUuid;
		resultUuid2=areaUuid+'_'+time+'_'+stationUuid;
		resultData&&resultData.map(function(item){
			if(item.search_key === resultUuid1||item.search_key===resultUuid2){
				resultIfo=item.exclusive;
			}
		},this);
		return resultIfo;
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
    //返回数量num
	valueData(data){
		let moq= +this.state.resultInfo.moq;//起订量
		let stock= +this.state.stationStock;//库存量
		this.setState({
			bottleNum:data<=0?0:data
		});
		if(data<moq){
			let Error='商品购买量不能低于起订量（'+moq+'箱）';
			// 如果失败，提示！！
			this.openNotification();
			//  callback
			let timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				promptError:Error,
				isSubmit:false
			});
		}
		if(data>stock){
			let Error='商品购买量不能高于库存量';
			// 如果失败，提示！！
			this.openNotification();
			//  callback
			let timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				promptError:Error,
				isSubmit:false
			});
		}
		if(data>=moq&&data<=stock){
			this.setState({
				isSubmit:true
			});
		}
	}
  clickHeadler(){
	
	let This=this;
	let num = +this.state.bottleNum;
	let moq= +this.state.resultInfo.moq;//起订量
	let stock= +this.state.stationStock;//库存量
	if(num<moq){
			let Error='商品购买量不能低于起订量（'+moq+'箱）';
			// 如果失败，提示！！
			this.openNotification();
			//  callback
			let timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				promptError:Error,
				isSubmit:false
			});
		}
	if(num>stock){
		let Error='商品购买量不能高于库存量';
		// 如果失败，提示！！
		this.openNotification();
		//  callback
		let timeId = setTimeout(this.closeNotification,3000);
		this.setState({
			timeId : timeId,
			promptError:Error,
			isSubmit:false
		});
	}
	if(num>=moq&&num<=stock){
		bee.post('/wechat/carts/add',{
			'goods_extends_uuid':this.state.resultInfo.goods_extends_uuid,
			'goods_num':num,
			'station_uuid':this.state.station_post_uuid,
			'activity_type':'exclusive',
			'exclusive_uuid':this.state.resultInfo.uuid,
		},function(data){
			if (data.error_code==0) {
				This.context.router.push('/index/ShoppingCarPage');
			}else{
				This.openNotification();
				var timeId = setTimeout(This.closeNotification,3000);
				This.setState({
					timeId : timeId,
					errorContent:data.msg
				});
			}
		},true);
	}
	// .then(function(response){
	// 	console.log(response);
	// })
	// .catch(function(error){
	// 	// 如果失败，提示！！
	// 	This.openNotification();
	// 	//  callback
	// 	
	// })
	
	
		// // 如果失败，提示！！
		// 	This.openNotification();
		// 	//  callback
		// 	var timeId = setTimeout(This.closeNotification,3000);
		// 	This.setState({
		// 		timeId : timeId,
		// 		errorContent:{
		// 			Error:'请完善必填信息'
		// 		}
		// 	});
	
  }
	render(){
		let submitBtn={
			width:'100%',
			height:'3rem',
			borderRadius:0,
			marginTop:'1rem'
		}
		const header = (
			  <Card.Child cover={bee.image(this.state.exclusiveImage.image,280,400)}>
			  </Card.Child>
			);
		return(
			<View className='soleAgencyDetails'>
						<Notification
				          title="荟酒国际提示"
				          amStyle='alert'
				          visible={this.state.visible}
				          animated
				          onDismiss={this.closeNotification}
				        >
				          {this.state.promptError}
			        </Notification>
				<Container scrollable={true}>
					<Container style={{'marginBottom':'1rem'}}>
						<Card header={header}>
							<p className='productNameCh'>{this.state.exclusiveImage.chinese_name}</p>
							<p className='productNameEn'>{this.state.exclusiveImage.english}</p>
							<p className='productPrice'>{'￥'+bee.currency(this.state.resultInfo.price)+'/瓶'}</p>
				        </Card>
				        <section>
				        	<ExclusiveInput first={this.state.excluFirst} changeClick={this.changeClick1}  exclusiveData={this.state.exclusiveData} title="独家地区"/>
				        	<ExclusiveInput first={this.state.timeFirst} changeClick={this.changeClick2}  exclusiveData={this.state.timeData} title="独家时长"/>
				        </section>
				        <div className="exclusiveNumber">
				        	<p className="exclusiveNumberTitle">数量</p>
							<Number ref='number' dataNum={this.state.resultInfo.moq} valueData={this.valueData} giyStyle={true} />
				        </div>
					</Container>
					<Button btnStyle={submitBtn} content='马上成为独家代理' onClick={this.clickHeadler}/>
				</Container>
			</View>
		)
	}
}
SoleAgencyDetailsPage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(SoleAgencyDetailsPage);