<template>
	<div class="container">
		<div class="alarm_top">
			<span class="page_title">录制状态</span>
			<ButtonTemp v-for="item in items" :message="item" :keys="'btn'" class="button-style" @btnClick="topBtn(item)"></ButtonTemp>
		</div>
		<section class="ipc_top">
			<div class="ipc_top_left">
				<ButtonTemp v-for="item in typeItems" :message="item" :keys="'btn'" class="button-style deviceType" @btnClick="topBtn(item)"></ButtonTemp>
				<p class="every_page_num">
					<span>每页</span>
					<select-unit class="show_num" :select-item="numItem" :defaultItem="size" @selectValue="getSecVal"></select-unit>
					<span>条</span>
				</p>
			</div>
			<div class="ipc_top_right">
				<span>选择时间 </span>
				<div class="flex">
					<input type="text" class="selectTime" @click="openByDialog" :value="calendar4.display" readonly>
					<transition name="fade">
						<div class="calendar-dialog" v-if="calendar4.show">
							<div class="calendar-dialog-body">
								<calendar :range="calendar4.range" :zero="calendar4.zero" :lunar="calendar4.lunar" :value="calendar4.value" @select="select"></calendar>
								<div class="closeByDialog"><span @click="closeByDialog">取消</span></div>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</section>
		<section class="table_container">
			<table-unit :tableData="tableData" :pageSize="pageSize" :columns="columns" :pageState="page" @pageIndex="pageIndex" @handle="handle"></table-unit>
		</section>
	</div>
</template>

<script>
	import selectUnit from "@/components/Select"
	import ButtonTemp from "@/components/ButtonTemp"
	import TableUnit from "@/components/TableUnit"
	import calendar from "@/components/Calendar"
	export default {
		name: "Firmware",
		components: {
			selectUnit,
			ButtonTemp,
			TableUnit,
			calendar
		},
		computed: {
			tableData() {
				return this.$store.getters.fliterData
			},
			tableState() {
				return this.$store.state.TableUnit.recordeState
			}
		},
		data() {
			return {
				size: {
					name: 10,
					id: 1
				}, //记录table每页显示多少条，切换页面返回当前页面后依然保持之前所选的值
				page: 1, //记录table是第几页，切换页面返回当前页面后依然保持之前所选的值
				pageSize: 10, //每页显示多少条
				startTime: "",
				endTime: "",
				numItem: {
					name: "showNumber",
					list: [{
						name: 10,
						id: 1
					}]
				},
				items: [{
					txt: "返回",
					tag: "back"
				}],
				typeItems: [{
					txt: "设备端",
					tag: "device"
				}],
				columns: [{
						field: 'name',
						title: '文件名称',
						width: 120,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'size',
						title: '文件大小',
						width: 90,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'startTime',
						title: '开始时间',
						width: 160,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'endTime',
						title: '结束时间',
						width: 160,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'firmwareId',
						title: '操作',
						width: 180,
						titleAlign: 'center',
						columnAlign: 'center',
						componentName: 'GetRecordFiles',
						titleCellClassName: "headerStyle"
					}
				],
				ipcId: "",
				calendar4: {
					display: "起始时间   ~ 结束时间",
					show: false,
					range: true,
					zero: true,
					value: [
						["", "", ""],
						["", "", ""]
					], //默认日期
					lunar: false
				},
				count:0,
				setTimer:''
			}
		},
		methods: {
			//每页显示多少条
			getSecVal(val) {
				this.tableState.size = val;
				this.pageSize = val.name;
				this.$store.commit("upDateRecordeState", this.tableState);
				this.upDateTable("/camera/records?ipcId=" + this.ipcId, this.tableState)
			},
			upDateTable(src, state) {
				let data = {
					pageIndex: state.index,
					pageSize: state.size.name,
					startTime: state.startTime,
					endTime: state.endTime
				}
				this.$store.dispatch("upDateTableData", {
					src: src,
					state: data
				});
			},
			pageIndex(data) {
				this.tableState.index = data;
				this.page = data; //修改页码
				this.$store.commit("upDateRecordeState", this.tableState);
				this.upDateTable("/camera/records?ipcId=" + this.ipcId, this.tableState)
			},
			topBtn(params) {
				if(params.tag === "back") {
					window.history.go(-1)
				}
			},
			handle(params) {
				let ipcId = this.ipcId;
				var timer,setTimer,count = 1;
				let data = {
					ipcId: ipcId,
					fileName: params.name
				}
				let loadParam = {};
				for( let i in params){
					if(params.hasOwnProperty(i)){
						loadParam[i] = params[i];
					}
				};
				if(+params.statusCode !== 1) {
					let _this = this;
					TOOLS.get("/camera/getRecordFile", data).then(res => {
						if(+res.data.code === 0) {
							if(+params.statusCode === 2) {
								window.open(params.url, '_blank')
							}else if(+params.statusCode === 0){
								this.$store.commit("upDateIsClick",true);
								let startTime = new Date(loadParam.startTime)
								let endTime = new Date(loadParam.endTime)
								loadParam.startTime = startTime.getTime();
								loadParam.endTime = endTime.getTime();
								delete loadParam.size;
								let loadData = {
									"nvrId": loadParam.deviceId,
									"ipcId": loadParam.ipcId,
									"files": [loadParam]
								}
								timer = setInterval(function() {
									_this.refreshRecords(loadData, timer, _this,params);
								}, 5000)
								this.tipsFcn(this, "正在获取，完成后即可下载");
							}
						}else{
							params.statusCodeInfo && this.tipsFcn(this, params.statusCodeInfo);
						}
					})
				}else{
					this.tipsFcn(this, "文件正在获取中，请稍等...");
				}
			},
			refreshRecords(data, timer,_this,params) {
				TOOLS.post("/camera/refreshRecords", data).then(res => {
					if(+res.data.code === 0) {
						params.statusCode = res.data.data[0].statusCode;
						if(+res.data.data[0].statusCode !== 1){
							clearInterval(timer);
							clearTimeout(this.setTimer);
							_this.$store.commit("upDateIsClick",false);
						}else {
							//避免设置多个延迟
							if(_this.count === 0){
								this.setTimer = setTimeout(function(){
									clearInterval(timer);
									_this.$store.commit("upDateIsClick",false);
									_this.tipsFcn(_this, "文件获取超时...");
									_this.count = 0;
								},60000);
							}
							_this.count++;
						}
					}
				})
			},
			tipsFcn(_this, msg) {
				_this.$store.commit("isShow", false);
				_this.$store.commit("isBlock");
				_this.$store.commit("message", msg);
				_this.$store.commit("err", false);
			},
			openByDialog() {
				this.calendar4.show = true;
			},
			closeByDialog(e) {
				this.calendar4.show = false;
			},
			select(begin, end) {
				let beginTime = begin.join("-");
				let endTime = end.join("-");
				this.calendar4.show = false;
				this.calendar4.value = [begin, end];
				this.calendar4.display = beginTime + " ~ " + endTime;
				
				let endMS = ["23","59","59"].join(":");
				
				endTime = endTime +" "+ endMS;   //endTime  "2018-03-21 23:59:59"

				this.tableState.startTime = this.getTime(beginTime); //设置开始时间
				this.tableState.endTime = this.getTime(endTime); //设置结束时间

				this.$store.commit("upDateRecordeState", this.tableState);
				this.upDateTable("/camera/records?ipcId=" + this.ipcId, this.tableState);
			},
			//生成时间戳
			getTime(str) {
				let dateStr, time;
				str = str.replace(/-/g, '/');
				dateStr = new Date(str);
				time = dateStr.getTime() / 1000;
				return time
			}
		},
		beforeMount() {
			//一下是获取table之前的状态
			this.ipcId = this.$route.query.ipcId
			this.startTime = this.tableState.startTime;
			this.endTime = this.tableState.endTime;
			this.size = +this.tableState.size; //获取每页显示多少条
			this.page = +this.tableState.index; //获取当前是第几页
			this.$store.commit("upDatehandleFlag", 6);
		},
		mounted() {
			let today = new Date();
			let year = today.getFullYear();
			let mouth = today.getMonth() + 1;
			let day = today.getDate();
			this.calendar4.value[0] = [year, mouth, day];
			this.calendar4.value[1] = [year, mouth, day];
			let str = this.calendar4.value[0].join("-");
			let nowTime = this.getTime(str);
			let startTime = nowTime - 3 * 86400; //向后推三天

			this.tableState.startTime = startTime; //设置开始时间
			this.tableState.endTime = nowTime; //设置现在时间
			
			
			console.log("sdfasdf",this.tableData)
			console.log("tableState",this.tableState)
			
			this.upDateTable("/camera/records?ipcId=" + this.ipcId, this.tableState);
		}
	}
