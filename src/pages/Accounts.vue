<template>
	<div class="container">
		<section class="ipc_top">
			<div class="ipc_top_left" v-if="">
				<span class="page_title">账号列表</span>
				<p class="every_page_num">
					<span>每页</span>
					<select-unit class="show_num" :select-item="numItem" @selectValue="getSecVal"></select-unit>
					<span>条</span>
				</p>
			</div>
			<div class="ipc_top_right">
				<ButtonTemp v-for="(item,index) in items" :message="item" class="button-style" @btnClick="prompt(index)"></ButtonTemp>
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
				items: ["创建账号", "重置密码"],
				tipData: [{
					title: "创建账号",
					type: "account",
					tip: [{
							name: "username",
							placeholder: "请输入账号(20字以内)",
							type: "text",
							maxlength: "20",
							reg: /^[A-Za-z0-9]{6,16}$/,
							errorTip: "密码错误"
						},
						{
							name: "password",
							placeholder: "请输入密码(6-20字以内)",
							type: "password",
							maxlength: "20",
							reg: /^[A-Za-z0-9]{6,16}$/,
							errorTip: "密码错误"
						}, {
							name: "password",
							placeholder: "请再次输入密码",
							maxlength: "20",
							type: "password",
							reg: /^[A-Za-z0-9]{6,16}$/,
							errorTip: "密码错误"
						}
					],
					notice: ""
				}, {
					title: "重置密码",
					type: "handletips",
					optiontype: "resetpwd",
					tip: [{
						text: "密码重置后不可恢复，确定要重置吗？"
					}, {
						text: "(重置后的密码: sax123456)"
					}]
				}],
				tableData: [],
				columns: [{
						width: 60,
						titleAlign: 'center',
						columnAlign: 'center',
						type: 'selection',
						titleCellClassName: "headerStyle"
					},
					{
						field: 'username',
						title: '账号',
						width: 80,
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
						field: 'id',
						title: '操作',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						formatter: function() {
							return "<img src='/src/assets/images/more.png' />"
						}
					}
				]
			}
		},
		methods: {
			//每页显示数
			getSecVal(val) {
				TOOLS.get("/user", {
					pageIndex: 1,
					pageSize: val
				}).then(res => {
					if(+res.data.code === 0) {
						this.tableData = res.data.data;
					};
				})
			},
			//创建账号，重置密码
			prompt(index) {
				let data = this.tipData[index];
				this.$store.commit("tipInputData", data);
				this.$store.commit("isShow", true);
			}
		},
		mounted() {
			TOOLS.get("/user", {
				pageIndex: 1,
				pageSize: 10
			}).then(res => {
				if(+res.data.code === 0) {
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