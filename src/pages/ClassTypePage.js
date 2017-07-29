import React from 'react';
import {Container,View,Tabs,Card,Button} from 'amazeui-touch';
import SearchBar from '../components/SearchBar';
import ClassTabs from '../components/ClassTabs';
import pureRender from 'pure-render-decorator';
class ClassTypePage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
			products:{}
		}
	}
	
	componentDidMount(){
		let This=this;
		bee.post('/wechat/goods/categories',{},function(data) {
			console.log(data)
			if(data.error_code) {
				alert(data.info);
				return;
			}else{
				This.setState({
					albums:data.data
				})
			}
		},true);
	}
	render(){
		
const products=[
			
				
				{
				pTitle:'产品',
				pAdvice:[
					{
						title:'法国',
						uuid:'1'
					},
					{
						title:'西班牙',
						uuid:'2'	
					},
					{
						title:'澳大利亚',
						uuid:'3'	
					},
					{
						title:'智利',
						uuid:'4'	
					}
				],
				uuid:'1'
			},
			{
				pTitle:'价格',
				pAdvice:[
					{
						title:'0-20元',
						uuid:'5'
					},
					{
						title:'21-30元',
						uuid:'6'	
					},
					{
						title:'31-40元',
						uuid:'7'	
					},
					{
						title:'41-50元',
						uuid:'8'	
					}
				],
				uuid:'2'
			},
			{
				pTitle:'产品',
				pAdvice:[
					{
						title:'法国',
						uuid:'9'
					},
					{
						title:'西班牙',
						uuid:'10'	
					},
					{
						title:'澳大利亚',
						uuid:'11'	
					},
					{
						title:'智利',
						uuid:'12'	
					}
				],
				uuid:'3'
			}
			

	]
		
    
     
		return(
      <View>
				
					<SearchBar/>
					<ClassTabs album={this.state.albums} products={products}/>
          
      </View>
			)
	}
}
ClassTypePage.contextTypes={
	router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(ClassTypePage);