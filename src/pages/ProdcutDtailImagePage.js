import React from 'react';
import {View,Container} from 'amazeui-touch';
import ProductDtailHeader from '../components/ProductDtailHeader';
import pureRender from 'pure-render-decorator';
class ProdcutDtailImagePage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			productImages:''
		}
	}
	
	render(){
		let html={
			__html:bee.getQueryString('detail')
		};
		return(
			<View>
				<ProductDtailHeader/>
				<Container scrollable={true}>
					<div dangerouslySetInnerHTML={html}></div>
				</Container>
			</View>
		)
	}
}
export default pureRender(ProdcutDtailImagePage);