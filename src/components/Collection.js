import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/collection.less';
import noSelect from '../assets/images/productDtail/collection.png';
import yesSelect from '../assets/images/productDtail/collectionSelect.png';
class Collection extends React.Component{
	constructor(props){
		super(props);
		this.state={
			imageCollection:noSelect,
			isSelect:true
		}
		this.clickHandler=this.clickHandler.bind(this);
	}
	componentDidMount(){
		if(this.props.isFavorite){
			this.setState({
				imageCollection:yesSelect,
				isSelect:false
			});
		}
	}
	clickHandler(){
		let This=this;
		if(this.state.isSelect){
			bee.post('/wechat/add/collection',{
				goods_uuid:bee.getQueryString('uuid')
			},function(data){
				if(data.error_code){
					if(data.error_code===209){
						This.props.getCollection(data.error_code);
							This.setState({
								imageCollection:yesSelect,
								isSelect:false
							})
					}else{
						
						This.props.getCollection('addFail');
					}
				}else{
					This.props.getCollection('add');
					This.setState({
						imageCollection:yesSelect,
						isSelect:false
					})
				}
				
			},true)
			
			
		}else{
			//发请求
			bee.post('/wechat/del/collection',{
				goods_uuid:bee.getQueryString('uuid')
			},function(data){
				if(data.error_code){
					This.props.getCollection('delFail');
				}else{
					This.props.getCollection('del');
					This.setState({
						imageCollection:noSelect,
						isSelect:true
					})
				}
				
			},true)
			
			
			
		}
	}
	render(){
		return(
			<p className='collection' onClick={this.clickHandler}>
				<img className='collectionImg' src={this.state.imageCollection}/>
				<span className='collectionText'>
					{this.state.isSelect?'点击收藏':'已收藏'}
				</span>
			</p>
		)
	}
}
export default pureRender(Collection);