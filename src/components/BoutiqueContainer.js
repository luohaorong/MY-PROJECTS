import React from 'react';
import product from '../assets/images/home/product.png';
import {Link} from 'react-router';
import boutiqueContainer from '../assets/styles/boutiqueContainer.less';
import LoadMore from './LoadMore';
import {Container} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';
class BoutiqueContainer extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let boutique=this.props.boutique || [];
		const bouContainer=(
				boutique.map(function(item,i){
					return(
						<Link key={i} className="boutiqueContainer" to={'/ProductDtailPage?uuid='+item.goods_uuid}>
							<div className="boutiqueTopContainer">
								<img className="boutiqueTopImg" src={bee.image(item.goods_thumb,280,400)}/>
								<div className="boutiqueTopRight">
									<div className="boutiqueTopRightOne">
										<p className="boutiqueChateau">{item.chateau_name}</p>
										<p className="boutiqueDescrib">{item.reputation[0]}</p>
									</div>
									<div className="boutiqueTopRightTwo">
										<div className="boutiquePrice">{bee.currency(item.goods_lowest_price)}</div>
										<div className="boutiqueSure">立即购买</div>
									</div>
								</div>
							</div>
							<div className="boutiqueBottomContainer">
								<p>{item.content}</p>
							</div>
						</Link>
					)	
				})
			)
		return(
			<Container className="scrollWrapper" scrollable={true}>
				{bouContainer}
				<LoadMore isGetData={this.props.isGetData} noData={this.props.noData} loadStyle={this.props.loadStyle}/>
			</Container>
			)
	}
}
export default pureRender(BoutiqueContainer);