</script>

<style scoped lang="less">
	@import url("../assets/styles/templete.less");
	.container {
		width: 90%;
		height: auto;
		margin: 0 auto;
		overflow: hidden;
		padding-bottom: 126px;
		.alarm_top {
			display: flex;
			height: 108px;
			line-height: 108px;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ddd;
			.page_title {
				padding-right: 30px;
				line-height: 30px;
				font-size: 18px;
			}
		}
		.ipc_top {
			margin-top: 18px;
			display: flex;
			justify-content: space-between;
			width: auto;
			height: auto;
			margin-bottom: 20px;
			.ipc_top_left {
				.flexJustifyCentFlexstart();
				align-items: center;
				.deviceType {
					.widthHeight(150px, 40px);
					background: #FFB272;
					line-height: 40px;
					text-align: center;
					cursor: pointer;
					margin-right: 10px;
					font-size: 15px;
					color: #5C5C5C;
					border-radius: 0;
				}
				.every_page_num {
					width: 120px;
					height: 30px;
					line-height: 28px;
					.flexJustifyCentFlexstart();
					.show_num {
						width: 50px;
					}
				}
			}
			.ipc_top_right {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				height: 40px;
				margin-right: 20px;
				.flex {
					margin-left: 10px;
					height: 40px;
					.selectTime {
						width: 322px;
						text-align: center;
						color: #CCCCCC;
					}
				}
			}
		}
		.closeByDialog{
			width: 100%;
			height: 36px;
			display: flex;
			justify-content: flex-end;
			
			span{
				display: inline-block;
				width: 60px;
				height: 34px;
				text-align: center;
				line-height: 34px;
				border-radius: 12px;
				background: #FFA671;
				color: #fff;
				cursor: pointer;
			}
		}
		.headerStyle {
			height: 70px;
			font-size: 16px;
			color: #5C5C5C;
		}
		.button-style {
			.widthHeightBbRadius(100px, 36px, #ffa671, 18px);
			.centerLinehFontsColor(36px, 14px);
		}
	}
</style>