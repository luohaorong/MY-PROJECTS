import React from 'react';
import '../assets/styles/productListPage.less';
import Header from '../components/Header';
import ProductListTab from '../components/ProductListTab';
import pureRender from 'pure-render-decorator';
import headerImgRight from '../assets/images/productList/magnifier.png';
import HomeHotProduct from '../components/HomeHotProduct';
import {Container,View} from 'amazeui-touch';
import PropTypes from 'prop-types';
let goodsUuid;
class ProductListPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			titleData:[],
			loadUuid:'',
			Data:[],
			page:2,
			count:2,
			noData:'preLoad',
			noListData:false,
			filter:'',
			isPrice:'',
			reTabState:false,
			isError:false
		}
		this.postParent=this.postParent.bind(this);
		this.isGetData=this.isGetData.bind(this);
	}
	componentWillMount(){
		sessionStorage.removeItem('angencyData');
		sessionStorage.removeItem('bindData');
		sessionStorage.removeItem('registerEntry');
		sessionStorage.removeItem('dataSign');
		bee.addUnloadImg();
	}
	componentDidMount(){
		bee.pushUrl();
		document.title = '商品列表';
		let typeUuid=bee.getQueryString('uuid');
		let honor=bee.getQueryString('honor');
		let This=this;
		if(typeUuid==='putao' || typeUuid === 'jiushipin'){
			bee.post('/wechat/goods/categories',{},function(data){
				if(data.error_code){
					alert(data.msg);
					return;
				}else{
					This.setState({
						titleData:data.data
					});
					switch(typeUuid)
					{
					case 'putao':
					  data.data.map(function(item){
							if(item.latest==='true'){
								This.setState({loadUuid:item.uuid});
								}
							});
					  break;
					case 'jiushipin':
					   data.data.map(function(item){
						   	if(item.decoration==='true'){
									This.setState({loadUuid:item.uuid});
									}
							});
					  break;
					}
					bee.post('/wechat/goods/list',{
						"category":This.state.loadUuid,
						"latest":bee.getQueryString('latest'),
						"size":10
					},function(data){
						setTimeout(function(){bee.removeImg()},1000);
						if(data.error_code){
							alert(data.msg);
							return;
						}else{
							if(data.data.goods.length===0){
								This.setState({
									noListData:true
								})
							}
							This.setState({
								noData:'preLoad',
								Data:data.data.goods
							})
						}
					},true);
				}
			},true)
		}else{
			bee.post('/wechat/goods/list',{
					"agent_type":typeUuid,
					"honor":honor,
					"size":10
				},function(data){
					setTimeout(function(){bee.removeImg()},1000);
					if(data.error_code){
						alert(data.msg);
						return;
					}else{
						if(data.data.goods.length===0){
								This.setState({
									noListData:true
								})
							}
						This.setState({
							noData:'preLoad',
							titleData:data.data.goodsCategory,
							Data:data.data.goods
						})
					}
			},true);
		}
	}
	//获取header组件的值
	postParent(dataKey,filter,isPrice){
		let This=this;
		let type;
		let sort;
		let isUp;
		this.setState({
			filter:filter,
			isPrice:isPrice
		});
		if(dataKey){
			goodsUuid=dataKey;
			this.setState({
				reTabState:true
			})
		}else{
			this.setState({
				reTabState:false
			})
		}
		switch(filter)
			{
			case 'zonghe':
				type='';
				sort='';
				isUp='';
			  	break;
			case 'latest':
				type='';
				sort='new';
				isUp='';
				break;
			case 'price':
				sort='price';
				type='';
				isUp=isPrice;
				break;
				default :type='';sort='';isUp='';
			}
		(dataKey||filter)&&bee.post('/wechat/goods/list',{
				"category":goodsUuid||This.state.loadUuid,
				"agent_type":type,
				"sort":sort,
				"sequence":isUp,
				"size":10
			},function(data){
				if(data.error_code){
					alert(data.msg);
					return;
				}else{
					document.querySelector('.scrollWrapper').scrollTop=0;
					if(data.data.goods.length===0){
								This.setState({
									page:2,
									count:2,
									noListData:true,
									noData:'preLoad',
									titleData:data.data.goodsCategory,
									Data:data.data.goods
								})
					}else{
						This.setState({
							page:2,
							count:2,
							noListData:false,
							noData:'preLoad',
							titleData:data.data.goodsCategory,
							Data:data.data.goods
						})
					}
					
				}
			},true);
	}
	isGetData(data){
		if(data){
			this.getListData()
		};
	}
	//加载更多商品列表
	getListData(){
		let This=this;
		let type;
		let sort;
		let isUp;
		let page=this.state.page;//第几页
		let count=this.state.count;//每成功获取一次数据page加1
		let isPrice=this.state.isPrice;
		let filter=this.state.filter;
		this.setState({
				noData:'loading'
			});
			switch(filter)
			{
			case 'zonghe':
				type='';
				sort='';
				isUp='';
			  	break;
			case 'latest':
				type='';
				sort='new';
				isUp='';
				break;
			case 'price':
				sort='price';
				type='';
				isUp=isPrice;
				break;
				default :type='';sort='';isUp='';
			}
		bee.post('/wechat/goods/list',{
				"page":page,
				"size":10,
				"agent_type":type,
				"sort":sort,
				"sequence":isUp,
				"category":goodsUuid||This.state.loadUuid
			},function(data){
				if(data.error_code===0){
					let getPost=data.data.goods;
					if(getPost.length){
						let tmp=This.state.Data;
						getPost.map(function(item){
							tmp.push(item);
						});
						This.setState({
							Data:tmp,
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
						count:count,
						isError:true
					})
				}
			},true);
	}
	getChildContext() {
      return {
      	category : this.state.loadUuid
      };
  }
	render(){
		let middleImg=true;
		let middleTop=true;
		let headerListContent=[];
		this.state.titleData&&this.state.titleData.map(function(item){
			headerListContent.push(item);
		});
		const listData=[
							{
								title:'综合'
								,name:'zonghe'
								,img:''
								,selectTab:!bee.getQueryString('latest')
							}
							,{
								title:'最新'
								,name:'latest'
								,img:''
								,selectTab:!!bee.getQueryString('latest')
							}
							,{
								title:'价格'
								,name:'price'
								,img:'../assets/images/productList/priceD.png'
								,selectTab:false
							}
							,{
								title:'筛选'
								,name:'change'
								,img:'../assets/images/productList/shaixuan.png'
								,selectTab:false
								,isFilter:true//是否开启侧滑
							}
						]
		let productListData=this.state.Data;
		return(
			<View id='productListView'>
				<Header imgRight={headerImgRight} rightImg={true} postParent={this.postParent} headerListContent={headerListContent} middleTop={middleTop} middleImg={middleImg} MiddleTextTop={bee.getQueryString('title')} />
				<ProductListTab reTabState={this.state.reTabState} postParent={this.postParent} listData={listData} titleData={this.state.titleData}/>
				<Container className='scrollWrapper' scrollable={true}>
					<HomeHotProduct isError={this.state.isError} noData={this.state.noData} noListData={this.state.noListData} isGetData={this.isGetData} productListData={productListData} loadStyle={{'height':'1.5rem'}}/>
				</Container>
			</View>
		)
	}
}
ProductListPage.childContextTypes={
	category: React.PropTypes.string //向AttributeFilter里面传递category
}
ProductListPage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(ProductListPage);
