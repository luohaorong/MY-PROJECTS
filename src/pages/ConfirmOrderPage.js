import React from 'react';
import pureRender from 'pure-render-decorator';
export default pureRender(class ConfirmOrderPage extends React.Component{
	componentDidMount(){
		document.title='确认订单';
		bee.post('/wechat/carts/check',{},function(data){
			console.log(data);
		},true);
	}
	render(){
		return (
			<h1>
				123
			</h1>
		)
	}
})
