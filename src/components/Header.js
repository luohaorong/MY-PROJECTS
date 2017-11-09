import React from 'react';
import pureRender from 'pure-render-decorator';
import {
  Link
} from 'react-router';
import '../assets/styles/header.less';
import triangleTop from '../assets/images/register/triangleTop.png';
import triangleSub from '../assets/images/register/triangleSub.png';
import {
	Container
} from 'amazeui-touch';
class Header extends React.Component {
	constructor(props){
		super(props);
		this.state={
			isMiddleImg:{
				display:'none'
			},
			middleStyleSub:{
				display:'none'
			},
			middleStyleTop:{
				display:'none'
			},
			isRightImg:{
				display:'none'
			},
			triangleImg:triangleSub,
			selectListStyle:{
				top:'-500px'
			},
			topSub:'top',
			MiddleTextTop:this.props.MiddleTextTop,
			MiddleTextSub:this.props.MiddleTextSub,
			skinStyle:{
				display:'none'
			}
			
		};
		this.clickHandler=this.clickHandler.bind(this);
		this.listChange=this.listChange.bind(this);
	}
	componentWillMount(){
		let middleImg=this.props.middleImg;
		let middleSub=this.props.middleSub;
		let middleTop=this.props.middleTop;
		let rightImg=this.props.rightImg;
		
		if(middleImg){
			this.setState({
				isMiddleImg:{
				display:'block'
				}
			})
		}else{
			this.setState({
				selectListStyle:{
				display:'none'
				}
			})
		}
		if(middleSub&&middleTop){
			this.setState({
				middleStyleSub:{
					display:'block',
					fontSize:'0.8rem',
					top:'0.8rem'
				},
				middleStyleTop:{
					display:'block',
					top:'-0.5rem'
				}
			})
		}else{
			if(middleSub){
				this.setState({
					middleStyleSub:{
					display:'block'
					}
				})
			}
			if(middleTop){
				this.setState({
					middleStyleTop:{
					display:'block'
					}
				})
			}
		}
		
		if(rightImg){
			this.setState({
				isRightImg:{
				display:'block'
				}
			})
		}
	}
	componentDidMount(){
		let middleImg=this.props.middleImg;
		let dataSign=sessionStorage.getItem('dataSign');
		if(dataSign==='agency'){
			this.setState({
				MiddleTextTop:'经销商用户注册'
			})
		}
		if(dataSign==='company'){
			this.setState({
				MiddleTextTop:'企业用户注册'
			})
		}
		if(middleImg){
			let dataKey=sessionStorage.getItem('dataSign');
			this.props.postParent(dataKey);
		}
	}
	clickHandler(){
		let middleImg=this.props.middleImg;
		if(middleImg){
			if(this.state.topSub==='top'){
				this.setState({
					triangleImg:triangleTop,
					selectListStyle:{
						top:'2.75rem'
					},
					topSub:'sub',
					skinStyle:{
						display:'block'
					}
				})
			}else{
				this.setState({
					triangleImg:triangleSub,
					selectListStyle:{
						top:'-500px'
					},
					topSub:'top',
					skinStyle:{
						display:'none'
					}
				})
			}
		}
	}
	listChange(event){
		let targ=event.target;
		let listText=targ.innerHTML;
		let dataKey=targ.getAttribute('data-key');
		sessionStorage.setItem('dataSign',dataKey);
		this.props.postParent(dataKey);
		this.setState({
			MiddleTextTop:listText,
			selectListStyle:{
				top: '-500px'
			},
			triangleImg:triangleSub,
			topSub:'top',
			skinStyle:{
				display:'none'
			}
		})
	}
	render(){
		let rightText=this.props.rightText||'';
		let imgRight=this.props.imgRight||'';
		let headerListContent=this.props.headerListContent||[];
		let This=this;
		return (
			<div>
				<Container className='HederWapper'>
					<div className='backContainer'>
						<p className='backIcoWap'>
							<img className='backIco' src=''/>
						</p>
						<p className='textMiddle' onClick={this.clickHandler}>
							<span style={this.state.middleStyleTop} className='middleTop'>{this.state.MiddleTextTop}</span>
							<span style={this.state.middleStyleSub} className='middleSub'>{this.state.MiddleTextSub}</span>
							<img style={this.state.isMiddleImg} className='middleImg' src={this.state.triangleImg}/>
						</p>
						<p className='textRight' style={this.props.isText}>
							<Link to='/RegisterCompanyAccountPage' style={this.props.textContent} className='textContent'>
								{rightText}
							</Link>
						</p>
						<img className='textRight' 	style={this.state.isRightImg} src={imgRight}/>
					</div>
				</Container>
				<ul className='selectList' style={this.state.selectListStyle}>
					{
						headerListContent.map(function (item,i) {
		
							return 	<li ref='list' key={i} data-key={item.uuid} onClick={This.listChange} className='listItem'>{item.name}</li>;
									
						})
					}
				</ul>
				<div className='skin' style={this.state.skinStyle}></div>
			</div>
		)
	}
}
Header.defaultProps = {
	middleImg:false,
	middleSub:false,
	rightImg:false,
	middleTop:false
};
Header.contextType={
	router:React.PropTypes.object.isRequired // 向模块组件中，注入路由
}
export default pureRender(Header);