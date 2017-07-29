import React from 'react';
import {render} from 'react-dom';
import {
  Router,
  Route,
  hashHistory,
  IndexRedirect
} from 'react-router';
// Pages
import App from './App';//带有下导航的页面都在APP路由下
import StaffIndexPage from './StaffIndexPage';//业务首页
import BusinessPage from './BusinessPage';//业务查询
import StaffProfilePage from './StaffProfilePage';//业务当日查询
import QueryResultPage from './QueryResultPage';//业务经理业务查询结果
import RegionAdminPage from './RegionAdminPage';//区域管理详情
// withRouter HoC
// @see https://github.com/reactjs/react-router/blob/0616f6e14337f68d3ce9f758aa73f83a255d6db3/upgrade-guides/v2.4.0.md#v240-upgrade-guide
// <IndexRedirect to='/login' />
class Routes extends React.Component{
	render() {
		return (
			<Router history={hashHistory}>
			    <Route path="/StaffProfilePage" component={StaffProfilePage}/>
			    <Route path="/QueryResultPage" component={QueryResultPage}/>
			    <Route path="/RegionAdminPage" component={RegionAdminPage}/>
			    <Route path="/" component={App}>
				    <IndexRedirect to='/StaffIndexPage'/>
				    <Route path="/StaffIndexPage" component={StaffIndexPage}/>
				    <Route path="/BusinessPage" component={BusinessPage}/>
			    </Route>
		  	</Router>
		)
	}
}

 render(<Routes/>, document.getElementById('app'));