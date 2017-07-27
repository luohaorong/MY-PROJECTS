import React from 'react';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import '../assets/styles/searchAll.less';
class SearchAll extends React.Component{
	render(){
		return(
			<div className='searchWrap'>
				<div className='searchContainer'>
					<p className='addUp'>
						<span className='addUpText'>
							累计已提现:
						</span>
						<span className='addUpNumber'>
							&yen;{this.props.addUpNumber}
						</span>
					</p>
					<Link className='search' data-status='' to='/CashDetailPage' onClick={this.props.onClick}>
						查看全部
					</Link>
				</div>
			</div>
		)
	}
}
export default pureRender(SearchAll);
