import React from 'react';
import {Link} from 'react-router';
import '../assets/styles/agencyIndex.less';
import pureRender from 'pure-render-decorator';
class AgencyIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	y: 330,
    	angleL: 0,
    	angleR:0,
    	totalNum:10869.52,
    	zIndex:10,
    	data:{}
    };
    this.handleTouchEnd=this.handleTouchEnd.bind(this);
    this.handleTouchMove=this.handleTouchMove.bind(this);
    this.clickHeadal=this.clickHeadal.bind(this);
  }
//组件加载完成后监听事件
  componentDidMount() {
  	let that=this;
  	this.postIndex(that);
  	
  	let coin=this.refs.coin;
    coin.addEventListener('touchmove', this.handleTouchMove);
    coin.addEventListener('touchend', this.handleTouchEnd);
  }
	postIndex(that){
  	bee.post('/index', {}, function (data) {
			if (data.code) {
				alert(data.info);
				return;
			}
			data.data.total_bonus = bee.currency(data.data.total_bonus);
			data.data.this_week_bonus=bee.currency(data.data.this_week_bonus);
			data.data.this_month_bonus=bee.currency(data.data.this_month_bonus);
			data.data.last_month_bonus=bee.currency(data.data.last_month_bonus);
			data.data.agent_started_at=data.data.agent_started_at.split(' ')[0];
			data.data.agent_ended_at=data.data.agent_ended_at.split(' ')[0];
			that.setState({
				totalNum: data.data.total_bonus,
				data:data.data
			});
		}, true);
	}
  handleTouchMove = ({touches}) => {
    let e=touches[0];
    let pageY=e.pageY;
    this.setState({y:pageY,angleL:((this.state.y - 330)/5),angleR:(360-((this.state.y - 330)/5))});
    if(pageY - 330 >30){
    	this.setState({y : 360,angleL:6,angleR: 354});//金币下拉时最低状态
    }
    if(pageY - 330 < -10){
    	this.setState({y : 320,angleL:-1.7,angleR: 361.7});//金币上拉时最高状态
    }
    
  };
  //定义动画
	handleTouchEnd(){
		let coin=this.refs.coin;
		let left=this.refs.left;
		let right=this.refs.right;
		let money=this.refs.money;
		let current=this.refs.current;
		let totalNum=this.refs.totalNum;
		let week=this.refs.week;
		let This=this;
		let newTotalNum=Number(this.state.totalNum)*100;
		let oldTotalNum=Number(totalNum.innerHTML)*100;
		let timer;
		coin.style.animation= 'mycoin 1s ease'//金币移动动画
		left.style.animation='myleft 1s ease';
		right.style.animation='myright 1s ease';
		money.style.animation='mymoney 2s linear';
		if(newTotalNum!==oldTotalNum){
			timer=setInterval(function(){
					if(newTotalNum===oldTotalNum){
						clearInterval(timer);
						totalNum.style.animation='totalNum 0.5s ease';
					}else if(newTotalNum>oldTotalNum){
						oldTotalNum++;
						totalNum.innerHTML = oldTotalNum/100;
					}else if(newTotalNum<oldTotalNum){
						oldTotalNum--;
						totalNum.innerHTML = oldTotalNum/100
					}
			},1);
			current.style.animation='mycurrent 0.8s ease';
			week.style.animation='myweek 0.8s ease';
		}
		setTimeout(function(){
			clearInterval(timer);
			totalNum.innerHTML = newTotalNum/100;
			totalNum.style.animation='totalNum 0.5s ease';
		},2000)
		
	this.postIndex(This);
		
		setTimeout(function(){
			coin.style.animation='';
			left.style.animation='';
			right.style.animation='';
			money.style.animation='';
			current.style.animation='';
			week.style.animation='';
			This.setState({
				y: 330,
				angleL: 0,
				angleR:0
			})
			
		},1000)
	}
	clickHeadal(e){
		let active=e.currentTarget;
		let count=this.state.zIndex;
		let type= active.getAttribute('data-type');
		sessionStorage.setItem('type',type)
		let This=this;
		count++;
		this.setState({
			zIndex:count
		})
		active.style.zIndex=this.state.zIndex;
		active.style.animation='myweek 0.8s ease';
		setTimeout(function(){
			active.style.animation='';
			This.context.router.push('/GeneralDetailsPage'); // 手动路由
		},800);
	}
  render() {
    return (
          <div className="wraper">
          	<div className='bonusTitle'>
          		分红总额
          	</div>
          	<div className='totalNumWrap'>
          		<span ref='totalNum' className='totalNum'>
          			{this.state.data.total_bonus}
          		</span>
          		<p className='bonusIfo'>
          			{this.state.data.areas_name}{this.state.data.agent_type=='province'?'省级代理':'市级代理'}，时长：{this.state.data.agent_started_at}到{this.state.data.agent_ended_at}
          		</p>
          	</div>
          	<Link to='/SearchDetailPage' className='Detailed'></Link>
						<div className='leftWraper'>
              <img
              	ref='left'
              	src='../assets/images/agencyIndex/left.png'
                className={'left'}
                style={{
                  WebkitTransform: `rotate(${this.state.angleL}deg)`,
                  transform: `rotate(${this.state.angleL}deg)`
                }} />
              </div>
              <div className='rightWraper'>
              <img 
              	ref='right'
              	src='../assets/images/agencyIndex/right.png'
                className={'right'}
                style={{
                  WebkitTransform: `rotate(${this.state.angleR}deg)`,
                  transform: `rotate(${this.state.angleR}deg)`
                }} />
              </div>
              <img 
              	ref='coin'
              	src='../assets/images/agencyIndex/corn.png'
                className={'coin'}
                style={{
                  WebkitTransform: `translateY(${this.state.y - 330}px)`,
                  transform: `translateY(${this.state.y - 330}px)`
                }} />

              <img ref='money' className='money' src='../assets/images/agencyIndex/money.png'/>
              <div ref='week' data-type='week' className='weekNumWrap' onClick={this.clickHeadal}>
              	<div className='weekContentWrap'>
		          		<span className='sign'>
		          			¥
		          		</span>
		          		<span ref='weekNum' className='weekNum'>
		          			{this.state.data.this_week_bonus}
		          		</span>
		          		<p className='weekText'>
		          			本周
		          		</p>
              	</div>
	          	</div>
          	<div ref='last' data-type='last'  className='lastNumWrap' onClick={this.clickHeadal}>
          		<div className='lastContentWrap'>
	          		<span className='sign'>
	          			¥
	          		</span>
	          		<span ref='lastNum' className='lastNum'>
	          			{this.state.data.last_month_bonus}
	          		</span>
	          		<p className='lastText'>
		          			上月
		          		</p>
          		</div>
          	</div>
          	<div ref='current' data-type='current' className='currentNumWrap' onClick={this.clickHeadal}>
          		<div className='currentContentWrap'>
	          		<span className='sign'>
	          			¥
	          		</span>
	          		<span ref='currentNum' className='currentNum'>
	          			{this.state.data.this_month_bonus}
	          		</span>
	          		<p className='currentText'>
		          			本月
		          		</p>
          		</div>
          	</div>
          </div>
    );
  }
}
// 静态属性
AgencyIndex.contextTypes = {
    router: React.PropTypes.object.isRequired // 向模块组件中，注入路由
};
export default pureRender(AgencyIndex);