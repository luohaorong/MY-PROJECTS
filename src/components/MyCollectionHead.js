import React from 'react';
import myCollectionHead from '../assets/styles/myCollectionHead.less';
import noSelect from '../assets/images/shoppingCar/ischeck_false.png';
import Selected from '../assets/images/shoppingCar/ischeck_true.png';
import pureRender from 'pure-render-decorator';
class MyCollectionHead extends React.Component{
	constructor(props){
		super(props);
		this.state={
			editState:false
		}
		this.editClick=this.editClick.bind(this);
		this.deleteClick=this.deleteClick.bind(this);
	}
	editClick(){
		this.state.editState==true?this.setState({
			editState:false
		}):this.setState({
			editState:true
		})
		let This = this;
		setTimeout(function(){
			This.props.postEidtState(This.state.editState);
		},100)
		
	}
	deleteClick(){
		if(bee.cache('deleteUuid').length>0){
			this.props.postDelete(true);
		}else{
			this.props.postDelete(false);
		}
	}
	render(){
		let edit1='编辑';
		let edit2='完成';
		let str=this.state.editState==true?'block':'none';
		return(
			<div>
				<div className="myCollectionHeadContainer">
					<div className="myCollectionHeadRight" onClick={this.editClick}>
						{this.state.editState==true?edit2:edit1}
					</div>
				</div>
				<div className="myCollectionHeadBottom" onClick={this.deleteClick} style={{display:str}}>删除</div>
			</div>
			)
	}
}
export default pureRender(MyCollectionHead);