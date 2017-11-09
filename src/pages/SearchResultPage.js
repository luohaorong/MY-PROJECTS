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
		bee.pushUrl();
		document.title='搜索结果';
		let This=this;
		let keyword1=bee.getQueryString('keyword');
		let keyword=bee.cache('keywords');
		if (keyword1!=='') {
			this.refs['search'].refs['filter'].value=keyword1;
			bee.get('/wechat/search/'+keyword1,{
			},function(data){
				if (data.error_code==0) {
					This.setState({
						productListData:data.data
					})
				}
			},true);
		}else{
			this.refs['search'].refs['filter'].value=keyword;
			bee.get('/wechat/search/'+keyword,{
			},function(data){
				if (data.error_code==0) {
					This.setState({
						productListData:data.data
					})
				}
			},true);
		}
	}
	postKeyWords(keyword){
		let This=this;
		bee.get('/wechat/search/'+keyword,{
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
					<HomeHotProduct height={height} productListData={this.state.productListData} loadStyle={{'display':'none'}}/>
				</Container>
			</View>
			)
	}
}
export default pureRender(SearchResultPage)