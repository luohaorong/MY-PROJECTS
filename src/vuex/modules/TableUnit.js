export default {
	state:{
		tableData:{},
		isLoading:true
	},
	mutations:{
		upDateTableData: (state,data)=>{
			state.tableData = data;
		}
	},
	actions:{
		upDateTableData ({ commit,state },opt){
			TOOLS.get(opt.src,{
				pageIndex:opt.index,
				pageSize:opt.size
			}).then(res=>{
				state.isLoading = false;
				if(res.data.code === 0){
					let data = res.data;
					commit('upDateTableData',data)
				};
			}).catch(err=>{
				state.isLoading = false;
			})
    	}
	},
	getters:{
		//第一个参数是state对象，第二个参数是getter对象；
		fliterData:(state,getter)=>{
			state.tableData.data && state.tableData.data.map((item)=>{
				item.createDate = getter.creatTime(item.createDate);
				item.registerTime = getter.creatTime(item.registerTime);
				item.updateDate = getter.creatTime(item.updateDate);
				item.streamStatus = getter.pushState(+item.streamStatus);
				item.state = getter.onlineState(+item.state);
				item.status = getter.equipmentState(+item.status);
			});
			return state.tableData;
		},
		//可以通过让 getter 返回一个函数，来实现给 getter 传参
		creatTime:(state)=>(now)=>{
			let time = new Date(now)
			let year = time.getFullYear();     
            let month = time.getMonth()+1;     
            let date = time.getDate();     
            let hour = time.getHours();     
            let minute = time.getMinutes(); 
			return year+"-"+month+"-"+date+"   "+hour+":"+minute;
		},
		pushState:(state)=>(type)=>{
			//'推流状态（1 推流中 2 未推流  3 未发布）',
			switch(type){
				case 1:
				return "推流中";
				case 2:
				return "未推流";
				case 3:
				return "未发布";
				default : return "未知"
			}
		},
		onlineState:(state)=>(type)=>{
			//状态（1 在线   2 离线 3 未知）',
			switch(type){
				case 1:
				return "在线";
				case 2:
				return "离线";
				default : return "未知"
			}
		},
		equipmentState:(state)=>(type)=>{
			//设备状态（1空闲，2下载中，3升级中，4设备重启中）
			switch(type){
				case 1:
				return "空闲";
				case 2:
				return "下载中";
				case 3:
				return "升级中";
				case 4:
				return "设备重启中";
				default : return "未知"
			}
		}
	}
	
}