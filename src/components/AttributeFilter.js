import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/attributeFilter.less';
import {Group,Grid,Col,Container} from 'amazeui-touch';
class AttributeFilter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			attrData:[],
			isSlec:[]
		}
		this.clickItem = this.clickItem.bind(this);
		this.resetClick = this.resetClick.bind(this);
		this.suerClick = this.suerClick.bind(this);
	}
	componentDidMount(){
		let category = bee.cache('category');
		let This = this;
		let filter = bee.cache('filterUuid') || [];
		let isSlec = [];
		bee.post('/wechat/attr/select',{
			"category" : category,
			"filter" : filter
		},function(data){
			if(data.error_code){
				alert(data.msg);
				return;
			}else{
				data.data.map(function(item){
					let tmp = [];
					item.sub.map(function(k){
						tmp.push(k.selected === 'true')
					});
					isSlec.push(tmp);
				})
				This.setState({
					attrData : data.data,
					isSlec : isSlec
				});
			}
		},true)
	}
	clickItem(e){
		let active = e.currentTarget;
		let uuid = active.getAttribute('data-uuid');
		let activeIndex = +active.getAttribute('data-index');
		let parentIndex = +active.parentNode.getAttribute('data-index');
		let filter = JSON.parse(bee.cache('filterUuid')) || [];
		let index = filter.indexOf(uuid);
		let isSelc = this.state.isSlec;
		let arrSelc = [];
		isSelc.map(function(item,k){
			item.map(function(q,p){
				if(k === parentIndex && p === activeIndex){
					if(!q && index === -1){
						filter.push(uuid);
					}else if(q && index !== -1){
						filter.splice(index,1);
					}
				}
			})
		})
		bee.cache('filterUuid',filter);
		let This = this;
		let category = bee.cache('category');
		bee.post('/wechat/attr/select',{
			"category" : category,
			"filter" : JSON.stringify(filter)
		},function(data){
			if(data.error_code){
				alert(data.msg);
				return;
			}else{
				data.data.map(function(item,k){
					let tmpSelc = [];
					item.sub.map(function(q,p){
						tmpSelc.push(q.selected === 'true')
					});
					arrSelc.push(tmpSelc);
				})
				This.setState({
					attrData : data.data,
					isSlec:arrSelc
				})
			}
		},true)
	}
	resetClick(){
		let This = this;
		let category = bee.cache('category');
		let arrSelc = [];
		bee.cache('filterUuid',[]);
		bee.post('/wechat/attr/select',{
			"category" : category,
			"filter" : JSON.stringify([])
		},function(data){
			if(data.error_code){
				alert(data.msg);
				return;
			}else{
				data.data.map(function(item,k){
					let tmpSelc = [];
					item.sub.map(function(q,p){
						tmpSelc.push(false)
					});
					arrSelc.push(tmpSelc);
				});
				This.setState({
					attrData : data.data,
					isSlec : arrSelc
				})
			}
		},true)
	}
	suerClick(){
		let This = this;
		let category = bee.cache('category');
		let filter = bee.cache('filterUuid');
		bee.post('/wechat/goods/list',{
			"uuid" : filter
		},function(data){
			if(data.error_code){
				alert(data.msg);
				return;
			}else{
				This.context.suerClick(data)
				This.props.isClose(true)
			}
		},true)
	}
	render(){
		let {attrData,isSlec} = this.state;
		let len = isSlec.length;
		return (
			<Container style = {{position:'relative',backgroundColor:'#ffffff'}}>
				<section>
					{
							len&&attrData.map(function(item,j){
								return (
									<Group className='attrGroup' key = {item.uuid} header = {item.name}>
										<Grid className='attrGrid' wrap='wrap' align="between" data-index = {j}>
											{
												item.sub.map(function(q,p){
													return (
														<Col data-index = {p} data-uuid = {q.uuid} className = {isSlec[j][p] ? 'activeItem attrItem' : 'attrItem'} key = {q.uuid} onClick = {this.clickItem}>
															{q.name}
														</Col>
													)
												},this)
											}
										</Grid>
									</Group>
								)
							},this)
					}
				</section>
				<div style = {{height:'3rem'}}></div>
				<section className = 'bottomBtm'>
					<div className = 'btnContainer'>
						<p onClick={this.resetClick} className = 'btnFilter btnLeft'>
							重置
						</p>
						<p onClick={this.suerClick} className = 'btnFilter btnRight'>
							确定
						</p>
					</div>
				</section>
			</Container>
		)
	}
}
AttributeFilter.contextTypes={
	suerClick: React.PropTypes.func 
}
export default pureRender(AttributeFilter);
