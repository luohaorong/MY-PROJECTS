import React from 'react';
import {Link} from 'react-router';
import dpjx from '../assets/images/boutique/dpjx.png';
import zlbz from '../assets/images/boutique/zlbz.png';
import jsys from '../assets/images/boutique/jsys.png';
import psbt from '../assets/images/boutique/psbt.png';
import {
	Container,
	Slider,
	View
} from 'amazeui-touch';
import boutiquePage from '../assets/styles/boutiquePage.less';
import BoutiqueContainer from '../components/BoutiqueContainer';
import pureRender from 'pure-render-decorator';
class BoutiquePage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			banner:[],
			boutique:[],
			noData:'preLoad',
			page:2,
			count:2
		}
		this.errorLoad=this.errorLoad.bind(this);
		this.getListData=this.getListData.bind(this);
		this.isGetData=this.isGetData.bind(this);
	}

	componentDidMount(){
		document.title='精品酒';
		bee.pushUrl();
		let This = this;
		bee.post('/wechat/boutique/list',{
			'page':1,
			'size':3
		},function(data){
			if (data.error_code==0) {
				This.setState({
					banner:data.data.banner,
					boutique:data.data.boutique
				})
			}
		},true)
	}
	errorLoad(e){
		let active=e.currentTarget;
		active.src='../assets/images/unload.png';
		active.setAttribute('class','errorLoad');
		this.setState({
			isError:false
		})
	}
	isGetData(data){
		if(data){
			this.getListData()
		};
	}
	//加载更多商品列表
	getListData(){
		let This=this;
		let page=this.state.page;//第几页
		let count=this.state.count;//每成功获取一次数据page加1
		this.setState({
				noData:'loading'
			});
			
		bee.post('/wechat/boutique/list',{
				"page":page,
				"size":3
			},function(data){
				if(data.error_code===0){
					let getPost=data.data.boutique;
					let tmp=This.state.boutique;
						getPost.map(function(item){
							tmp.push(item);
						});
					if(getPost.length){
						
						This.setState({
							boutique:tmp,
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
		let slideImg = this.state.banner;
		const sliderCaption = (
					  <Slider controls={false}>
					    {slideImg&&slideImg.map(function(item, i) {
					      return (
					        <Slider.Item
					          key={i}
					        >
					        <Link to={'/ProductDtailPage?uuid='+item.value} data-uuid={item.value}>
					          <img onError={this.errorLoad} data-src={bee.image(item.image,750,262)} src={bee.image(item.image,750,262)}/>
					        </Link>
					        </Slider.Item>
					      );
					    },this)}
					  </Slider>
					);
		let  boutiqueData=[
								{
									src:dpjx,
									gold:'大牌精选',
									black:'名庄大牌一站全享'
								},	
								{
									src:zlbz,
									gold:'质量保证',
									black:'官方认证 品质优选'
								},		
								{
									src:jsys,
									gold:'急速运送',
									black:'急速送达 如期而至'
								},		
								{
									src:dpjx,
									gold:'破损包退',
									black:'物流保障 安全放心'
								},			
							];
		const boutiqueDetail=(
				boutiqueData.map(function(item,i){
					return(
						<div key={i} className={i%2==0?'boutiqueTopLeft':'boutiqueTopRight'}>
							<img className="boutiqueTopLeftImg" src={item.src}/>
							<div className="boutiqueTopLeftWord">
								<p className="boutiqueTopGold">{item.gold}</p>
								<p className="boutiqueTopBlack">{item.black}</p>
							</div>
						</div>

						)
				})
			)     
		return(
			<View>
				<section className="boutiqueLunbo">
					{sliderCaption}
				</section>
				<div className="boutiqueTop">
					{boutiqueDetail}
				</div>
				<BoutiqueContainer noData={this.state.noData} isGetData={this.isGetData} boutique={this.state.boutique} loadStyle={{'height':'1.5rem'}}/>
			</View>
			)
	}
}
export default pureRender(BoutiquePage);