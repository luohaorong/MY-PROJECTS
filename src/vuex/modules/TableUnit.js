export default {
	state: {
		tableData: {},
		isLoading: true,
		priorityFlag: [],
		getFiles: [],
		handleFlag: 1,
		isClick:false,
		isPost:true,
		ipcTableState: {
			index: 1,
			size: {
				name: 10,
				id: 1
			},
			province: {
				name: "请选择省",
				id: -1
			},
			city: {
				name: "请选择市",
				id: -1
			},
			county: {
				name: "请选择区/县",
				id: -1
			},
			pushState: {        
				name: "推流状态",
				id: -1
			},
			onlineState: {
				name: "在线状态",
				id: -1
			},
			alarmState: {
				name: "IPC类型",
				id: -1
			},
			searchValue: ""
		},
		nvrTableState: {
			index: 1,
			size: {
				name: 10,
				id: 1
			},
			modeState: {
				name: "NVR 型号",
				id: -1
			},
			onlineState: {
				name: "在线状态",
				id: -1
			},
			searchValue: ""
		},
		accountTableState: {
			index: 1,
			size: {
				name: 10,
				id: 1
			}
		},
		firmwareTableState: {
			index: 1,
			size: {
				name: 10,
				id: 1
			},
			deviceType: {
				name: "设备类型",
				id: -1
			},
			deviceModel: {
				name: "设备型号",
				id: -1
			}
		},
		domainTableState: {
			index: 1,
			size: {
				name: 10,
				id: 1
			}
		},
		recordeState: {
			index: 1,
			size: {
				name: 10,
				id: 1
			},
			startTime: "1519833600",//
			endTime: "1522485276"//
		},
		//报警设备状态
		alarmTableState: {
			index: 1,
			size: {
				name: 10,
				id: 1
			},
			startTime: "",
			endTime: "",
			deviceState: {
				name: "设备类型",
				id: -1
			},
			warnState: {
				name: "报警类型",
				id: -1
			},
			searchValue: ""
		},
		//报警模板状态
		alarmTemplateTableState: {
			index: 1,
			size: {
				name: 12,
				id: 1
			},
			warnState: {
				name: "报警类型",
				id: -1
			}
		},
		handleItems: {
			option: [{
				type: "more",
				src: "/static/images/more.png"
			}],
			ipcIfor: [{
				type: "nvr",
				src: "/static/images/nvr.png"
			}],
			accountID: [{
				type: "delete",
				src: "/static/images/delete.png"
			}],
			firmwareId: [{
				type: "copy",
				src: "/static/images/copy.png"
			}, {
				type: "download",
				src: "/static/images/downdate.png"
			}, {
				type: "delete",
				src: "/static/images/delete.png"
			}],
			domainId: [{
				type: "more",
				src: "/static/images/more.png"
			}, {
				type: "delete",
				src: "/static/images/delete.png"
			}],
			priority: {
				src: "/static/images/rank.png",
				cacelsrc: "/static/images/cacel.png",
				oksrc: "/static/images/ok.png"
			}
		}
	},
	mutations: {
		upDateTableData: (state, data) => {
			state.tableData = data;
		},
		upDateIpcState: (state, data) => {
			state.ipcTableState = data;
		},
		upDateNvrState: (state, data) => {
			state.nvrTableState = data;
		},
		upDateAccountState: (state, data) => {
			state.accountTableState = data;
		},
		//固件状态
		upDateFirmwareState: (state, data) => {
			state.firmwareTableState = data;
		},
		upDateDomainState: (state, data) => {
			state.domainTableState = data;
		},
		upDatehandleFlag: (state, data) => {
			state.handleFlag = data;
		},
		//录制记录状态
		upDateRecordeState: (state, data) => {
			state.recordeState = data;
		},
		//已报警设备
		upDateAlarmTableState: (state, data) => {
			state.alarmTableState = data;
		},
		upAlarmTemplateTableState: (state, data) => {
			state.alarmTemplateTableState = data;
		},
		upDateRankFlag: (state, data) => {
			state.priorityFlag = data;
		},
		upDateGetFiles:(state, data) => {
			state.getFiles = data;
		},
		//是否可以继续点击获取录制视频文件
		upDateIsClick:(state, data) => {
			state.isClick = data;
		},
		//是否可以再次发请求获取table数据
		isPost:(state,data) => {
			state.isPost = data;
		}
	},
	actions: {
		upDateTableData({
			commit,
			state
		}, opt) {
			if(state.isPost){
				TOOLS.get(opt.src, opt.state).then(res => {
					state.isLoading = false;
					if(+res.data.code === 0) {
						let data = res.data;
						commit('upDateTableData', data);
						opt.fn && opt.fn.call(this, data);
					}else{
						commit('upDateTableData', {});
					};
					commit("isPost",true);
				}).catch(err => {
					state.isLoading = false;
					commit("isPost",true);
				});
				
			};
			commit("isPost",false);
		}
	},
	getters: {
		//第一个参数是state对象，第二个参数是getter对象；
		fliterData: (state, getter) => {
			state.tableData.data && state.tableData.data.map((item) => {
				item.createDate = getter.creatTime(item.createDate);
				item.startTime = getter.creatTime(item.startTime);
				item.endTime = getter.creatTime(item.endTime);
				item.registerTime = getter.creatTime(item.registerTime);
				item.updateDate = getter.creatTime(item.updateDate);
				item.streamStatus = getter.pushState(+item.streamStatus);
				item.state = getter.onlineState(+item.state);
				item.online = getter.nvrOnlineState(+item.online);
				item.status = getter.equipmentState(+item.status);
				item.romSize = getter.romSize(item.romSize);
				item.size = getter.romSize(item.size);
				item.pushAuthSwtich = getter.AuthSwtich(item.pushAuthSwtich);
				item.playAuthSwtich = getter.AuthSwtich(item.playAuthSwtich);
				item.alarmType = getter.alarmType(item.ruleType);
			});
			return state.tableData;
		},
		//可以通过让 getter 返回一个函数，来实现给 getter 传参
		creatTime: (state) => (seconds, separator) => {

			separator = separator || '.';

			if(seconds == '' || typeof seconds == 'undefined' || seconds == -1) return '';

			let d = new Date();
			d.setTime(seconds * 1000);
			let year = d.getFullYear();
			let month = d.getMonth() + 1;
			let date = d.getDate();
			let hh = d.getHours();
			let mm = d.getMinutes();
			let ss = d.getSeconds();

			return year + separator + (month < 10 ? '0' + month : month) + separator + (date < 10 ? '0' + date : date) +
				" " + (hh < 10 ? '0' + hh : hh) + ":" + (mm < 10 ? '0' + mm : mm) + ":" + (ss < 10 ? '0' + ss : ss);
		},
		pushState: (state) => (type) => {
			//'推流状态（1 推流中 2 未推流  3 未发布）',
			switch(type) {
				case 1:
					return "推流中";
				case 2:
					return "未推流";
				case 3:
					return "未发布";
				default:
					return "未发布"
			}
		},
		onlineState: (state) => (type) => {
			//状态（1 在线   2 离线 3 未知）',
			switch(type) {
				case 1:
					return "在线";
				case 2:
					return "离线";
				default:
					return "未知"
			}
		},
		nvrOnlineState: (state) => (type) => {
			//状态（1 在线   0 离线 ）',
			switch(type) {
				case 1:
					return "在线";
				case 0:
					return "离线"
			}
		},
		equipmentState: (state) => (type) => {
			//设备状态（1空闲，2下载中，3升级中，4设备重启中）
			switch(type) {
				case 1:
					return "空闲";
				case 2:
					return "下载中";
				case 3:
					return "升级中";
				case 4:
					return "设备重启中";
				default:
					return "未知"
			}
		},
		romSize: (state) => (type) => {
			
			
			
			let bytes = type;
			if(bytes === 0) return '0 B';
			let k = 1024;
			let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
			let i = Math.floor(Math.log(bytes) / Math.log(k));
			return(bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
		},
		AuthSwtich: (state) => (type) => {
			//true开启  false 关闭
			switch(type) {
				case true:
					return "开启";
				case false:
					return "关闭";
			}
		},
		alarmType: (state) => (type) => {
			switch(type) {
				case 1:
					return "视频丢失";
				case 2:
					return "视频遮挡";
			}
		},
	}

}