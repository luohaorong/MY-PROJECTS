import React from 'react';
import '../assets/styles/allRoute.less';

import {
  Container
} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';

 class AllRoute extends React.Component {
	constructor(props){
    super(props)
   
  }
	// 页面渲染
  render() {
  	// 默认参数
    const {
      children // 子组件内容
    } = this.props;
       
//    {React.cloneElement(children, {key: location.key})}
    return (
      <Container direction="column">
        <Container
          fill={true}
          className='allBg'
        >
	      {children}
        </Container>
      </Container>
    
    );
  }
}

export default pureRender(AllRoute);













