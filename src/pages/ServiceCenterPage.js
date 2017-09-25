import React from 'react';
import Header from '../components/Header';
import {Container} from 'amazeui-touch';
import ServiceTitle from '../components/ServiceTitle';
import ServiceInformation from '../components/ServiceInformation';
import pureRender from 'pure-render-decorator';
class ServiceCenterPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:{}
		}
	}
	 componentWillMount(){
	 	bee.pushUrl();
	 	document.title='服务中心';
	 	const Data=[
	 				
					{
						title:'可主营地区',
						detailData:[
										{
											title:'姓名',
											content:'老王',
											uuid:'1'
										}
										,{
											title:'手机',
											content:'15898959865',
											uuid:'2'
										}
									],
						uuid:'1'			
					}
					,{
						title:'人工客服',
						detailData:[
										{
											title:'座机',
											content:'082-12346',
											uuid:'3'
										}
										,{
											title:'QQ',
											content:'15898959865',
											uuid:'4'
										}
									],
						uuid:'2'			
					}	
					
							
						
					];
	 	this.setState({
	 		data:Data
	 	})
	 }
	render(){
			let sData=this.state.data;
			const ServiceInfo=(
					sData.map(function(j,i){
							return(
									<div key={j.uuid}>
										<ServiceTitle text={j.title}/>
										{
											j.detailData.map(function(item,i){
													if(i===j.detailData.length-1){
														return(<ServiceInformation noBorder={true} key={item.uuid} content={item.content} title={item.title}/>)

													}else{
														return(<ServiceInformation key={item.uuid} content={item.content} title={item.title}/>)

													}
											})
										}
									</div>

								)
								
								

					})
				)
				
			
		return(
			<Container>
				<Header Header MiddleTextTop='服务中心' middleTop='true'/>
				{ServiceInfo}
			</Container>
			)
	}
}
export default pureRender(ServiceCenterPage);