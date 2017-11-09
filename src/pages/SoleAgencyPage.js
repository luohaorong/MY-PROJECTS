import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import '../assets/styles/soleAgency.less'
import {
	Container,
	View,
	Card
} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class SoleAgency extends React.Component{
	constructor(props){
		super(props);
		this.state={
			words:''
		}
		this.clickHandler=this.clickHandler.bind(this);
	}
	componentDidMount(){
		bee.pushUrl();
		document.title="独家代理协议";
		let This = this;
		bee.get('/wechat/agreement',{},function(data){
			if (data.error_code==0) {
				This.setState({
					words:data.data
				})
			}
		})
	}
	clickHandler(){
		this.context.router.push('/SoleAgencyDetailsPage')
	}
	render(){
					// <Card>
				 //         {_explain}
		   //     		</Card>
		   //     		<div>
					// 	<h5>———— 业务规则 ————</h5>
				 //        <Card title="【独家起订】">
				 //          	<p>1、	一次性独家（单品，一年时间）：地级城市100箱起、省会城市200箱起、全省及直辖市500箱起，全国独家1000箱起；</p>
					// 		<p>2、	分期独家 （单品，一年时间）：地级城市300箱起、省会城市500箱起、全省及直辖市800箱起，全国独家3000箱起；每期提货起订量不低于该区域独家起订总量的10%（低于10%不计入任务完成量）；</p>
					// 		<p>3、	境外独立产品订单、独立OEM产品独家：起订量和其他要求按荟酒网“境外订单”要求和“OEM订单”要求处理；同时按本独家协议执行；</p>
					// 		<p>4、	个别产品起订量有所差异。 根据荟酒网与上游供应厂商制定的为准，一经用户和荟酒网确定协议后，起订量不再更改；</p>
				 //        </Card>
				 //        <Card title="【独家时限】">
				 //          	<p>六个月、一年。</p>
				 //        </Card>
				 //        <Card title="【独家区域】">
				 //          	<p>须为客户的经营地区，独家产品的收货地址须为签约的独家区域，分期支付的独家商品二次或多次提货时收货地区必须为对应的独家地区，否则不计入任务完成量。</p>
				 //        </Card>
				 //        <Card title="【分期支付】">
				 //          	<p>六个月最多分两期支付，一年最多可分四期，每期三个月、逾期未提货，荟酒有权扣除保证金并取消客户区域独家权。</p>
				 //        </Card>
				 //        <Card title="【关于保证金】">
				 //          	<p>一次性提货，不需要缴纳独家保证金。分期支付需缴纳保证金，六个月独家保证金为主营地区独家总任务量货款的30%；一年独家保证金为主营地区独家总任务量的10%；保证金须与首笔货款一起支付，分期独家未支付保证金，不算独家。</p>
				 //        </Card>
				 //        <Card title="【保证金解冻】">
				 //          	<p>用户完成独家规定任务量后联系客服申请解冻保证金，10个工作日后保证金充至荟酒网账户余额中，保证金退回后，独家资格失效。</p>
				 //        </Card>
				 //        <Card title="【独家退货】">
				 //          	<p>独家商品发生“特定条件（损坏，供应商产品质量问题）”退货，按照实际购买未退数量计算计入独家任务，在没有独家商品及时补充数量时，可以使用从新购买的其他产品补充数量，也可以等同类商品到货后顺延独家时间。如后期产品不足最低起订量，则取消本次独家记录和独家协议</p>
				 //        </Card>
		   //     		</div>
		   //     		<div>
					// 	<h5>———— 经营管理 ————</h5>
				 //        <Card title="【销售控制】">
				 //          	<p>荟酒网将监管国外厂家，不再向独家区域外的其他会员供货，并对紧邻区域做严格销售控制，发现恶意倾销、跨区域销售，立即停止供货，同时扣除保证金，以销售产品不计入任务量；最大限度保护联盟会员的经营利润。</p>
				 //        </Card>
				 //        <Card title="【市场支持】">
				 //          	<p>荟酒网将优先安排厂商代表协助会员举办客户回访、酒庄参观、酒会支持等销售助力活动。</p>
				 //        </Card>
				 //        <Card title="【信息保护】">
				 //          	<p>取得独家经营权后，不再向本地区其他客户展示相关商品价格信息。</p>
				 //        </Card>
				 //        <Card title="【关于补货】">
				 //          	<p>单款商品单笔订单补货数量大于等于主营地区独家起订量可延长相应的独家时间；补充约定。</p>
				 //        </Card>
				 //        <Card title="【保密服务】">
				 //          	<p>荟酒网不会向任何人泄露会员的产品和价格信息。</p>
				 //        </Card>
		   //     		</div>
		   //     		<div>
					// 	<h5>———— 买家义务 ————</h5>
				 //        <Card title="【禁止串货】">
				 //          	<p>独家产品禁止区域间串货。荟酒网将通过大数据技术手段实时监测产品流通情况。违约者，荟酒网将终止与您的独家协议，并进行索赔。</p>
				 //        </Card>
				 //        <Card title="【禁止网售】">
				 //          	<p>非经荟酒网及厂商书面许可，所有产品不得在网上商城、微信商城、手机商城等互联网流通渠道售卖。违规者，荟酒网将终止与您的独家协议，并按照已购产品的10倍价值及对其他客户造成损失两者孰高者主张侵权赔偿。全国独家不在此限制。</p>
				 //        </Card>
				 //        <Card title="【独家限制】">
				 //          	<p>省独家需注意省内是否存在市被其他用户独家的情况，系统会自动给出提示，用户若确认继续省独家操作，则省独家客户需承诺在市独家期限内不往该市销货；荟酒承诺在该市独家到期后不再与其用户续约；</p>
				 //        </Card>
				 //        <Card title="【协议声明】">
				 //          	<p>如用户确认独家操作，则视用户知晓并同意《荟酒网产品独家协议》，如用户有异议也可关闭独家操作。签订本协议，表明双方已就有关经营事项及各方的权利义务达成一致。本协议条款之解释与适用归荟酒网所有，但以不故意侵犯会员利益为限。</p>
				 //        </Card>
		   //     		</div>
		let isText={
			display:'none'
		}
		let submitBtn={
			width:'100%',
			height:'3rem',
			borderRadius:0,
			marginTop:0
		}
		return(
			<View className='SoleAgencyWap'>
				<Container scrollable={true}>
					<div className="SoleAgencyContent">
						<pre>
						{this.state.words}
						</pre>
					</div>
				</Container>
				<Button btnStyle={submitBtn} onClick={this.clickHandler} content='我已同意《芸酒荟产品独家协议》，下一步'/>
			</View>
	        
		)
	}
}
// 静态属性
SoleAgency.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(SoleAgency);