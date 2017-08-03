//引入模块
require('normalize.css/normalize.css');
require('styles/Login.less');

import React from 'react';
var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 4))
//let yeomanImage = require('../images/icon.png');

//定义
class AppComponent extends React.Component {
  render() {
    return (
      <h1>mockjs</h1>
    );
  }
}
AppComponent.defaultProps = {
};
//导出
export default AppComponent;
