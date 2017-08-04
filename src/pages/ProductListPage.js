import React from 'react';
import '../assets/styles/productListPage.less';
import Header from '../components/Header';
import ProductListTab from '../components/ProductListTab';
import pureRender from 'pure-render-decorator';
import headerImgRight from '../assets/images/productList/magnifier.png';
import HomeHotProduct from '../components/HomeHotProduct';
import {Container,View} from 'amazeui-touch';
let goodsUuid;
class ProductListPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			titleData:[],
			loadUuid:''
		}
		this.postParent=this.postParent.bind(this);
	}
	componentWillMount(){
		sessionStorage.removeItem('angencyData');
		sessionStorage.removeItem('bindData');
		sessionStorage.removeItem('registerEntry');
		sessionStorage.removeItem('dataSign');
	}
	componentDidMount(){
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
						"latest":bee.getQueryString('latest')
					},function(data){
						if(data.error_code){
							alert(data.msg);
							return;
						}else{
							This.setState({
								Data:data.data
							})
						}
					},true);
				}
			},true)
		}else{
			bee.post('/wechat/goods/list',{
					agent_type:typeUuid,
					honor:honor
				},function(data){
					if(data.error_code){
						alert(data.msg);
						return;
					}else{
						This.setState({
							Data:data.data
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
		if(dataKey){
			goodsUuid=dataKey;
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
				"category":goodsUuid||this.state.loadUuid,
				"agent_type":type,
				"sort":sort,
				"sequence":isUp
			},function(data){
				if(data.error_code){
					alert(data.msg);
					return;
				}else{
					This.setState({
						Data:data.data
					})
				}
			},true);
	}
	render(){
		let middleImg=true;
		let middleTop=true;
		let headerListContent=[];
		this.state.titleData&&this.state.titleData.map(function(item){
			item.latest==='true'&&headerListContent.push(item);
			item.decoration==='true'&&headerListContent.push(item);
		});
		const listData=[
							{
								title:'综合'
								,name:'zonghe'
								,img:''
								,selectTab:bee.getQueryString('latest')?false:true
							}
							,{
								title:'最新'
								,name:'latest'
								,img:''
								,selectTab:bee.getQueryString('latest')?true:false
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
							}
						]
		const productListData=this.state.Data
		return(
			<View id='productListView'>
				<Header imgRight={headerImgRight} rightImg={true} postParent={this.postParent} headerListContent={headerListContent} middleTop={middleTop} middleImg={middleImg} MiddleTextTop={bee.getQueryString('title')} />
				<ProductListTab postParent={this.postParent} listData={listData} titleData={this.state.titleData}/>
				<Container scrollable={true}>
					<HomeHotProduct loadUrl='/wechat/goods/list' loadUuid={this.state.loadUuid} productListData={productListData} loadStyle={{'height':'1.5rem'}}/>
				</Container>
			</View>
		)
	}
}
ProductListPage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(ProductListPage);
