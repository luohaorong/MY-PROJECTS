import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Mock from 'mockjs';
	Mock.mock('login',{
		'itemGroup|5': [{
        'id|+1': 1,
        'name|1': '@cname',
        'idCard':Mock.Random.id(),
        'phone|+1': 13979896601, 
        'city':'@city',
        'status|':'待审核'
        }]
	})
$.get('login',function(data){
	var data=JSON.parse(data)
	console.log(data.itemGroup[0].city)
})
class Login extends React.Component {
	render(){
		
		return(
			<h1>fetch test</h1>
		)
	}
}


export default Login;
