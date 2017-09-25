import React from 'react';
import '../assets/styles/productListTab.less';
import pureRender from 'pure-render-decorator';
import {Grid,Col,OffCanvasTrigger,OffCanvas} from 'amazeui-touch';
import priceDown from '../assets/images/productList/priceD.png';
import priceUp from '../assets/images/productList/priceTop.png';
import AttributeFilter from './AttributeFilter';
let type;
let isPrice="DESC";
class ProductListTab extends React.Component{
	constructor(props){
		super(props);
		this.state={
			albums:[]
		}
			
		this.clickHander=this.clickHander.bind(this);
	}
	componentWillMount(){
		let dataList=this.props.listData;
		let tmp=[];
		dataList.map(function(i,k){
			tmp.push(i.selectTab);
		})
		this.setState({
			isSelect:tmp
		})
	}
	componentWillReceiveProps(nextProps){
		let tmp=[true,false,false,false];
		if(nextProps.reTabState){
			this.setState({
				isSelect:tmp
			})
		};
	}
	clickHander(event){
		let active=event.currentTarget;
		let activeIndex=active.getAttribute('data-index');
		type=active.getAttribute('data-type');
		let tmp=[];
		this.state.isSelect.map(function(i,k){
			k===(+activeIndex)?tmp.push(true):tmp.push(false);
		})
			if(activeIndex==2){
				isPrice==="ASC"?isPrice="DESC":isPrice="ASC";
			}
		type!=='change'&&this.props.postParent('',type,isPrice);
		this.setState({
			isSelect:tmp
		})
	}
	render(){
		return(
			 <Grid className='productListTab'>
			 {
	         	this.props.listData&&this.props.listData.map(function(i,k){
	         		if(!i.isFilter){
			           return <Col key={k}  onClick={this.clickHander} data-type={i.name} className={this.state.isSelect[k]?'listTab fontColor':'listTab'} data-index={k}><span >{i.title}</span>{i.img?(<img src={k==2?(isPrice==="ASC"?priceUp:priceDown):(i.img)}/>):''}</Col>
	         		}else{
	         			return (
	         				 <OffCanvasTrigger
	         				 	key={k}
					            animation="push"
					            pageContainer="#sk-root"
					            placement="right"
					            offCanvas={<OffCanvas><AttributeFilter /></OffCanvas>}
					          >
					            <Col onClick={this.clickHander} data-type={i.name} className={this.state.isSelect[k]?'listTab fontColor':'listTab'} data-index={k}><span >{i.title}</span>{i.img?(<img src={k==2?(isPrice==="ASC"?priceUp:priceDown):(i.img)}/>):''}</Col>
					          </OffCanvasTrigger>
	         			);
	         		}
	         	},this)
			 }
	          </Grid>
			
		)
	}
}
export default pureRender(ProductListTab);

