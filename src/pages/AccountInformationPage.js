import React from 'react';
import {Container} from 'amazeui-touch';
import ServiceInformation from '../components/ServiceInformation';
import '../assets/styles/accountInformationPage.less';
import headImg from '../assets/images/myinformation/touxiang.png';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
class AccountInformationPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			accountData:[]
		}
	}
	componentDidMount(){
		document.title="账户信息";
		let This = this;
		bee.post('/wechat/account/info',{},
			function(data){
				if (data.error_code===0) {
					This.setState({
						accountData:data.data
					});
					bee.cache('changeNumber',data.data.mobile);
				}
		},true)
	}
	render(){
		return(
			<Container>
				<div className="accountHead">
					<div className="accountHeadContainer">
						<p className="accountHeadLeft">头像</p>
						<p className="accountHeadRight">
							<img className="accountHeadRightImg" src={this.state.accountData.avatar!==''?this.state.accountData.avatar:headImg}/>
						</p>
					</div>
				</div>
				<ServiceInformation content={this.state.accountData.account} title='用户名'/>
				<ServiceInformation content={this.state.accountData.real_name} title='姓名'/>
				<ServiceInformation content={this.state.accountData.duty} title='职位'/>
				<ServiceInformation content={this.state.accountData.mobile} title='手机号'/>
				<ServiceInformation content={this.state.accountData.company} title='公司名称'/>
				<ServiceInformation noBorder={true} content={this.state.accountData.address} title='注册地址'/>
				<Link className='changePass' to='/ChangePasswordPage'>
					修改密码
				</Link>
			</Container>
			)
	}
}
export default pureRender(AccountInformationPage);