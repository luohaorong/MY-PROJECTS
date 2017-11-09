import React from 'react';
import pureRender from 'pure-render-decorator';
import {OffCanvasTrigger,OffCanvas,Col,Container} from 'amazeui-touch';
import '../assets/styles/logisticsMethod.less';
import LogisticsDetail from './LogisticsDetail';
export default pureRender(class LogisticsMethod extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isSelect : false,
			selectLogistic:{}
		}
		this.isClose = this.isClose.bind(this);
	}
	componentDidMount(){
		bee.cache('reset','yes');//用于重置物流方式状态
	}
	isClose(data){
		let side = this.refs.side;
		if(data){
			let selectLogistic = bee.cache('selectLogistic');
			selectLogistic = JSON.parse(selectLogistic);
			side.close();
			this.setState({
				isSelect:true,
				selectLogistic:selectLogistic
			})
		}
	}
	render(){
		let {isSelect,selectLogistic} = this.state;
		return (
			<Container>
				<OffCanvasTrigger
	            animation="push"
	            pageContainer="#sk-root"
	            placement="right"
	            ref = "side"
	            offCanvas={<OffCanvas><LogisticsDetail isClose = {this.isClose} index = {this.props.index}/></OffCanvas>}
	          >
				{
					isSelect?(
						<Col className = 'logisticsMethodWrap'>
			            	<p className = 'logisticsMethod'>
			            		<span className = 'title'>
			            			配送方式
			            		</span>
			            		<span className = 'please'>
			            			{selectLogistic.name}
			            		</span>
			            	</p>
			            	<figure className = 'logisticsTip'> 
			            		<figcaption className = 'tipText'>
			            			{selectLogistic.note}
			            		</figcaption>
			            	</figure>
			            </Col>
					):(
						<Col className = 'logisticsMethodWrap'>
			            	<p className = 'logisticsMethod'>
			            		<span className = 'title'>
			            			配送方式
			            		</span>
			            		<span className = 'please'>
			            			请选择
			            		</span>
			            	</p>
			            </Col>
					)
				}
	            
	          </OffCanvasTrigger>
			</Container>
		)
	}
})
