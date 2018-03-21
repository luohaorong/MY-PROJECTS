<template>
	<div class="container">
		<div class="alarm_top">
			<span class="page_title">报警管理</span>
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
				<select-unit class="type" :defaultItem="deviceState" :select-item="deviceType" @selectValue="getDeviceType"></select-unit>
				<select-unit class="type" :defaultItem="warnState" :select-item="warnType" @selectValue="getAlarnType"></select-unit>
				<SearchInput @searchClick="searchClick" :val="searchVal" class="ipc_search" :msg="msg" />
			</div>
		</section>

		<section class="table_container">
			<table-unit :tableData="tableData" :pageSize="pageSize" :columns="columns" :pageState="page" @pageIndex="pageIndex" @handle="handle">
			</table-unit>
		</section>
	</div>
</template>

<script>
	import selectUnit from "@/components/Select"
	import ButtonTemp from "@/components/ButtonTemp"
	import TableUnit from "@/components/TableUnit"
	import SearchInput from "@/components/SearchInput"
	import calendar from "@/components/Calendar"

	export default {
		name: "Firmware",
		components: {
			selectUnit,
			ButtonTemp,
			TableUnit,
			SearchInput,
			calendar
		},
		computed: {
			tableData() {
				return this.$store.getters.fliterData
			},
			tableState() {
				return this.$store.state.TableUnit.alarmTableState
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
				msg: {
					placeholder: "请输入关键字搜索",
					txt: "",
					readonly: false
				},
				numItem: {
					name: "showNumber",
					list: [{
						name: 10,
						id: 1
					}, {
						name: 20,
						id: 1
					}, {
						name: 50,
						id: 1
					}, {
						name: 100,
						id: 1
					}]
				},
				typeItems: [{
					txt: "已报警设备",
					tag: "alarn"
				}, {
					txt: "报警模板",
					tag: "template",
					background: "#ddd"
				}],
				deviceState: {
					name: "设备类型",
					id: -1
				},
				warmState: {
					name: "报警类型",
					id: -1
				},
				deviceType: {
					name: "deviceType",
					gray: "设备类型",
					list: [{
						name: "设备类型",
						id: -1
					}, {
						name: "IPC",
						id: 1
					}, {
						name: "NVR",
						id: 2
					}]
				},
				warnType: {
					name: "warnType",
					gray: "报警类型",
					list: [{
						name: "报警类型",
						id: -1
					}, {
						name: "视频遮挡",
						id: 1
					}, {
						name: "视频丢失",
						id: 2
					}]
				},
				columns: [{
						field: 'deviceId',
						title: '设备ID',
						width: 100,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle",
						formatter: function(rowData) {
							if(rowData.ipcId === "null") {
								return rowData.deviceId
							} else {
								return rowData.ipcId
							}
						}
					},
					{
						field: 'deviceType',
						title: '设备类型',
						width: 100,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle",
						formatter: function(rowData) {
							if(+rowData.deviceType === 5) {
								return "IPC直连"
							} else if(+rowData.deviceType === 4) {
								return "NVR下挂"
							}
						}
					},
					{
						field: 'cateringCosName',
						title: '商家名称',
						width: 100,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'cateringCosAddress',
						title: '商家地址',
						width: 160,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'warnTypeName',
						title: '报警类型',
						width: 120,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'upTime',
						title: '报警时间',
						width: 180,
						titleAlign: 'center',
						columnAlign: 'center',
						titleCellClassName: "headerStyle"
					}
				],
				tag: "",
				alarnTemplateList: [],
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
				}
			}
		},
		methods: {
			//每页显示多少条
			getSecVal(val) {
				this.tableState.size = val;
				this.pageSize = val.name;
				this.$store.commit("upDateAlarmTableState", this.tableState);
				this.upDateTable("/alarm/list", this.tableState);
			},
			//设备类型
			getDeviceType(val) {
				this.tableState.deviceState = val;
				this.$store.commit("upDateAlarmTableState", this.tableState);
				this.upDateTable("/alarm/list", this.tableState);
			},
			//报警类型
			getAlarnType(val) {
				this.tableState.warnState = val;
				this.$store.commit("upDateAlarmTableState", this.tableState);
				this.upDateTable("/alarm/list", this.tableState);
			},
			//点击搜索
			searchClick(val) {
				this.tableState.searchValue = val; //设置当前区
				this.$store.commit("upDateAlarmTableState", this.tableState);
				this.upDateTable("/alarm/list", this.tableState);
			},
			upDateTable(src, state) {
				let data = {
					pageIndex: state.index,
					pageSize: state.size.name,
					startTime: state.startTime,
					endTime: state.endTime,
					deviceType: state.deviceState.id === -1 ? "" : state.deviceState.id,
					warnType: state.warnState.id === -1 ? "" : state.warnState.id,
					searchValue: state.searchValue
				}

				this.$store.dispatch("upDateTableData", {
					src: src,
					state: data
				});
			},
			pageIndex(data) {
				this.tableState.index = data;
				this.page = data; //修改页码
				this.$store.commit("upDateAlarmTableState", this.tableState);
				this.upDateTable("/alarm/list", this.tableState)
			},
			topBtn(params) {
				this.tag = this.$route.query.tag;
				if(params.tag === "template") {
					this.$router.push("/Alarn/3/AlarnTemplate")
				}
			},
			handle(params) {
				let ipcId = this.ipcId;
			},
			//打开日历
			openByDialog() {
				this.calendar4.show = true;
			},
			//关闭
			closeByDialog(e) {
				this.calendar4.show = false;
			},
			select(begin,end){
				this.calendar4.show = false;
				this.calendar4.value = [begin, end];
				this.calendar4.display = begin.join("-") + " ~ " + end.join("-");
				
				this.tableState.startTime = begin.join("-"); //设置开始时间
				this.tableState.endTime = end.join("-"); //设置结束时间
				this.$store.commit("upDateAlarmTableState", this.tableState);
				this.upDateTable("/alarm/list", this.tableState);
			}
		},
		beforeMount() {
			//一下是获取table之前的状态
			this.startTime = this.tableState.startTime;
			this.endTime = this.tableState.endTime;
			this.size = +this.tableState.size; //获取每页显示多少条
			this.page = +this.tableState.index; //获取当前是第几页
			this.deviceState = this.tableState.deviceType;
			this.warnState = this.tableState.warnType;
			this.searchVal = this.tableState.searchValue;
			this.$store.commit("upDatehandleFlag", 4);
		},
		mounted() {
			let today = new Date();
			let year = today.getFullYear();
			let mouth = today.getMonth() + 1;
			let day = today.getDate();
			
			this.calendar4.value[0] = [year,mouth,day];
			this.calendar4.value[1] = [year,mouth,day];
			
			this.upDateTable("/alarm/list", this.tableState);
		}
	}
