import React from 'react';
import '../assets/styles/payWays.less';
import {Container} from 'amazeui-touch';
import selected from '../assets/images/recharge/checkgou.png';
import unSelect from '../assets/images/recharge/checkno.png'
import pureRender from 'pure-render-decorator';
class PayWays extends React.Component{
	constructor(props){
		super(props);
		this.checkPayWays = this.checkPayWays.bind(this);
	}
	componentWillMount(){
		let PayWaysData=this.props.PayWaysData;
		let tmp = [];
		PayWaysData.map(function(i,k){
			k==0?tmp.push(selected):tmp.push(unSelect)
		})
		this.setState({
			isSelect:tmp
		})
	}
	checkPayWays(e){
		let active=e.target;
		let activeIndex=active.getAttribute('data-index');
		let tmp=[];
		this.state.isSelect.map(function(i,k){
			k==activeIndex?tmp.push(selected):tmp.push(unSelect)
		})
		this.setState({
			isSelect:tmp
		})
	}
	render(){
		let PayWaysData=this.props.PayWaysData;
		const payWaysContent=(
				PayWaysData.map(function(item,i){
					return(
					<div key={i} className='payWaysContent'>
						<img className='payWaysImg' src={item.img}/>
						<div className='payWaysDescrib'>
							<p className='payWaysDescribTop'>{item.title}</p>
							<p className='payWaysDescribBottom'>{item.describ}</p>
						</div>
						<img data-index={i}  src={this.state.isSelect[i]} className='payWaysCircle' onClick={this.checkPayWays} />
					</div>
						)
				},this)
			)
		return(
				<Container className='payWaysContainer'>
					{payWaysContent}
				</Container>
			)
	}
}
export default pureRender(PayWays);