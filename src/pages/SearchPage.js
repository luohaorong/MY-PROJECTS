import React from 'react';
import {Link} from 'react-router';
import {Container} from 'amazeui-touch';
import SearchBar from '../components/SearchBar';
import '../assets/styles/searchPage.less';
import pureRender from 'pure-render-decorator';
class SearchPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:[]
		}
		this.clickHandle=this.clickHandle.bind(this);
	}
	componentDidMount(){
		document.title='热门搜索';
		bee.pushUrl();
		let This=this;
		bee.get('/wechat/hot/word',{},function(data){
			if (data.error_code==0) {
				This.setState({
					data:data.data
				})
			}
		},true);
	}
	clickHandle(e){
		let active=e.currentTarget;
		let keyword=active.getAttribute('data-name');
		this.context.router.push('/SearchResultPage?keyword='+keyword);
	}
	render(){
		const link=(
				this.state.data&&this.state.data.map(function(item,i){
					return(
							<div key={i} className='hotContent' data-name={item.name} onClick={this.clickHandle}>{item.name}</div>
						)
				},this)
			)
		return(
				<Container>
					<SearchBar place='请输入您要搜索的内容'/>
					<div className="hotContainer">
						<p className="hotWords">热门搜索</p>
						<div className="hotWrap">
							{link}
						</div>
						
					</div>
				</Container>
			)
	}
}
SearchPage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(SearchPage)