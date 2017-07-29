import React from 'react';
import pureRender from 'pure-render-decorator';
import {View,Container} from 'amazeui-touch';
import ProductDetailInformation from '../components/ProductDetailInformation';
import '../assets/styles/staffProfilePage.less';
class StaffProfilePage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			profileHead:{},
			detailData:{}
		}
	}
	componentDidMount(){

		let type=JSON.parse(sessionStorage.getItem('type'));
		let that=this;
		bee.post('/bonus', {
			'semanteme':type.type
		}, function(data){
			/*optional stuff to do after success */
			if (data.code) {
				alert(data.info);
				return;
			}
			data.data.total_bonus=bee.currency(data.data.total_bonus);
			that.setState({
				profileHead:{
					money:data.data.total_bonus,
					time:type.words
				},
				detailData:data.data.bonuses
			})
		},true);
		
	}
	render(){
		return(
				<View>
					<Container scrollable={true}>
						<div className='profileHead'>
							<p className='profileHeadMoney'>&yen;{this.state.profileHead.money}</p>
							<p className='profileHeadTime'>{this.state.profileHead.time}</p>
						</div>
						<ProductDetailInformation detailData={this.state.detailData}/>
					</Container>
				</View>
			)
	}
}
export default pureRender(StaffProfilePage);