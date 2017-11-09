import React from 'react';
import {
	Container
} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
import oemDescribPage from '../assets/styles/oemDescribPage.less';
class OemDescribPage extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		document.title="OEM说明";
		bee.pushUrl();
	}
	render(){
		return(
			<Container scrollable={true}>
			<div className="top_container">
			    <p className="top_word1">
			        OEM定制是荟酒网为高端客户提供的专属服务；客户可以根据自己需求选择产品名称、设计，瓶型、酒体等，只要符合相关规定，荟酒网就可以为您专属定制属于您的原瓶原装进口葡萄酒，让您全国独家拥有属于自己的个性化品牌.
			    </p>
			    <div className="middle_container">
			        <p className="middle_container_word">
			            点击“<span className="kefu">客服</span>”了解更多详情；您也可以拨打您的客服专员电话028-87673828进行联系完成定制
			        </p>
			    </div>
			    <div className="bottom_container">
			        <a href="tel:028-87673828" className="call">028-87673828</a>
			    </div>
			    <p className="top_word2">
			        目前荟酒网提供两种OEM定制方式：
			    </p>
			    <p className="top_word3">
			        1、 快速定制：荟酒网在海关监管库长期有原瓶原装进口产品现货库存，根据您的需求，定制产品前后标签，快速报关、清关、出货，起订量低；
			    </p>
			    <p className="top_word3">
			        2、	自主定制：客户根据自己喜欢，选择瓶型、酒体、产地、瓶帽、包装等（只要符合相关规定都可以选择），自由组合定制客户自己所需的个性化产品，荟酒网在海外为客户完成独家自主定制.
			    </p>
			    <ul className="top_lists">
			        <li className="top_lists_li1">
			            原瓶原装
			        </li>
			        <li className="top_lists_li2">
			            高端服务
			        </li>
			        <li className="top_lists_li3">
			            荟酒护航
			        </li>
			    </ul>
			</div>
			</Container>
			)
	}
}
export default pureRender(OemDescribPage);