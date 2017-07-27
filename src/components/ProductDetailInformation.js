import React from 'react';
import {Tabs} from 'amazeui-touch';
import '../assets/styles/productDetailInformation.less';
import AgencyBox from '../components/AgencyBox';
class ProductDetailInformation extends React.Component{
	constructor(props){
		super(props);
		this.state={
			albums:{},
			boos:{}
		}
	}
	render(){
		const Ptitle1=(
						<div>
							<span>经销商</span>
						</div>
					)
		const Ptitle2=(
						<div>
							<span>企业用户</span>
						</div>
					)
		
		const Pdesc1=(
						<AgencyBox Data1={this.props.Data1} maybe={true}/>
					)
		const Pdesc2=(
						<AgencyBox Data1={this.props.Data2} maybe={true}/>
					)
		
		const albums = [
						  {
						    title:Ptitle1,
						    desc: Pdesc1
						      
						  },
						  {
						    title: Ptitle2,
						    desc: Pdesc2
						  }
						];
		
		let num=albums.length;
		return(
					<Tabs className='proDeInfoContainer'>
			            {albums.map((ablum, i) => {
				              	return (
							                <Tabs.Item title={ablum.title} key={i} disabled={i === num}>
							                  		{ablum.desc}
							                </Tabs.Item>
						                
				              	)
			            	})
			        	}
			        </Tabs>
			)
	}
}
export default ProductDetailInformation;