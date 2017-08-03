// 引入
import React from 'react';
import assign from 'object-assign';
import pureRender from 'pure-render-decorator';
import {
	NavBar
} from 'amazeui-touch';

//import '../assets/styles/your.less';

// 定义
class HeaderBar extends React.Component{
	// 渲染
	render(){
		
		var options= {};
		assign(options,this.props);
		if(!options.amStyle){
			options.amStyle = 'secondary';
		}
		
		
		return (
			<NavBar {...options}/>
		);
	}
}

// 导出
export default pureRender(HeaderBar);
