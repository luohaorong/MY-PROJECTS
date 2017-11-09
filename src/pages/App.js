import React from 'react';
import '../assets/styles/app.less';
import {
  Link
} from 'react-router';
import {
  Container,
  TabBar
} from 'amazeui-touch';
import pureRender from 'pure-render-decorator';

 class App extends React.Component {
	constructor(props){
    super(props)
    this.state={
      selected:'home',
      homeBgImage:{},
      listBgImage:{},
      shoppingBgImage:{},
      myBgImage:{}
    }
  }
	// 页面渲染
  render() {
  	// 默认参数
    const {
      location, // 地址信息
      children // 子组件内容
    } = this.props;
   
   // 获取上下文路由
   const {
      router
    } = this.context;
    
    // 过渡
    const transition = children.props.transition || 'sfs'; //rfr
       
//    {React.cloneElement(children, {key: location.key})}
    return (
      <Container direction="column">
        <Container
        	
          fill={true}
          
//           transition={transition}
          // fade transition example
          // transition='fade'
          // transitionEnterTimeout={450}
          // transitionLeaveTimeout={300}
        >
	      {children}
        </Container>
      

      </Container>
    
    );
  }
}

// 静态属性
App.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};

//================↑↑↑↑↑↑在定义App入口组件↑↑↑↑↑↑↑↑↑↑↑↑↑↑=====================
export default pureRender(App);













