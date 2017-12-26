# 使用说明
###一、功能概述
loadSDk.js主要用于提升前端页面性能，使用它你可以将页面中不会经常改变的图片或者文件（js或css）保存到用户本地数据库；
用户再次访问该页面时就会直接从用户本地数据库读取文件，不会再次加载，从而大大的提升页面性能，减少对服务器的访问。
###二、查看案例
克隆或则下载压缩包到本地，进入项目目录，打开命令行。<br/>
执行 npm install 或则 cnpm install<br/>
然后执行 npm start<br/>
最后打开浏览器访问localhost:8888/index.html<br/>
###三、使用说明
从下载的案例项目中拷贝js文件夹下的loadSDK.js到自己的项目中，并引入该文件（注意在body后面引入）；<br/>
		<script src="/js/loadSDK.js"></script><br/>
引入后调用window.uilt.implement(data,img,fn)便可已使用。该方法接受三个参数：<br/>
1、第一个参数是定义数据库相关信息及需要存储的文件（必需）；<br/>
data对象有四个属性分别是name、storeName、version和dataList。<br/>
name是数据库名称；<br/>
storeName是数据库集合名称<br/>
version是数据库版本，只能是正整数，并且版本号只能增加不能减少；如果版本号改变会重新加载所有文件<br/>
dataList定义的是需要存储的文件，改属性是一个数组，数组的每个元素是一个对象，该对象有name、type、version、resourcesSrc这四个属性；<br/>
name是文件的名称；<br/>
type是文件的类型，只有js、css、img这三个值<br/>
version是该文件的版本号，改版本号为正整数，可增可减，一旦改变会重新加载该文件；<br/>
resourcesSrc是文件加载的路径；<br/>
2、第二个参数是图片显示的img标签（可选）；<br/>
3、第三个参数是该方法执行完后的回调函数（可选）；<br/>
如果要存储和显示图片，那么一定要在需要显示图片的img标签上添加data-name的属性,属性值是存储图片时的name属性值；<br/>
例如：<img class="huanbao" data-name="1.jpg" src=""/>

		<script type="text/javascript">
			var data = {
					name: 'luohaorong'//数据库名称,
					storeName:'index'//数据库集合名称,
					version:8//数据库版本号(正整数，只能增加),
					dataList:[{
						name:"common.css",//是文件的名称
						type:"css",//文件类型
						version:1,//文件版本
						resourcesSrc:"/css/common.css"//文件加载路径
					},{
						name:"jquery.js",
						type:"js",
						version:2,
						resourcesSrc:"/js/jquery.js"
					},{
						name:"common.js",
						type:"js",
						version:2,
						resourcesSrc:"/js/common.js"
					},{
						name:"wx.js",
						type:"js",
						version:2,
						resourcesSrc:"/js/wx.js"
					},{
						name:"1.jpg",
						type:'img',
						version:1,
						resourcesSrc:"/images/1.jpg"
					},{
						name:"2.jpg",
						type:'img',
						version:2,
						resourcesSrc:"/images/2.jpg"
					},{
						name:"3.png",
						type:'img',
						version:1,
						resourcesSrc:"/images/3.jpg"
					},{
						name:"4.png",
						type:'img',
						version:3,
						resourcesSrc:"/images/4.jpg"
					},{
						name:"5.png",
						type:'img',
						version:1,
						resourcesSrc:"/images/5.jpg"
					}]
				}
			var img = document.getElementsByTagName("img");
			window.uilt.implement(data,img,function(){
					//这里是执行完成后的回调函数
			});
		</script>
