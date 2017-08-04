import React from 'react';
import {Tabs,Container,View} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
import '../assets/styles/mainAreas.less';
class MainAreas extends React.Component{
	constructor(props){
		super(props);
		
	}
	render(){
		let mainData=this.props.mai;
		const mainareas=(
				mainData.length&&mainData.map(function(item,i){
					return(
							<div className="mainAreasContainer" key={i}>
								<p>{item.address}</p>
								<p className="mainStatus">{item.status}</p>
							</div>
						)
				},this)
			)
		return(
				<div>
					{mainareas}
				</div>
				
				
			   
			)
	}
}
export default pureRender(MainAreas);
