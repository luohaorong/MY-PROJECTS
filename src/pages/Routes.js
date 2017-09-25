import React from 'react';
import {render} from 'react-dom';
import {
  Router,
  Route,
  browserHistory,
  IndexRedirect
} from 'react-router';
import bee from '../components/Common';//引入common.js
// Pages
import AllRoute from './AllRoute';//带有下导航的页面都在APP路由下
import App from './App';//带有下导航的页面都在APP路由下
import JumpPage from './JumpPage';//引入jump页面
import LoginPage from './LoginPage';//登录页面
import GuidePage from './GuidePage';//引导页
import BindAccountPage from './BindAccountPage';//绑定页面入口
import RegistrationPortalPage from './RegistrationPortalPage';//注册类型选择
import RegisterCompanyAccountPage from './RegisterCompanyAccountPage';//注册入口页面
import RegisterAgencyPage from './RegisterAgencyPage';//经销商注册
import RegisterCompanyPage from './RegisterCompanyPage';//公司注册
import RegistrationProtocolPage from './RegistrationProtocolPage';//注册协议
import TransitionPage from './TransitionPage';//注册成功后的过渡页面
import HomePage from './HomePage';//首页
import SoleAgencyDetailsPage from './SoleAgencyDetailsPage';//独家代理详情
import SoleAgencyPage from './SoleAgencyPage';//独家代理
import ProductDtailPage from './ProductDtailPage';//商品详情基础信息
import ProdcutDtailImagePage from './ProdcutDtailImagePage';//商品详情页图片详情
import LoginPhonePage from './LoginPhonePage';//手机登录
import ModifyPasswordPage from './ModifyPasswordPage';//修改密码
import AboutUsPage from './AboutUsPage';//关于我们
import ServiceCenterPage from './ServiceCenterPage';//服务中心
import MyInformationPage from './MyInformationPage';//我的
import ClassTypePage from './ClassTypePage';//分类
import ShoppingCarPage from './ShoppingCarPage';//购物车
import MyBalancePage from './MyBalancePage';//我的余额
import RechargePage from './RechargePage';//充值
import RechargeRecordPage from './RechargeRecordPage';//充值记录
import AddressAdminPage from './AddressAdminPage';//地址管理
import AddDeliveryPage from './AddDeliveryPage';//新增收货地址
import AddMainPage from './AddMainPage';//新增主营地区
import ProductListPage from './ProductListPage';//商品列表
import ConfirmOrderPage from './ConfirmOrderPage';//确认订单
import MyOrdersPage from './MyOrdersPage';//我的订单
import PayPage from './PayPage';//我的订单
import SearchPage from './SearchPage';//搜索页面
import SearchResultPage from './SearchResultPage';//搜索结果页面
// withRouter HoC
// @see https://github.com/reactjs/react-router/blob/0616f6e14337f68d3ce9f758aa73f83a255d6db3/upgrade-guides/v2.4.0.md#v240-upgrade-guide
// <IndexRedirect to='/login' />
const routes=(
				<Route path="/" component={AllRoute}>
					<Route path="/JumpPage" component={JumpPage}/>
			    <Route path="/LoginPage" component={LoginPage}/>
			    <Route path="/GuidePage" component={GuidePage}/>
			    <Route path="/BindAccountPage" component={BindAccountPage}/>
			    <Route path="/RegistrationPortalPage" component={RegistrationPortalPage}/>
			    <Route path="/RegisterAgencyPage" component={RegisterAgencyPage}/>
			    <Route path="/RegisterCompanyAccountPage" component={RegisterCompanyAccountPage}/>
			    <Route path="/RegisterCompanyPage" component={RegisterCompanyPage}/>
			    <Route path="/RegistrationProtocolPage" component={RegistrationProtocolPage}/>
		    	<Route path="/LoginPhonePage" component={LoginPhonePage}/>
		    	<Route path="/SoleAgencyDetailsPage" component={SoleAgencyDetailsPage}/>
		    	<Route path="/SoleAgencyPage" component={SoleAgencyPage}/>
		    	<Route path="/ModifyPasswordPage" component={ModifyPasswordPage}/>
		    	<Route path='/ProductDtailPage' component={ProductDtailPage}/>
		    	<Route path="/AboutUsPage" component={AboutUsPage}/>
		    	<Route path='/ProdcutDtailImagePage' component={ProdcutDtailImagePage}/>
		    	<Route path='/MyBalancePage' component={MyBalancePage}/>
			    <Route path='/RechargePage' component={RechargePage}/>
			    <Route path='/RechargeRecordPage' component={RechargeRecordPage}/>
		    	<Route path='/AddressAdminPage' component={AddressAdminPage}/>
		    	<Route path='/AddDeliveryPage' component={AddDeliveryPage}/>
		    	<Route path='/AddMainPage' component={AddMainPage}/>
		    	<Route path="/ServiceCenterPage" component={ServiceCenterPage}/>
		    	<Route path="/ProductListPage" component={ProductListPage}/>
		    	<Route path="/ConfirmOrderPage" component={ConfirmOrderPage}/>
		    	<Route path="/TransitionPage" component={TransitionPage}/>
		    	<Route path="/MyOrdersPage" component={MyOrdersPage}/>
		    	<Route path="/PayPage" component={PayPage}/>
		    	<Route path="/SearchPage" component={SearchPage}/>
		    	<Route path="/SearchResultPage" component={SearchResultPage}/>
		    	<IndexRedirect to='/index'/>
			    <Route path="/index" component={App}>
			    	<IndexRedirect to='/index/HomePage'/>
			    	<Route path='/index/HomePage' component={HomePage}/>
			    	<Route path='/index/ClassTypePage' component={ClassTypePage}/>
			    	<Route path='/index/ShoppingCarPage' component={ShoppingCarPage}/>
		    		<Route path="/index/MyInformationPage" component={MyInformationPage}/>
		    	</Route>
			 	</Route>
)
 render(<Router routes={routes} history={browserHistory}/>, document.getElementById('app'));
