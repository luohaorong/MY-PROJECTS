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
				<select-unit class="type" :defaultItem="warnState" :select-item="warnType" @selectValue="getAlarnType"></select-unit>
			</div>
			<div class="ipc_top_right">
				<ButtonTemp :message="newAlarn" :keys="'btn'" class="button-style" @btnClick="topBtn(newAlarn)"></ButtonTemp>
			</div>
		</section>

		<section class="table_container">
			<div class="alarnTemplate">
				<AlarnTemplate @weekClick="weekClick" v-for="item in tableData.data" :itemAlarnList="item" @deleteTemplate="deleteTemplate"></AlarnTemplate>
			</div>
		</section>
		<v-pagination :pageActive="page" :total="tableData['recordsTotal']" :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next', 'jumper']" @page-change="pageChange">
		</v-pagination>
	</div>
</template>

<script>
	import selectUnit from "@/components/Select"
	import ButtonTemp from "@/components/ButtonTemp"
	import TableUnit from "@/components/TableUnit"
	import AlarnTemplate from "@/components/AlarnTemplate"

	export default {
		name: "Firmware",
		components: {
			selectUnit,
			ButtonTemp,
			TableUnit,
			AlarnTemplate
		},
		computed: {
			tableData() {
				return this.$store.getters.fliterData
			},
			tableState() {
				return this.$store.state.TableUnit.alarmTemplateTableState
			}
		},
		data() {
			return {
				size: {
					name: 12,
					id: 1
				}, //记录table每页显示多少条，切换页面返回当前页面后依然保持之前所选的值
				page: 1, //记录table是第几页，切换页面返回当前页面后依然保持之前所选的值
				pageSize: 12, //每页显示多少条
				startTime: "",
				endTime: "",
				numItem: {
					name: "showNumber",
					list: [{
						name: 12,
						id: 1
					}, {
						name: 36,
						id: 1
					}, {
						name: 60,
						id: 1
					}, {
						name: 120,
						id: 1
					}]
				},
				typeItems: [{
					txt: "已报警设备",
					tag: "alarn",
					background: "#ddd"
				}, {
					txt: "报警模板",
					tag: "template"
				}],
				deviceState: {
					name: "设备类型",
					id: -1
				},
				newAlarn: {
					txt: "新建报警模板",
					tag: "new"
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
						id: 2
					}, {
						name: "视频丢失",
						id: 1
					}]
				},
				tip: {
					title: "温馨提示",
					type: "handletips",
					flag: false,
					optiontype: "deleteTemplate",
					tip: [{
						text: "确定要删除该模板吗？"
					}]
				},
				tag: "",
				alarnTemplateList: []
			}
		},
		methods: {
			//每页显示多少条
			getSecVal(val) {
				this.tableState.size = val;
				this.pageSize = val.name;
				this.$store.commit("upAlarmTemplateTableState", this.tableState);
				this.upDateTable("/alarm/templates", this.tableState);
			},
			//报警类型
			getAlarnType(val) {
				this.tableState.warnState = val;
				this.$store.commit("upAlarmTemplateTableState", this.tableState);
				this.upDateTable("/alarm/templates", this.tableState);
			},
			upDateTable(src, state) {
				let data = {
					pageIndex: state.index,
					pageSize: state.size.name,
					ruleType: state.warnState.id === -1 ? "" : state.warnState.id
				}

				this.$store.dispatch("upDateTableData", {
					src: src,
					state: data
				});
			},
			pageChange(data) {
				this.tableState.index = data;
				this.page = data; //修改页码
				this.$store.commit("upAlarmTemplateTableState", this.tableState);
				this.upDateTable("/alarm/templates", this.tableState)
			},
			topBtn(params) {
				if(params.tag === "alarn") {
					this.$router.push("/Alarn/3/AlarmDevices")
				}
				if(params.tag === "new") {
					this.$router.push("/NewAlarm")
				}
			},
			deleteTemplate(id) {
				this.$store.commit("tableHandleIds", id);
				this.$store.commit("tipInputData", this.tip);
				this.$store.commit("isShow", true);
			},
			weekClick(val){
				
			}
		},
		beforeMount() {
			//一下是获取table之前的状态
			this.size = +this.tableState.size; //获取每页显示多少条
			this.pageSize = this.tableState.size.name; //获取每页显示多少条,给分页组件
			this.page = +this.tableState.index; //获取当前是第几页
			this.warnState = this.tableState.warnType;
			this.$store.commit("upDatehandleFlag", 5);
		},
		mounted() {
			this.upDateTable("/alarm/templates", this.tableState);
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
				.type {
					width: 120px;
				}
			}
			.type {
				width: 120px;
			}
		}
		.alarnTemplate {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			-ms-flex-pack: justify;
			width: 100%;
			margin-right: -20px;
			
			.wraper{
				margin-right: 1.4%;
				margin-bottom: 30px;
			}
		}
		.headerStyle {
			height: 70px;
			font-size: 16px;
			color: #5C5C5C;
		}
		.button-style {
			.widthHeightBbRadius(110px, 30px, #ffa671, 15px);
			.centerLinehFontsColor(30px, 14px);
			background-image: linear-gradient(-270deg, #FFCE76 0%, #FFA671 100%);
		}
	}
</style>