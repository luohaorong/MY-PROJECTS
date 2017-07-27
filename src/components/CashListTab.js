import React from 'react';
import '../assets/styles/cashListTab.less';
import pureRender from 'pure-render-decorator';
import {Grid,Col} from 'amazeui-touch';
class CashListTab extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isPrice:false
		}
			
		this.clickHander=this.clickHander.bind(this);
	}
	componentWillMount(){
		let dataList=this.props.listData;
		let tmp=[];
		dataList.map(function(i){
			tmp.push(i.selectTab);
		})
		this.setState({
			isSelect:tmp
		})
	}
	clickHander(event){
		let active=event.currentTarget;
		let activeIndex=active.getAttribute('data-index');
		let tmp=[];
		this.state.isSelect.map(function(i,k){
			k==activeIndex?tmp.push(true):tmp.push(false);
		})
			if(activeIndex==2){
				this.state.isPrice?this.setState({
					isPrice:false
				}):this.setState({
					isPrice:true
				});
			}
		this.setState({
			isSelect:tmp
		});
	}
	render(){
		return(
			 <Grid className='productListTab'>
			 {
	         	this.props.listData.map(function(i,k){
		           return <Col key={k} onClick={this.clickHander} className={this.state.isSelect[k]?'listTab fontColor':'listTab'} data-index={k}><div onClick={this.props.onClickData} data-status={i.status} >{i.title}</div></Col>
	         	},this)
			 }
	          </Grid>
			
		)
	}
}
export default pureRender(CashListTab);
