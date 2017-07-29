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
	clickHandler(){
		if(this.state.isSelect){
			this.setState({
				imageCollection:yesSelect,
				isSelect:false
			})
			//发Axios请求
			
			
		}else{
			this.setState({
				imageCollection:noSelect,
				isSelect:true
			})
			//发请求
			
			
			
			
		}
	}
	render(){
		return(
			<p className='collection' onClick={this.clickHandler}>
				<img className='collectionImg' src={this.state.imageCollection}/>
				<span className='collectionText'>
					已收藏
				</span>
			</p>
		)
	}
}
export default pureRender(Collection);