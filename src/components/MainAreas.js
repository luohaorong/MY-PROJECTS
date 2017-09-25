import React from 'react';
import {Tabs,Container,View} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
import '../assets/styles/mainAreas.less';
class MainAreas extends React.Component{
	constructor(props){
		super(props);
		
	}
	
	render(){
		
		let mainArray=[];
		let user_type=bee.cache('user_type');
		let mainData=this.props.mai;
		if (user_type=='agency') {
			mainArray.push( mainData.length&&mainData.map(function(item,i){
					return(
							<div className="mainAreasContainer" key={i} data-uuid={item.uuid}>
								<p>{item.name}</p>
								<p className="mainStatus">{item.verify_pass}</p>
							</div>
						)
				},this)
				)
		}else{
			mainArray.push(
			<div className='mainAreasEmpty'>
				您是企业用户，暂无主营地区功能！
			</div>
			)
		}
		
		
		
				
			
		return(
				<div>
					{mainArray[0]}
				</div>
				
				
			   
			)
	}
}
export default pureRender(MainAreas);
