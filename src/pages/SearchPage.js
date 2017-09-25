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
		
	}
	componentDidMount(){
		document.title='热门搜索';
		let This=this;
		bee.get('/wechat/hot/word',{},function(data){
			if (data.error_code==0) {
				This.setState({
					data:data.data
				})
			}
		},true);
	}
	
	render(){
		const link=(
				this.state.data&&this.state.data.map(function(item,i){
					return(
							<Link key={i} className='hotContent' to={'/ProductListPage'+ item.url}>{item.name}</Link>
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
export default pureRender(SearchPage)