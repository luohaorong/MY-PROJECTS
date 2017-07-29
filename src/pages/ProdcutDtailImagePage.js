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
	componentWillMount(){
		this.setState({
			productImages:'../assets/images/productDtail/dtailImg.png'
		})
		console.log(this.state.productImages);
	}
	render(){
		return(
			<View>
				<ProductDtailHeader/>
				<Container scrollable={true}>
					<img src={this.state.productImages}/>
				</Container>
			</View>
		)
	}
}
export default pureRender(ProdcutDtailImagePage);