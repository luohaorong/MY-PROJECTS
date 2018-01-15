<template>
	<div class="container">
		<section class="ipc_top">
			<div class="ipc_top_left" v-if="">
				<span class="page_title">固件列表</span>
				<p class="every_page_num">
					<span>每页</span>
					<select-unit class="show_num" :select-item="numItem" @selectValue="getSecVal"></select-unit>
					<span>条</span>
					<select-unit class="pushType" :select-item="divceType" @selectValue="push"></select-unit>
					<select-unit class="onlineType" :select-item="divceState" @selectValue="online"></select-unit>
				</p>
			</div>
			<div class="ipc_top_right">

			</div>
		</section>
		<section class="table_container">
			<table-unit :tableData="tableData" :columns="columns"></table-unit>
		</section>

	</div>
</template>

<script>
	import selectUnit from "@/components/Select"
	import ButtonTemp from "@/components/ButtonTemp"
	import TableUnit from "@/components/TableUnit"
	import { mapState } from "vuex"
	export default {
		name: "IPC",
		components: {
			selectUnit,
			ButtonTemp,
			TableUnit
		},
		computed: {
			...mapState(["isShow", "tipInputData"])
		},
		data() {
			return {
				numItem: {
					name: "showNumber",
					list: [10, 15, 20, 25, 30, 35]
				},
				divceType: {
					name: "pushType",
					gray: "设备类型",
					list: ["设备类型"]
				},
				divceState: {
					name: "onlineType",
					gray: "设备型号",
					list: ["设备型号"]
				},
				tableData: [],
				columns: [{
						field: 'romName',
						title: '固件名称',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'deviceTypeName',
						title: '设备类型',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'deviceModel',
						title: '设备型号',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'version',
						title: '版本号',
						width: 200,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'createDate',
						title: '上传时间',
						width: 200,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'romSize',
						title: '固件大小',
						width: 200,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'romMd5',
						title: '固件MD5',
						width: 200,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'remark',
						title: '备注',
						width: 200,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'option',
						title: '操作',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center'
					}
				]

			}
		},
		methods: {
			//每页显示多少条
			getSecVal(val) {
				TOOLS.get("/rom/list", {
					pageIndex: 1,
					pageSize: val
				}).then(res => {
					if(res.data.code === 0) {
						this.tableData = res.data.data;
					};
				})
			},
			//推流状态
			push(val) {
				console.log(val)

			},
			//在线状态
			online(val) {
				console.log(val)
			}
		},
		mounted() {
			TOOLS.get("/rom/list", {
				pageIndex: 1,
				pageSize: 10
			}).then(res => {
				if(res.data.code === 0) {
					this.tableData = res.data.data;
				};
			})
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
		.ipc_top {
			margin-top: 48px;
			display: flex;
			justify-content: space-between;
			width: auto;
			height: auto;
			margin-bottom: 20px;
			.ipc_top_left {
				.flexJustifyCentFlexstart();
				.page_title {
					padding-right: 30px;
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
		}
		.address, .pushType, .onlineType {
			width: 100px;
		}
		.headerStyle {
			background-image: linear-gradient(-270deg, #FFCE76 0%, #FFA671 100%);
			height: 70px;
			font-size: 16px;
			color: #5C5C5C;
		}
		/*.optionBtn{
			background-image: url("/src/assets/images/more.png");
			background-position: 0 0;
			background-repeat: no-repeat;
			width: 23px;
			height: 23px;
		}*/
	}
</style>