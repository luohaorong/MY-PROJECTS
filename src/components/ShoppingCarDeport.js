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
			isSelect:[],
			productIfo:[],
			bottleNum:0,
			noData:'preLoad',
			page:2,
			count:2
		}
		this.closeNotification = this.closeNotification.bind(this);
		this.selectClick=this.selectClick.bind(this);
		this.deportSelectClick=this.deportSelectClick.bind(this);
		this.allSelected=this.allSelected.bind(this);
		this.collectionClick=this.collectionClick.bind(this);
		this.deletClick=this.deletClick.bind(this);
		this.errorLoad=this.errorLoad.bind(this);
		this.loadHeadle=this.loadHeadle.bind(this);
		this.valueData=this.valueData.bind(this);
		this.isGetData=this.isGetData.bind(this);
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
	//图片加载出错时执行
	errorLoad(){
		this.setState({
			errorSrc:'../assets/images/unload.png',
			classN:'errorLoad'
		})
		
		
	}
	//图片加载完成前
	loadHeadle(e){
		let active=e.currentTarget;
		let comp=active.complete;
		let dataSrc=active.getAttribute('data-src');
		this.setState({
			classN:'errorLoad'
		});
		if(comp){
			this.setState({
				classN:''
			})
			active.src=dataSrc;
		}
	}
	componentWillMount(){
		bee.addUnloadImg();
	}
	componentDidMount(){
		let This=this;
		bee.post('/wechat/carts/list',{},function(data){
			setTimeout(function(){bee.removeImg(),1000});
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
				let productIfo=[];
				dataCWM.map(function(item){
					let tmp=[];
					item.goods.map(function(j){
						tmp.push({"uuid":j.uuid,"num":j.goods_num})
					});
					productIfo.push(tmp);
				});
				This.CWM(dataCWM);
				This.setState({
					shoppingData:data.data,//所有数据
					cartsData:data.data.carts,//购物车商品数据
					productIfo:productIfo,//用户交互时需要提交的数据
					productListData:data.data.scan,//猜你喜欢
					goods_amount:data.data.goods_amount,//总共的箱数
					goods_total:data.data.goods_total,//总共的瓶数
					price_amount:data.data.price_amount//总价
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
	valueData(data,moq,stock,uuid,index){
		let productIfo=[{
			"uuid":uuid,
			"num":data,
			"select":index
		}];
		let This=this;
		let ifoData=this.state.productIfo;
		productIfo=JSON.stringify(productIfo);
		ifoData.map(function(item,k){
			item.map(function(j,h){
				if(j.uuid===uuid){
					ifoData[k][h].num=data;
				}
			});
		});
		if(data<moq){
			let Error='商品购买量不能低于起订量（'+moq+'箱）';
			// 如果失败，提示！！
			this.openNotification();
			//  callback
			let timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				promptError:Error
			});
		}
		if(data>stock){
			let Error='商品购买量不能高于库存量（'+stock+'箱）';
			// 如果失败，提示！！
			this.openNotification();
			//  callback
			let timeId = setTimeout(this.closeNotification,3000);
			this.setState({
				timeId : timeId,
				promptError:Error
			});
		}
		if(data>=moq&&data<=stock){
			bee.post('/wechat/carts/update',{
				"carts":productIfo,
				"type":'update'
			},function(data){
				// 如果失败，提示！！
				This.openNotification();
				//  callback
				let timeId = setTimeout(This.closeNotification,3000);
				This.setState({
					timeId : timeId,
					promptError:data.msg
				});
				
			},true);
		}
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
					let ifoUuid=this.state.productIfo[k][q].uuid;//选中的uuid
					let ifoNum=this.state.productIfo[k][q].num;
					collectionArr.push({"uuid":ifoUuid,"num":ifoNum});//记录被选中的UUID，以便传给服务器
				} else {
					tmp.push(this.state.cartsData[k].goods[q]);//手动删除被选中的数据
				}
			},this)
			if (tmp.length) {
				tmpData.push({ station: this.state.cartsData[k].station, goods: tmp });
			}
		},this);
		collectionArr=JSON.stringify(collectionArr);
		bee.post('/wechat/carts/update',{
						carts:collectionArr,
						type:'move'
					},function(data){
							let Error=data.msg;
							// 如果失败，提示！！
							This.openNotification();
							//  callback
							var timeId = setTimeout(This.closeNotification,3000);
							This.setState({
								timeId : timeId,
								promptError:Error
							});
						if(!data.error_code){
							This.setState({
								cartsData:tmpData
							});
							This.CWM(tmpData);
						}
					},true);
	}
	//删除
	deletClick(){
		let data=this.state.isSelect;
		let collectionArr=[];
		let tmpData = [];
		let This=this;
		data.map(function(i,k){
			let tmp = [];
			i.map(function(h,q){
				if (h) {
					let ifoUuid=this.state.productIfo[k][q].uuid;//选中的uuid
					let ifoNum=this.state.productIfo[k][q].num;
					collectionArr.push({"uuid":ifoUuid,"num":ifoNum});//记录被选中的UUID，以便传给服务器
				} else {
					tmp.push(this.state.cartsData[k].goods[q]);
				}
			},this)
			if (tmp.length) {
				tmpData.push({ station: this.state.cartsData[k].station, goods: tmp });
			}
		},this);
		collectionArr=JSON.stringify(collectionArr);
		bee.post('/wechat/carts/update',{
						carts:collectionArr,
						type:'delete'
					},function(data){
						let Error=data.msg;
							// 如果失败，提示！！
							This.openNotification();
							//  callback
							var timeId = setTimeout(This.closeNotification,3000);
							This.setState({
								timeId : timeId,
								promptError:Error
							});
						if(!data.error_code){
							This.setState({
								cartsData:tmpData
							});
							This.CWM(tmpData);
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
	isGetData(data){
		if(data){
			this.getListData()
		};
	}
	//加载商品列表
	getListData(){
		let This=this;
		let page=this.state.page;//第几页
		let count=this.state.count;//每成功获取一次数据page加1
		this.setState({
				noData:'loading'
			});
		bee.post('/wechat/index/goods',{
				page:page,
				size:10
			},function(data){
				if(data.error_code===0){
					let getPost=data.data;
					if(getPost.length){
						let tmp=This.state.productListData;
						getPost.map(function(item){
							tmp.push(item);
						});
						This.setState({
							productListData:tmp,
							noData:'preLoad'
						});
						
					}else{
						This.setState({
							noData:'onData'
						});
					}
					count++;
					This.setState({
						page:count,
						count:count
					})
				}
			},true);
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
											<Link to={'/ProductDtailPage?uuid='+j.uuid} className={this.and(this.state.isSelect[index][i]) ?'activeStyle productImgWrap':'productImgWrap'}>
												<img onError={this.errorLoad} onLoad={this.loadHeadle} className='productImg' data-src={bee.image(j.image_path,280,400)} src={this.state.errorSrc||'../assets/images/preLoad.gif'}/>
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
													{j.stocking_pricing_ratio}支装
												</p>
											</div>
											<div className='typeNumber'>
												<p className='goodsType'>
													{j.sub_label}
												</p>
												<Number valueData={this.valueData} dataNum={+j.goods_num} moq={+j.moq} stock={+j.stock} uuid={j.uuid} index={this.and(this.state.isSelect[index][i])}/>
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
		let productListData=JSON.stringify(this.state.shoppingData)!=='{}'&&this.state.productListData;
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
						<HomeHotProduct noData={this.state.noData} isGetData={this.isGetData} hotProductImg={hotProductImg} productListData={productListData} loadStyle={{'height':'1.5rem'}}/>
						<div style={{height:'7rem'}}></div>
					</div>
				</Container>
				<ShoppingCarEditGoods price_amount={this.state.price_amount} goods_amount={this.state.goods_amount} goods_total={this.state.goods_total} onClick={this.allSelected} src={this.and(this.state.isSelect) ? Selected:noSelect} bottom={true}/>
			</Container>
		)
	}
}
export default pureRender(ShoppingCarDeport);