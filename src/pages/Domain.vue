<template>
	<div class="container">
		<section class="ipc_top">
			<div class="ipc_top_left" v-if="">
				<span class="page_title">域名列表</span>
				<p class="every_page_num">
					<span>每页</span>
					<select-unit class="show_num" :select-item="numItem" @selectValue="getSecVal"></select-unit>
					<span>条</span>
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
				tableData: [],
				columns: [{
						field: 'pushHost',
						title: '推流域名',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'playHost',
						title: '播放域名',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'name',
						title: '服务商',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'createDate',
						title: '创建时间',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'upperLimit',
						title: '推流上限',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'publishedNumber',
						title: '已发布推流数',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					}, {
						field: 'priorityNumber',
						title: '域名优先级',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					}, {
						field: 'playAuthSwtich',
						title: '播放鉴权状态',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					}, {
						field: 'pushAuthSwtich',
						title: '推流鉴权状态',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'id',
						title: '操作',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center'
					}

				]

			}
		},
		methods: {
			//每页显示条数
			getSecVal(val) {
				TOOLS.get("/stream", {
					pageIndex: 1,
					pageSize: val
				}).then(res => {
					if(res.data.code === 0) {
						console.log(res.data.data)
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
			},
			//发布推流地址，升级，重启
			prompt(index) {
				var data = this.tipData[index];
				this.$store.commit("tipInputData", data);
				this.$store.commit("isShow", true);
			}
		},
		mounted() {
			TOOLS.get("/stream", {
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
			height: 30px;
			margin-bottom: 20px;
			.ipc_top_left {
				.flexJustifyCentFlexstart();
				align-items: center;
				font-size: 18px;
				color: #5C5C5C;
				.page_title {
					padding-right: 30px;
				}
				.every_page_num {
					width: 120px;
					height: 30px;
					font-size: 16px;
					.flexJustifyCentFlexstart();
					align-items: center;
					.show_num {
						width: 50px;
					}
				}
				.address {
					width: 100px;
				}
			}
			.ipc_top_right {
				.flexJustifyCentFlexend ();
				.button-style {
					.btnStyle();
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
	}
</style>