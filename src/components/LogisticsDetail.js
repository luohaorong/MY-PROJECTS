import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/logisticsDetail.less';
import PropTypes from 'prop-types';
class LogisticsDetail extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isSelect:[]
		}
		this.clickHeadle = this.clickHeadle.bind(this);
	}
	componentWillMount(){
		let isSelect = [];
		let {logisticsData,orderBlankData}= this.context;
		if(bee.cache('isSelect') && !bee.cache('reset')){
			this.setState({
				isSelect:JSON.parse(bee.cache('isSelect'))
			})
		}else{
			orderBlankData.map(function(j){
				let tmp = [];
				logisticsData.map(function(item){
					tmp.push(item.is_default === 'true')
				});
				isSelect.push(tmp);
			})
			this.setState({
				isSelect:isSelect
			})
		}
	}
	clickHeadle(e){
		let active = e.currentTarget;
		let isHasdefault = this.context.isHasdefault;
		let logisticData = active.getAttribute('data-logistic');
		let index = +active.getAttribute('data-index');
		let method = active.getAttribute('data-method');//物流方式
		let station = active.getAttribute('data-station');//仓库
		let addressSelect = bee.cache('addressObj');
		let noteData = active.getAttribute('data-note');
		let isSelectState = this.state.isSelect;
		let isSelect = [];
		let logisticIndex = this.props.index;//仓库的索引
		let delivery = {
			"send_station":station,
			"method":method,
			"home_service":method === 'freight' ? 'yes' :'no'
		}
		let deliverArr = bee.cache('deliverArr') ? JSON.parse(bee.cache('deliverArr')) :[];
		let len = deliverArr.length
		let This = this;
		if(len  > 0){
			for(var i = 0;i < len;i++){
				if(deliverArr[i].send_station === station){
					deliverArr[i].method = method;
					deliverArr[i].home_service = method === 'freight' ? 'yes' :'no';
					break;
				}else if(i === len - 1){
					deliverArr.push(delivery);
				}
			}
		}else{
			deliverArr.push(delivery);
		}
		bee.cache('deliverArr',deliverArr);
		if(isHasdefault || addressSelect){
			bee.post('/wechat/ship/fee',{
				delivery : JSON.stringify(deliverArr),
				address_uuid : JSON.parse(bee.cache('addressObj')).uuid 
			},function(data){
				if(data.error_code){
					This.context.hasAddress(true,data.msg,'');
				}else{
					isSelectState.map(function(j,q){
						let tmp = [];
						if(q === logisticIndex){
							j.map(function(item,k){
								if(k === index){
						 			tmp.push(true);
							 	}else{
							 		tmp.push(false)
							 	}
							});
						}else{
							j.map(function(item,k){
								tmp.push(item)
							});
						}
						isSelect.push(tmp);
					})
					This.setState({
						isSelect:isSelect,
						index:logisticIndex
					})
					bee.cache('isSelect',isSelect);
					let selectLogistic = {
						"name":logisticData,
						"note":noteData
					}
					bee.cache('selectLogistic',selectLogistic);
					sessionStorage.removeItem('reset');
					This.props.isClose(true);
					This.context.hasAddress(true,data.msg,data.data);
				}
			},true);
		}else{
			this.context.hasAddress(true,'请先选择收货地址','');
		}
	}
	
	render(){
		let {logisticsData,noSelect,Selected,orderBlankData}= this.context;
		let {isSelect} = this.state;
		let logisticIndex = this.props.index;//仓库索引
		return(
			<aside className = 'logisticsMethodContainer'>
				<ul className = 'logisticsMethodList'>
					{
						orderBlankData&&orderBlankData.map(function(j,q){
							return (
								logisticsData&&logisticsData.map(function(item,k){
										return (
											logisticIndex === q ?(
													<li key = {k} className = 'logisticsMethodItem' onClick = {this.clickHeadle} data-index = {k} data-station = {j.station} data-method = {item.method} data-note = {item.note} data-logistic = {item.name}>
														<div className = 'selectWrap'> 
															<img className = 'deportImg' src = {isSelect[q][k]?Selected:noSelect}/>
														</div>
														<div className = 'contentWrap'>
															<p className = 'logistic'>
																{item.name}
															</p>
															<p className = 'note'>
																{item.note}
															</p>
															{
																item.service_content&&(
																	<p className = 'serviceContent'>
																		{item.service_content.warning}
																	</p>
																)
															}
														</div>
													</li>
											):''
										)
								},this)
							)
						},this)
					}
				</ul>
			</aside>
		)
	}
}
LogisticsDetail.contextTypes  = {
	logisticsData : PropTypes.array,//物流数据
	isHasdefault : PropTypes.object,//是否有默认收货地址
	hasAddress : PropTypes.func,//用户是否已经选择收货地址
	noSelect : PropTypes.string,//选择后的图片
	Selected : PropTypes.string,//取消选择图片
	orderBlankData : PropTypes.array //仓库数据
}
export default pureRender (LogisticsDetail);