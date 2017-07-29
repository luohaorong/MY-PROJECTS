import React from 'react';
import pureRender from 'pure-render-decorator';
import RegionHead from '../components/RegionHead';
import RegionContainer from '../components/RegionContainer';
import {Container,View} from 'amazeui-touch';
class RegionAdminPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			regionData:{}
		}
	}
	componentDidMount(){
		let that=this;
		bee.post('/areaStaff', {}, function(data) {
			/*optional stuff to do after success */
			that.setState({
				regionData:data.data
			})
		},true);
		
	}
	render(){
		let area_name=sessionStorage.getItem('areas_name');
		const regionHead={
				province:area_name,
				total:this.state.regionData.total_areas,
				none:this.state.regionData.no_staff
		}
		const regionContainer=[];
		this.state.regionData.detail?this.state.regionData.detail.map(function(i) {
			regionContainer.push(i)
		}):""
		return(
				<View>
					<Container scrollable={true}>
						<RegionHead regionHead={regionHead}/>
						<RegionContainer regionContainer={regionContainer}/>
					</Container>
				</View>
			)
	}
}
export default pureRender(RegionAdminPage)