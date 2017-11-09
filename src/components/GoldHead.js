import React from 'react';
import '../assets/styles/goldHead.less';
import pureRender from 'pure-render-decorator';
class GoldHead extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let img=this.props.img;
		let word=this.props.word;
		let amount = this.props.amount;
		return(
				<div className="goldHeadContainer">
					<img src={img} className="goldHeadImg" />
					<p className="goldHeadAmount">
						{amount}
					</p>
					<p className="goldHeadWord">
						{word}
					</p>
				</div>
			)
	}
}
export default pureRender(GoldHead);
