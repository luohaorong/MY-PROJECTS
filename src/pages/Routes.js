import React from 'react';
import {render} from 'react-dom';
import {
  Router,
  Route,
  hashHistory,
  IndexRedirect
} from 'react-router';
// Pages
import AllRoute from './AllRoute';//带有下导航的页面都在APP路由下
import App from './App';//带有下导航的页面都在APP路由下
import AgencyIndexPage from './AgencyIndexPage';//业务经理业务查询
import GeneralDetailsPage from './GeneralDetailsPage';//概况明细
import SearchDetailPage from './SearchDetailPage';//查询明细
import CashPage from './CashPage';//提现页面
import GetMoneyHelpPage from './GetMoneyHelpPage';//提现帮助
import BonusDetailPage from './BonusDetailPage';//分红详情
import CashDetailPage from './CashDetailPage';//提现明细
import CashApplay from './CashApplay';//提现申请
import ChangeBankPage from './ChangeBankPage';//修改卡号

//					    <Route path="/index/AgencyIndexPage" component={AgencyIndexPage}/>
		const routes=(
				<Route path='/' component={AllRoute}>
					<Route path="/SearchDetailPage" component={SearchDetailPage}/>
					<Route path="/GeneralDetailsPage" component={GeneralDetailsPage}/>
				  <Route path="/GetMoneyHelpPage" component={GetMoneyHelpPage}/>
				  <Route path="/BonusDetailPage" component={BonusDetailPage}/>
				  <Route path="/CashDetailPage" component={CashDetailPage}/>
				  <Route path="/CashApplay" component={CashApplay}/>
				  <Route path="/ChangeBankPage" component={ChangeBankPage}/>
				  <IndexRedirect to='/index'/>
				  <Route path="/index" component={App}>
				  		<IndexRedirect to='/index/AgencyIndexPage'/>
					    <Route path="/index/AgencyIndexPage" component={AgencyIndexPage}/>
					    <Route path="/index/CashPage" component={CashPage}/>
				    </Route>
			  	</Route>
		)
 render(<Router routes={routes} history={hashHistory}/>, document.getElementById('app'));