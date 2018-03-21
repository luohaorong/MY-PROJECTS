export default {
	state: {
		isInput: [],
		value: [],
		edit: [],
		editData: {},
		isEdit: false,
		ruleData: [],
		releaseType: 0 //发布规则默认为0
	},
	mutations: {
		isInput: (state, n) => {
			state.isInput = n
		},
		value: (state, data) => {
			state.value = data;
		},
		edit: (state, data) => {
			state.edit = data;
		},
		editData: (state, data) => {
			state.editData = data;
		},
		isEdit: (state, data) => {
			state.isEdit = data;
		},
		isSet: (state, data) => {
			state.isSet = data;
		},
		//按规则发布数据  数组
		ruleData: (state, data) => {
			state.ruleData = data;
		},
		//发布规则类型
		releaseType: (state, data) => {
			state.releaseType = data;
		}

	},
	actions: {
		//提交请求
		pullData({
			commit,
			state,
			getters
		}, opt) {
			for(var i in opt.params) {
				if(opt.reg && opt.params[opt.reg.target] ===  opt.params[i]){
					var regTest = opt.reg.reg.test(opt.params[opt.reg.target]);
				};
				if(opt.params.hasOwnProperty(i) && (opt.params[i] === "" || opt.params[i] === undefined || regTest)) {
					let message = opt.reg && opt.reg.message;
					let errMsg = message || "请填写正确格式的值";
					commit("isBlock", true);
					commit("message", errMsg);
					commit("err", true);
					let editData = {};
					getters.mapBody(opt.body,(k,h,p,q)=>{
						editData[q.key] = state.value[k][h][q.key];
						q.value = state.value[k][h][q.key];
					});
					commit("editData",editData);
					return false;
				}
			}
			TOOLS[opt.type](opt.src, opt.params).then(res => {
				if(res.data.code === 0) {
					commit("isBlock", true);
					commit("message", res.data.message);
					commit("err", false);
					if(opt.data) {
						getters.editState(opt.body, opt.data.i, opt.data.p, opt.data.k, true, res => {
							commit("editData", res);
						});
					}
				} else {
					let editData = {};
					getters.mapBody(opt.body, (k, h, p, q) => {
						editData[q.key] = state.value[k][h][q.key];
						q.value = state.value[k][h][q.key];
					});
					commit("editData", editData);
				}
				opt.fn && opt.fn.call(this, res);
			}).catch(res => {
				let editData = {};
				getters.mapBody(opt.body, (k, h, p, q) => {
					editData[q.key] = state.value[k][h][q.key];
					q.value = state.value[k][h][q.key];
				});
				commit("editData", editData);
			})
		}
	},
	getters: {
		//遍历数据
		mapBody: (state) => (data, fn1, fn2) => {
			data.map((i, k) => {
				i.content.map((j, h) => {
					j.txt.map((q, p) => {
						if(q.isEdit || j.isEdit) {
							fn1 && fn1.call(this, k, h, p, q);
						} else {
							fn2 && fn2.call(this, k, h, p, q);
						}
					})

				});
			});
		},
		//修改状态
		editState: (state, getter) => (data, i, p, k, bol, fn) => {
			let editData = {};
			getter.mapBody(data, (k, h, p, q) => {
				editData[q.key] = q.value;
				bol ? state.value[k][h][q.key] = q.value : "";
			});
			fn && fn.call(this, editData);
		},
		detailData: (state) => (data) => {
			let inpArr = [];
			let valArr = [];
			let editArr = [];
			let editData = {};
			let len = data.length;
			len && data.map((i, p) => {
				let inpTmp = [];
				let valTmp = [];
				let editTmp = [];

				i.content.map((j, q) => {
					let tmp = [];
					let val = {};
					let edit = j.isEdit;
					let eArr = [];
					j.txt.map((k, h) => {
						eArr.push(false);
						tmp.push(false);
						val[k.key] = k.value;
						if(k.isEdit || j.isEdit) {
							editData[k.key] = k.value
						}
					});
					let bol = eArr.some(item => {
						return item === true;
					});
					editTmp.push(bol);
					inpTmp.push(tmp);
					valTmp.push(val);
				});
				inpArr.push(inpTmp);
				editArr.push(editTmp);
				valArr.push(valTmp);
			});
			state.isInput = inpArr;
			state.edit = editArr;
			state.editData = editData;
			state.value = valArr;
		},
		screenData: (state) => (body) => {
			let filter = {};
			//设备状态（1空闲，2下载中，3升级中，4设备重启中）
			switch(body.status) {
				case 1:
					filter.status = "空闲";
					break;
				case 2:
					filter.status = "下载中";
					break;
				case 3:
					filter.status = "升级中";
					break;
				case 4:
					filter.status = "设备重启中";
					break;
				default:
					filter.status = "未知";
			};
			//推流状态（1 推流中 2 未推流  3 未发布）
			switch(body.streamStatus) {
				case 1:
					filter.streamStatus = "推流中";
					break;
				case 2:
					filter.streamStatus = "未推流";
					break;
				case 3:
					filter.streamStatus = "未发布";
					break;
				default:
					filter.streamStatus = "未知";
			};
			//在线状态（1 在线   2 离线 3 未知）
			switch(body.state) {
				case 1:
					filter.state = "在线";
					break;
				case 2:
					filter.state = "离线";
					break;
				case 3:
					filter.state = "未知";
					break;
				default:
					filter.state = "未知";
			};
			//录制状态（1 未录制 2 录制中）
			switch(body.recordStaus) {
				case 1:
					filter.recordStaus = "未录制";
					break;
				case 2:
					filter.recordStaus = "录制中";
					break;
				default:
					filter.recordStaus = "未知";
			};
			//推流协议（1 RTMP 2 RTSP 3 RTMP & RTSP）
			switch(body.push && body.push.pushProtocol) {
				case 1:
					filter.pushProtocol = "RTMP";
					break;
				case 2:
					filter.pushProtocol = "RTSP";
					break;
				case 3:
					filter.pushProtocol = "RTMP & RTSP";
					break;
				default:
					filter.pushProtocol = "";
			};
			//1 直推IPC  2  需要网关  3 可以通过mqtt控制的ipc
			switch(body.device && body.device.deviceType) {
				case 1:
					filter.deviceType = "直推IPC";
					break;
				case 2:
					filter.deviceType = "需要网关";
					break;
				case 3:
					filter.deviceType = "可以通过mqtt控制的ipc";
					break;
				default:
					filter.deviceType = "未知";
			};
			switch(body.pushType) {
				case 0:
					filter.pushType = "普通推流";
					break;
				case 1:
					filter.pushType = "边缘推流";
					break;
				default:
					filter.pushType = "";
			};
			return filter;
		}
	}

}