</script>

<style lang="less">
	@import url("../assets/styles/templete.less");
	@import url("../../static/plugin/calendar/calendar.css");
	.container {
		width: 90%;
		height: auto;
		margin: 0 auto;
		overflow: hidden;
		.alarm_top {
			display: flex;
			height: 108px;
			line-height: 108px;
			justify-content: space-between;
			align-items: center;
			.page_title {
				padding-right: 30px;
				line-height: 30px;
				font-size: 18px;
			}
		}
		.ipc_top {
			display: flex;
			justify-content: space-between;
			width: auto;
			height: auto;
			margin-bottom: 40px;
			padding-bottom: 40px;
			border-bottom: 1px solid #ddd;
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
				.flex{
					height: 40px;
					.selectTime{
						width: 322px;
						text-indent: 20px;
						color: #CCCCCC;
					}
				}
				.type {
					.vertical_line,
					.sec_item{
						height: 40px;
					}
					width: 120px;
				}
				.search-input {
					height: 40px;
					border: 1px solid #CCCCCC;
					>input {
						.widthHeightBbRadius(260px, 38px, #FFFFFF, 0);
					}
					.click-icon {
						right: 0;
						.widthHeightBbRadius(38px, 38px, #FFA671, 0);
						background: #FFA671 url(/static/images/ipcsearch.png) center center no-repeat;
					}
				}
			}
		}
		.alarnTemplate {
			display: flex;
			justify-content: flex-start;
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