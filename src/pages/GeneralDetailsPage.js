import React from 'react';
import {
	Container,
	View
} from 'amazeui-touch';
import ProductDetailInformation from '../components/ProductDetailInformation';
import '../assets/styles/generalDetailsPage.less';
import AgencyHeader from '../components/AgencyHeader';
class GeneralDetailsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			bonus:''
		}
	}
	postChildren(postP){
		this.setState({
			isBouns:postP
		})

	}
	componentDidMount(){
		let that = this;
		let data1=[];
		let data2=[];
		let type=sessionStorage.getItem('type')
		bee.post('/bonus', {}, function(data) {
			if(data.code) {
				alert(data.info);
				return;
			}
			data.data.total_bonus = bee.currency(data.data.total_bonus);
			data.data.bonuses?data.data.bonuses.map(function(i){
				if(i.bonus_source==='agency'){
					data1.push(i);
					that.setState({
						Data1:data1,
						bonus:data.data.total_bonus
					});
				}else if(i.bonus_source==='company'){
					data2.push(i);
					that.setState({
						Data2:data2,
						bonus:data.data.total_bonus
					});
				}
			}):''
		}, true);
		
	
	}
	render() {
		return(
			<View >
			<Container className = 'generalWrap' scrollable = {true} >
			<AgencyHeader moneyNum={this.state.bonus}  probably = {true}/>
			<ProductDetailInformation Data1={this.state.Data1} Data2={this.state.Data2}/>
			< /Container >
			</View>
		)
	}
}
export default GeneralDetailsPage;