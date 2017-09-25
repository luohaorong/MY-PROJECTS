import React from 'react';
import '../assets/styles/filter.less';
import {Group,Grid,Col,Container} from 'amazeui-touch';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
const isChoose=[];
class Filter extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isSelected:[]
		}
		this.checkFilter = this.checkFilter.bind(this);
	}
  //组件渲染之前先定义状态，状态的结构和数据结构保持一致。
  componentDidMount(){
    let products=JSON.parse(bee.cache('typeProduct'));
    let arr=[];
    let sessionUuid=sessionStorage.getItem('uuid');
    let sessionArr=sessionUuid?sessionUuid.split(','):[];
    products.map(function(j,i){
        let tmp=[];
        j.attrValues.map(function(p,q){
          tmp.push(this.inArr(p.uuid,sessionArr));
        },this)
        arr.push(tmp)
    },this);
    if(sessionArr.length){
        let postP=!!this.and(arr);//用add方法把arr转化成一个bool值
        this.props.postParent(postP);//将bool值传到父组件（ClassTabs）
    }
    this.setState({
      isSelected:arr
    })
  }
  //判断一个元素是否在数组中
  inArr(element,arr){
    let flag=false;
    arr.map(function(i,j){
      if(i===element){
        flag=true;
        return false;
      }
    })
    return flag;
  }
   //每次接受新的props触发
  componentWillReceiveProps(nextProps) {
    let arr=[];  
    let active=nextProps.isActive;
    if(active){
      let activeIndex=active.getAttribute('data-index');
      let parentActive=active.parentNode.parentNode;
      let parentIndex=parentActive.getAttribute('data-index');
      //nextProps.isReset===this.props.isReset如果为true表示没有点击重置按钮，如果为false表示点击了重置按钮。
     nextProps.isReset===this.props.isReset?this.state.isSelected.map(function(item,i){
          let tmp=[];
          let choose=[];
          item.map(function(j,k){
              if (i==parentIndex && k==activeIndex) {
                tmp.push(!j);
              }else{
                tmp.push(j);
              }
          })
          arr.push(tmp);
      }):this.state.isSelected.map(function(item,i){
          let tmp=[];
          item.map(function(j,k){
              tmp.push(false);
              isChoose.splice(k,1);
              window.sessionStorage.setItem('uuid',isChoose)
          })
          arr.push(tmp);
          
      });
       
    }else{
        if(nextProps.isReset!==this.props.isReset){
            this.state.isSelected.map(function(item,i){
              let tmp=[];
              item.map(function(j,k){
                  tmp.push(false);
                  isChoose.splice(k,1);
                  window.sessionStorage.setItem('uuid',isChoose)
              })
              arr.push(tmp);
              
          });
        }else{
          let sessionUuid=window.sessionStorage.getItem('uuid');
          let sessionArr=sessionUuid?sessionUuid.split(','):[];
          sessionArr.map(function(i,j){
            isChoose.push(i)
          })
          let products=this.props.products;
          products.map(function(j,i){
              let tmp=[];
              j.attrValues.map(function(p,q){
                tmp.push(this.inArr(p.uuid,sessionArr));
              },this)
              arr.push(tmp)

          },this);
        let postP=!!this.and(arr);//用add方法把arr转化成一个bool值
        this.props.postParent(postP);//将bool值传到父组件（ClassTabs）
        }
    }
    this.setState({
      isSelected:arr
    })
  }
	//点击元素的时候改变被点击的元素对应的状态。
	checkFilter(e){
    let active=e.target;
    let activeIndex=active.getAttribute('data-index');
    let parentActive=active.parentNode.parentNode;
    let parentIndex=parentActive.getAttribute('data-index');
    let arr=[];
    this.state.isSelected.map(function(item,i){
        let tmp=[];
        item.map(function(j,k){
            if (i==parentIndex && k==activeIndex) {
              tmp.push(!j);
              let uuid=active.getAttribute('data-uuid');
              let uindex=isChoose.indexOf(uuid);
              j?isChoose.splice(uindex,1):isChoose.push(uuid);
            }else{
              tmp.push(j);
            }
        })
        arr.push(tmp);
        
    })
    this.setState({
      isSelected:arr
    })
    let postP=!!this.and(arr);//用add方法把arr转化成一个bool值
    this.props.postParent(postP);//将bool值传到父组件（ClassTabs）
    this.props.getActive(active);//将当前被点击的元素传到父组件（ClassTabs）
    sessionStorage.setItem('uuid',isChoose)
	}
  //把二维数组进行位与运算，最终输出一个值（0或者1，在此定义非0为true）。
	and (arr) {
        if (typeof arr === 'object') {
            let tmp = arr.length?false:true;
            arr.map(function(value, key) {
                if (typeof value === 'object') {
                    tmp |= this.and(value);
                } else {
                    tmp |= value;
                }
            },this);
            return tmp;
        }else{
          return arr;
        }
    }
	render(){
		let products=this.props.products;
        let firstItem;
    this.props.data&&this.props.data.map(function(item, i) {
        if (i==0) {
          firstItem=item;
        }
    })
    let firstUrl=firstItem&&firstItem.thumb;
		return(
              <Container className='TabsContainerRight' scrollable={true}>
              		<img style={this.props.isShow} className='classImg' src={this.props.url?bee.image(this.props.url):bee.image(firstUrl)}/>
              		<div className='tabsRightContainer'>
              			<div>
				 			{
				 				products.map(function(j,i){
				 					return (
					 					<div data-index={i} key={j.uuid} className='tabsRightContent'>
					 						<p className='tabsRightTitle'>{j.name}</p>
					 						<div className='tabNameFather'>
					 						{
					 							j.attrValues.map(function(item,index){
					 								return(
							                            <Link to = {'/ProductListPage?uuid=' + (this.props.name==="葡萄酒" ? 'putao' : 'jiushipin') + '&title=' + this.props.name + '&filter=' + item.uuid} data-index={index} data-uuid={item.uuid} key={item.uuid}  onClick={this.checkFilter} className='tabName'>
							                              {item.name}
							                              <img className='unBlock' src='../assets/images/classtype/danxuan.png'/>
							                            </Link>
					 								)
					 							},this)
					 						}
					 						</div>
					 					</div>
				 					)
				 				},this)
				 				
				 			}
 			
 						</div>
		             	<div style={{height:'10rem'}}></div>
              		</div>
              		
              </Container>
              
              
          	
			)
	}
}
export default pureRender(Filter);