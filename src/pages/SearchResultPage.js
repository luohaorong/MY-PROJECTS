import React from 'react';
import SearchBar from '../components/SearchBar';
import {View,Container} from 'amazeui-touch';
import HomeHotProduct from '../components/HomeHotProduct';
import pureRender from 'pure-render-decorator';
class SearchResultPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			productListData:[]
		}
		this.postKeyWords=this.postKeyWords.bind(this);
	}
	componentDidMount(){
		document.title='搜索结果';
		let This=this;
		let keyword=bee.cache('keywords');
		this.refs['search'].refs['filter'].value=keyword;
		bee.post('/wechat/search',{
			'keyword':keyword
		},function(data){
			if (data.error_code==0) {
				This.setState({
					productListData:data.data
				})
			}
		},true);
	}
	postKeyWords(keyword){
		let This=this;
		bee.post('/wechat/search',{
			'keyword':keyword
		},function(data){
			if (data.error_code==0) {
				This.setState({
					productListData:data.data
				})
			}
		},true);
	}
	render(){
		const height={
			'height':'0'
		}
		return(
			<View>
				<SearchBar ref='search' place='请输入您要搜索的内容' postKeyWords={this.postKeyWords}/>
				<Container className='scrollWrapper' scrollable={true}>
					<HomeHotProduct height={height} productListData={this.state.productListData}/>
				</Container>
			</View>
			)
	}
}
export default pureRender(SearchResultPage)