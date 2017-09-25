import React from 'react';
import pureRender from 'pure-render-decorator';
import {Container} from 'amazeui-touch';
import {Link} from 'react-router';
export default pureRender(
	class GuidePage extends React.Component{
		componentDidMount(){
			bee.pushUrl();
			bee.cache('share_code', bee.getQueryString('share_code'));
			if(bee.getQueryString('code')){
				bee.cache('code',bee.getQueryString('code'));
			}else{
				bee.cache('redirectUri', window.location.href);
				bee.getCode('GuidePage');
			}
		}
		render(){
			return (
				<Container>
					<Link style={{display:'block',width:'100%',height:'100%'}} to='/RegistrationPortalPage'>
						<img style={{width:'100%',height:'100%'}} className='guideImg' src='/assets/images/guide.png'/>
					</Link>
				</Container>
			)
		}
	}
)