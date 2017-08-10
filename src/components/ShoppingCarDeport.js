import React from 'react';
import {findDOMNode} from 'react-dom';
import {Link} from 'react-router';
import ShoppingCarEditGoods from './ShoppingCarEditGoods';
import HomeHotProduct from '../components/HomeHotProduct';
import Number from './Number';
import '../assets/styles/shoppingCarDeport.less';
import noSelect from '../assets/images/shoppingCar/ischeck_false.png';
import Selected from '../assets/images/shoppingCar/ischeck_true.png';
import hotProductImg from '../assets/images/shoppingCar/love.png'
import pureRender from 'pure-render-decorator';
import {Container,View,Notification} from 'amazeui-touch';
class ShoppingCarDeport extends React.Component{
	constructor(props){
		super(props);
		this.state={
			shoppingData:{},
			cartsData:[],
			isSelect:[]
		}
		this.closeNotification = this.closeNotification.bind(this);
		this.selectClick=this.selectClick.bind(this);
		this.deportSelectClick=this.deportSelectClick.bind(this);
		this.allSelected=this.allSelected.bind(this);
		this.collectionClick=this.collectionClick.bind(this);
		this.deletClick=this.deletClick.bind(this);
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
	    })
	}
	componentDidMount(){
		let This=this;
		bee.post('/wechat/carts/list',{},function(data){
			if(data.error_code){
				let Error=data.msg;
				// 如果失败，提示！！
				This.openNotification();
				//  callback
				var timeId = setTimeout(This.closeNotification,3000);
				This.setState({
					timeId : timeId,
					promptError:Error
				});
				return;
			}else{
				let dataCWM=data.data.carts;
				This.CWM(dataCWM);
				This.setState({
					shoppingData:data.data,//所有数据
					cartsData:data.data.carts
				});
			}
		},true);
		
	}
	//记录组件渲染前的状态
	CWM(data){
		let deportSelectArr=[];
		data&&data.map(function(i,k){
			let tmp = [];
			i.goods.map(function(j,h){
				tmp.push(j.selected==='yes');//j.selected获取数据中初始化的状态
			})
			deportSelectArr.push(tmp);
		})
		this.setState({
			isSelect:deportSelectArr
		})
		
	}
	//全选
	allSelected(){
		let data=this.state.isSelect;
		console.log('全选'+data);
		let deportSelectArr = [];
		data.map(function(i,k){
			let tmp = [];
			i.map(function(j,h){
				tmp.push(!this.and(data));
			},this)
			deportSelectArr.push(tmp);
		},this)
		this.setState({
			isSelect:deportSelectArr
		})
	}
	//选择仓库
	deportSelectClick(event){
		let data=this.state.isSelect;
		let active=event.target;
		let parentActive=active.parentNode.parentNode;
		let index=parentActive.getAttribute('data-index');
		let deportSelectArr = [];
		data.map(function(i,k){
			let tmp = [];
			i.map(function(j,h){
				if(k==index){
					tmp.push(!this.and(data[k]))
				}else{
					tmp.push(j)
				}
			},this)
			deportSelectArr.push(tmp);
		},this)
		this.setState({
			isSelect:deportSelectArr
		})
	}
	//选择单个商品
	selectClick(event){
		let data=this.state.isSelect;
		let deportSelectArr = [];
		let active=event.target;
		let parentActive=active.parentNode.parentNode.parentNode.parentNode;
		let myselfActive=active.parentNode.parentNode.parentNode;
		let parentIndex=parentActive.getAttribute('data-index');
		let myselfIndex=myselfActive.getAttribute('data-index');
		data.map(function(i,k){
			let tmp = [];
			i.map(function(j,h){
				if (k == parentIndex && h == myselfIndex) {
					tmp.push(!j);
				} else {
					tmp.push(j);
				}
			},this)
			deportSelectArr.push(tmp);
		},this)
		this.setState({
			isSelect:deportSelectArr
		})
	}
	//点击移入收藏夹
	collectionClick (){
		let data=this.state.isSelect;
		let collectionArr=[];
		let tmpData = [];
		let This=this;
		data.map(function(i,k){
			let tmp = [];
			i.map(function(h,q){
				if (h) {
					collectionArr.push(this.state.cartsData[k].goods[q].uuid);//记录被选中的UUID，以便传给服务器
				} else {
					tmp.push(this.state.cartsData[k].goods[q]);//手动删除被选中的数据
				}
			},this)
			if (tmp.length) {
				tmpData.push({ station: this.state.cartsData[k].station, goods: tmp });
			}
		},this);
		bee.post('/wechat/add/collection',{
						goods_uuid:collectionArr
					},function(data){
						if(data.error_code){
							let Error=data.msg;
							// 如果失败，提示！！
							This.openNotification();
							//  callback
							var timeId = setTimeout(This.closeNotification,3000);
							This.setState({
								timeId : timeId,
								promptError:Error
							});
							return;
						}else{
							this.setState({
								cartsData:tmpData
							});
							this.CWM(tmpData);
						}
					},true);
	}
	//删除
	deletClick(){
		let data=this.state.isSelect;
		let collectionArr=[];
		let tmpData = [];
		data.map(function(i,k){
			let tmp = [];
			i.map(function(h,q){
				if (h) {
					collectionArr.push(this.state.cartsData[k].goods[q].uuid);
				} else {
					tmp.push(this.state.cartsData[k].goods[q]);
				}
			},this)
			if (tmp.length) {
				tmpData.push({ station: this.state.cartsData[k].station, goods: tmp });
			}
		},this);
		bee.post('',{
						goods_uuid:collectionArr,
					},function(data){
						if(data.error_code){
							let Error=data.msg;
							// 如果失败，提示！！
							This.openNotification();
							//  callback
							var timeId = setTimeout(This.closeNotification,3000);
							This.setState({
								timeId : timeId,
								promptError:Error
							});
							return;
						}else{
							this.setState({
								cartsData:tmpData
							});
							this.CWM(tmpData);
						}
					},true);
	}
	//多维数组位运算
	and (arr) {
        if (typeof arr === 'object') {
            let tmp = arr.length?true:false;
            arr.map(function(value, key) {
                if (typeof value === 'object') {
                    tmp &= this.and(value);
                } else {
                    tmp &= value;
                }
            },this);
            return tmp;
        }else{
	        return arr;
        }
    }
	render(){
		let deprotData=(
			this.state.cartsData&&this.state.cartsData.map(function(item,index){
				return(
					<div className='deportWrap' key={index} data-index={index}>
					<div className='deportTitle'>
						<img className='deportImg' onClick={this.deportSelectClick} src={this.and(this.state.isSelect[index]) ? Selected:noSelect}/>
						<span className='deportTitleText text-truncate'>
							{item.station}
						</span>
					</div>
					{
						item.goods.map(function(j,i){
							return(
								<div className='deportContentWrap' key={i} data-index={i}>
									<div className={i===item.goods.length-1?'deportContent  noBorder':'deportContent'}>
										<div className='selectWrap'>
											<img className='deportImg' onClick={this.selectClick} src={this.and(this.state.isSelect[index][i]) ? Selected:noSelect}/>
										</div>
										<div className='productWraper'>
											<Link to='/ProductDtailPage' className={this.and(this.state.isSelect[index][i]) ?'activeStyle productImgWrap':'productImgWrap'}>
												<img className='productImg' src={bee.image(j.image_path,280,400)}/>
											</Link>
										</div>
										<div className='productContent'>
											<p className='productName text-truncate'>
												{j.goods_chinese_name}
											</p>
											<div className='priceNumber'>
												<p className='singlePrice'>
													{'￥'+bee.currency(j.goods_price)}
												</p>
												<p className='productNum'>
													{j.goods_num}
												</p>
											</div>
											<div className='typeNumber'>
												<p className='goodsType'>
													{j.sub_label}
												</p>
												<Number quantity={j.moq}/>
											</div>
										</div>
									</div>
								</div>
								
							)
							
						},this)
						
					}
				</div>
				)
			},this)
		)
		//热销商品数据
		let productListData=[
								{
								newImgSrc:'../assets/images/home/product.png',
								flagImg:'../assets/images/home/flag.png',
								chName:'布拉沃山丘赤霞珠美乐干',
								enName:'Bravo hills Miller Cabernet sauv',
								country:'法国',
								origin:'产地等级',
								price:'￥ 150'
								}
								,{
								newImgSrc:'../assets/images/home/product.png',
								flagImg:'../assets/images/home/flag.png',
								chName:'布拉沃山丘赤霞珠美乐干',
								enName:'Bravo hills Miller Cabernet sauv',
								country:'法国',
								origin:'产地等级',
								price:'￥ 150'
								}
								,{
								newImgSrc:'../assets/images/home/product.png',
								flagImg:'../assets/images/home/flag.png',
								chName:'布拉沃山丘赤霞珠美乐干',
								enName:'Bravo hills Miller Cabernet sauv',
								country:'法国',
								origin:'产地等级',
								price:'￥ 150'
								}
								,{
								newImgSrc:'../assets/images/home/product.png',
								flagImg:'../assets/images/home/flag.png',
								chName:'布拉沃山丘赤霞珠美乐干',
								enName:'Bravo hills Miller Cabernet sauv',
								country:'法国',
								origin:'产地等级',
								price:'￥ 150'
								}
								,{
								newImgSrc:'../assets/images/home/product.png',
								flagImg:'../assets/images/home/flag.png',
								chName:'布拉沃山丘赤霞珠美乐干',
								enName:'Bravo hills Miller Cabernet sauv',
								country:'法国',
								origin:'产地等级',
								price:'￥ 150'
								}
								,{
								newImgSrc:'../assets/images/home/product.png',
								flagImg:'../assets/images/home/flag.png',
								chName:'布拉沃山丘赤霞珠美乐干',
								enName:'Bravo hills Miller Cabernet sauv',
								country:'法国',
								origin:'产地等级',
								price:'￥ 150'
								}
							]
		return(
			<Container direction="column">
				<Notification
				      title="荟酒国际提示"
			          amStyle='alert'
			          visible={this.state.visible}
			          animated
			          onDismiss={this.closeNotification}
			        >
				         {this.state.promptError}
			        </Notification>
				<Container className='scrollWrapper' scrollable={true}>
					<div className='deportContainer'>
						<ShoppingCarEditGoods collectionClick={this.collectionClick} deletClick={this.deletClick} onClick={this.allSelected} src={this.and(this.state.isSelect) ? Selected:noSelect}/>
						<div style={{width:'100%',height:'2rem'}}></div>
						{deprotData}
						<HomeHotProduct hotProductImg={hotProductImg} productListData={productListData} />
						<div style={{height:'7rem'}}></div>
					</div>
				</Container>
				<ShoppingCarEditGoods onClick={this.allSelected} src={this.and(this.state.isSelect) ? Selected:noSelect} bottom={true}/>
			</Container>
		)
	}
}
export default pureRender(ShoppingCarDeport);