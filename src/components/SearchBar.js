import React from 'react';
import '../assets/styles/searchBar.less';
import {Container} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class SearchBar extends React.Component{
	
	render(){
		return(
			<div className='SearchBarContainer'>
				<div className='SearchBarContent'>
					<div className='SearchBarContentLeft'></div>
					<input placeholder='品名/产地' className='SearchBarContentRight' type='text'/>
				</div>
				
			</div>
			
			)
	}
}
export default pureRender(SearchBar);