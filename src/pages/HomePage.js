// 引入
import React from 'react';
import {Link} from 'react-router';
import LazyLoad from 'react-lazy-load';
import SmallButton from '../components/SmallButton';
import HomeImportFloor from '../components/HomeImportFloor';
import HomeNew from '../components/HomeNew';
import HomeBubbleSweet from '../components/HomeBubbleSweet';
import HomeDoc from '../components/HomeDoc';
import HomeHotProduct from '../components/HomeHotProduct';
import List from '../components/List';
import {uniqueId} from '../components/Nnique';
import PropTypes from 'prop-types';
import hotProductImg from '../assets/images/home/hot_product.png';
import {
	Container,
	Slider,
	Grid,
	Col,
	View,
	Notification
} from 'amazeui-touch';
import '../assets/styles/homePage.less';
import pureRender from 'pure-render-decorator';
// 定义
class HomePage extends React.Component{
	constructor(props) {
    super(props);
    this.state={
    	promptError:'',
    	slideImg:[],
    	importListImg:{},
    	floors:[],
    	ListData:[],
    	bannerImg:[],
    	errorSrc:'',
    	classN:'',
    	isShow:false,
    	page:2,
		count:2,
		noData:'preLoad',
		noListData:false,
		isError:true
    }
	this.closeNotification = this.closeNotification.bind(this);
	this.errorLoad=this.errorLoad.bind(this);
	this.loadHeadle=this.loadHeadle.bind(this);
	this.scrollHeadle=this.scrollHeadle.bind(this);
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
	componentWillMount(){
		bee.addUnloadImg();
	}
	componentDidMount(){
		bee.pushUrl();
		let This=this;
		document.title = '首页';
		sessionStorage.removeItem('bindData');
		sessionStorage.removeItem('code');
		bee.post('/wechat/index',{},function(data){
			setTimeout(function(){bee.removeImg()},1000);
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
				let getPost=data.data;
				if(data.data.length===0){
					This.setState({
						noListData:true
					})
				}
				This.setState({
					slideImg:getPost.top,//轮播图数据
					importListImg:getPost.imports,//进口馆数据
					ListData:getPost.goods,//热销产品数据
					floors:getPost.floors,//各楼层数据
					bannerImg:getPost.middle//中间广告banner图
				})
			}
		},true);
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
						let tmp=This.state.ListData;
						getPost.map(function(item){
							tmp.push(item);
						});
						This.setState({
							ListData:tmp,
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
	//搜索框效果
	scrollHeadle(){
		let seach=document.querySelector('.seach');
		let scrollWrapper=document.querySelector('.scrollWrapper');
		if(seach.offsetTop<=scrollWrapper.scrollTop){
			this.setState({
				isShow:true
			})
		}else{
			this.setState({
				isShow:false
			})
		}
		
		
	}
	//图片加载出错时执行
	errorLoad(e){
		let active=e.currentTarget;
		active.src='../assets/images/unload.png';
		active.setAttribute('class','errorLoad');
		this.setState({
			isError:false
		})
		
		
	}
	//图片加载完成前
	loadHeadle(e){
		let active=e.currentTarget;
		let comp=active.complete;
		let dataSrc=active.getAttribute('data-src');
		if(comp&&this.state.isError){
			active.src=dataSrc;
		}
		
	}
	// 渲染
	render(){
		// 定义轮播数据
		const slideImg = this.state.slideImg;
		const sliderCaption = (
					  <Slider controls={false}>
					    {slideImg&&slideImg.map(function(item, i) {
					      return (
					        <Slider.Item
					          key={i}
					        >
					        <Link to={'/ProductDtailPage?uuid='+item.uuid} data-uuid={item.uuid}>
					          <img onError={this.errorLoad} data-src={bee.image(item.image,750,376)} src={bee.image(item.image,750,376)}/>
					        </Link>
					        </Slider.Item>
					      );
					    },this)}
					  </Slider>
					);

		const featureImg=[
					  {
					    img: '../assets/images/home/oem.png'
					    ,content:'定制'
					    ,URL:'/ProductListPage?uuid=oem&title=葡萄酒'
					  },
					  {
					    img: '../assets/images/home/refined.png'
					    ,content:'精品酒'
					    ,URL:'/ProductListPage?uuid=jingpin&title=葡萄酒'
					  },
					  {
					    img: '../assets/images/home/spot.png'
					    ,content:'葡萄酒'
					    ,URL:'/ProductListPage?uuid=putao&title=葡萄酒'
					  },
					  {
					    img: '../assets/images/home/win.png'
					    ,content:'获奖酒'
					    ,URL:'/ProductListPage?honor=true&title=葡萄酒'
					  },
					  {
					    img: '../assets/images/home/new.png'
					    ,content:'新品'
					    ,URL:'/ProductListPage?uuid=putao&title=葡萄酒&latest=true'
					  },
					  {
					    img: '../assets/images/home/presell.png'
					    ,content:'预售'
					    ,URL:'/ProductListPage?uuid=pre_sale&title=葡萄酒'
					  },
					  {
					    img: '../assets/images/home/one.png'
					    ,content:'独家代理'
					    ,URL:'/ProductListPage?uuid=region&title=葡萄酒'
					  },
					  {
					    img: '../assets/images/home/container.png'
					    ,content:'酒饰品'
					    ,URL:'/ProductListPage?uuid=jiushipin&title=酒饰品'
					  }
					];

		//国际进口馆楼层第一行列表图片数据
		const importListImg=this.state.importListImg.country;
		//国际进口楼层下部分主图数据
		const importMainImg=this.state.importListImg.attribute;
		//各楼层数据
		const floors=this.state.floors;
		let newList=[];//新品预热图片数据
		let bubbleData=[];//气泡甜型数据
		let homeDocData=[];//法定产区数据
		floors&&floors.map(function(item){
			if(item.type==="type_one"){
				newList.push(item);
			}
			if(item.type==="type_two"){
				bubbleData.push(item);
			}
			if(item.type==="type_three"){
				homeDocData.push(item);
			}
		})
		//热销商品数据
		let productListData=this.state.ListData;
		let bgImage={
			backgroundImage:'url('+bgImage+')'
		}
		return (
			<View>
					<Notification
				      title="荟酒国际提示"
			          amStyle='alert'
			          visible={this.state.visible}
			          animated
			          onDismiss={this.closeNotification}
			        >
				         {this.state.promptError}
			        </Notification>
			        <div className='seachWrp isShow' style={this.state.isShow?{opacity:'1'}:{opacity:'0'}}>
			        	<Link className="topSeach" to='/SearchPage'>
							<img src="/assets/images/home/search_home_full.png"/>
						</Link>
			        </div>
				<Container className='scrollWrapper' onScroll={this.scrollHeadle} scrollable={true}>
					<section className="lunbo">
						<div>
						{sliderCaption}
						<Link className="seach isShow" to='/SearchPage' style={this.state.isShow?{opacity:'0'}:{opacity:'1'}}>
							<img src="/assets/images/home/search_home_full.png"/>
						</Link>
						</div>
			        </section>
					<List featureImg={featureImg} avg={4}/>
					<SmallButton/>
					<section className='bannerImg'>
							<Link className='swiperLink guanggao' to={'/ProductDtailPage?uuid='+ (this.state.bannerImg[0]&&this.state.bannerImg[0].uuid)} data-uuid={this.state.bannerImg[0]&&this.state.bannerImg[0].uuid}>
								<LazyLoad offsetVertical={200}>
									<img onError={this.errorLoad} className={this.state.classN} src={this.state.errorSrc?this.state.errorSrc:this.state.bannerImg[0]&&bee.image(this.state.bannerImg[0].image,750,164)}/>
								</LazyLoad>
							</Link>
						</section>
						<HomeImportFloor importListImg={importListImg} importMainImg={importMainImg}/>
						{
							newList&&newList.map(function(item,i){
								return(
									<section key={"asd"+i}>
										<HomeNew newImage={item}/>
									</section>
									)
							})
						}					
						<section className='bannerImg'>
							<Link className='swiperLink guanggao' to='/ProductDtailPage' data-uuid={this.state.bannerImg[1]&&this.state.bannerImg[1].uuid}>
								<LazyLoad offsetVertical={200}>
									<img onError={this.errorLoad} className={this.state.classN} src={this.state.errorSrc?this.state.errorSrc:this.state.bannerImg[1]&&bee.image(this.state.bannerImg[1].image,750,164)}/>
								</LazyLoad>
							</Link>
						</section>
						{
							bubbleData&&bubbleData.map(function(item,i){
									return(
										<section  key={"bas"+i}>
											<HomeBubbleSweet bubbleData={item}/>
										</section>
										)
							})
						}
						{
							homeDocData&&homeDocData.map(function(item,i){
								return(
										<section key={"dfd"+i}>
											<HomeDoc homeDocData={item} />
										</section>
										)
							})
						}
		            	<HomeHotProduct noData={this.state.noData} noListData={this.state.noListData} isGetData={this.isGetData} hotProductImg={hotProductImg} productListData={productListData} />
				</Container>
				
			</View>
		)
	}
}
HomePage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}

// 导出
export default pureRender(HomePage);
