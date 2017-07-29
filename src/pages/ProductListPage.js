import React from 'react';
import '../assets/styles/productListPage.less';
import Header from '../components/Header';
import ProductListTab from '../components/ProductListTab';
import pureRender from 'pure-render-decorator';
import headerImgRight from '../assets/images/productList/magnifier.png';
import HomeHotProduct from '../components/HomeHotProduct';
import {Container,View} from 'amazeui-touch';
let goodsId;
class ProductListPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			titleData:[]
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
							item.latest==='true'?goodsId=item.uuid:"";
						})
					  break;
					case 'jiushipin':
					   data.data.map(function(item){
							item.decoration==='true'?goodsId=item.uuid:"";
						})
					  break;
					}
					bee.post('/wechat/categories/goods',{
						"uuid":goodsId,
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
			bee.post('/wechat/categories/goods',{
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
	postParent(dataKey){
		let This=this;
		dataKey&&bee.post('/wechat/categories/goods',{
				"uuid":dataKey
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
								,img:''
								,selectTab:bee.getQueryString('latest')?false:true
							}
							,{
								title:'最新'
								,img:''
								,selectTab:bee.getQueryString('latest')?true:false
							}
							,{
								title:'价格'
								,img:'../assets/images/productList/priceD.png'
								,selectTab:false
							}
							,{
								title:'筛选'
								,img:'../assets/images/productList/shaixuan.png'
								,selectTab:false
							}
						]
		const productListData=this.state.Data
		return(
			<View id='productListView'>
				<Header imgRight={headerImgRight} rightImg={true} postParent={this.postParent} headerListContent={headerListContent} middleTop={middleTop} middleImg={middleImg} MiddleTextTop={bee.getQueryString('title')} />
				<ProductListTab listData={listData}/>
				<Container scrollable={true}>
					<HomeHotProduct loadUrl='/wechat/categories/goods' loadUuid={goodsId} productListData={productListData} loadStyle={{'height':'1.5rem'}}/>
				</Container>
			</View>
		)
	}
}
ProductListPage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(ProductListPage);
