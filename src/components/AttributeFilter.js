import React from 'react';
import pureRender from 'pure-render-decorator';
import '../assets/styles/attributeFilter.less';
import {Grid,Col} from 'amazeui-touch';
import PropTypes from 'prop-types';
class AttributeFilter extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		let category = this.context.category;
		let filter = bee.getQueryString('filter') || '';
		bee.post('/wechat/attr/select',{
			"category" : category,
			"filter" : filter
		},function(data){
			console.log(data.data)
		},true)
	}
	render(){
		return (
			<span>111</span>
		)
	}
}
AttributeFilter.contextTypes={
	category: PropTypes.string 
}
export default pureRender(AttributeFilter);
