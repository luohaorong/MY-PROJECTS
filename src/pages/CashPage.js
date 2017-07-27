import React from 'react';
import pureRender from 'pure-render-decorator';
import {Link} from 'react-router';
import CashHeader from '../components/CashHeader';
import SearchAll from '../components/SearchAll';
import  '../assets/styles/cashPage.less';
import {Container,Grid,Col} from 'amazeui-touch';
class CashPage extends React.Component{
	constructor(props) {
    super(props);
    this.state={
    	data:{}
    }
    this.handleClick=this.handleClick.bind(this);
   }
	componentDidMount(){
		let that=this;
  		bee.post('/index', {}, function (data) {
			if (data.code) {
				alert(data.info);
				return;
			}
			data.data.rest_bonus=bee.currency(data.data.total_bonus-data.data.total_withdrawal);
			data.data.total_bonus = bee.currency(data.data.total_bonus);
			data.data.total_withdrawal=bee.currency(data.data.total_withdrawal);
			sessionStorage.setItem('rest_bonus',data.data.rest_bonus);
			that.setState({
				data:data.data
			});
		}, true);
	}
	handleClick(e){
		let curent= e.currentTarget;
		let status_type=curent.getAttribute('data-status');
		bee.cache('status',status_type);
	}
	render(){
		return(
			<Container>
				<CashHeader remainderMoney={this.state.data.rest_bonus} remainder='分红余额'/>
				<SearchAll addUpNumber={this.state.data.total_withdrawal} onClick={this.handleClick}/>
				<Grid className='bottomTabWrap' avg={3}>
					<Col className='bottomTab' data-status='ing' onClick={this.handleClick}>
		            	<Link className='itemWrap' to='/CashDetailPage'>
		            		<div className='imgWrap firstImg'>
		            		</div>
			            	待审核
	            		</Link>
		            </Col>
		            <Col className='bottomTab' data-status='no' onClick={this.handleClick}>
		            	<Link className='itemWrap' to='/CashDetailPage'>
		            		<div className='imgWrap secImg'>
		            		</div>
			            	未通过
	            		</Link>
		            </Col>
		            <Col className='bottomTab' data-status='yes' onClick={this.handleClick}>
		            	<Link className='itemWrap' to='/CashDetailPage'>
		            		<div className='imgWrap thrImg'>
		            		</div>
			            	已完成
	            		</Link>
		            </Col>
		    </Grid>
				
			</Container>
		)
	}
}
export default pureRender(CashPage);
