<template>
	<div class="container">
		<section class="ipc_top">
			<div class="ipc_top_left" v-if="">
				<span class="page_title">账号列表</span>
				<p class="every_page_num">
					<span>每页</span>
					<select-unit class="show_num" :select-item="numItem" :defaultItem="size" @selectValue="getSecVal"></select-unit>
					<span>条</span>
				</p>
			</div>
			<div class="ipc_top_right">
				<ButtonTemp v-for="(item,index) in items" :message="item" :keys="index" class="button-style" @btnClick="prompt(index)"></ButtonTemp>
			</div>
		</section>
		<section class="table_container">
			<table-unit :tableData="tableData" :columns="columns" :pageState="page" @pageIndex="pageIndex" @handle="handle" @getSelects="getSelect"></table-unit>
		</section>
	</div>
</template>

<script>
	import selectUnit from "@/components/Select"
	import ButtonTemp from "@/components/ButtonTemp"
	import TableUnit from "@/components/TableUnit"
	import TableOperation from "@/components/TableOperation"
	export default {
		name: "IPC",
		components: {
			selectUnit,
			ButtonTemp,
			TableUnit,
			TableOperation
		},
		computed: {
			tableData() {
				return this.$store.getters.fliterData
			},
			tableState() {
				return this.$store.state.TableUnit.accountTableState
			},
			setIds() {
				return this.$store.state.PromptBox.tableHandleIds
			}
		},
		data() {
			return {
				size: {
					name: 10,
					id: 1
				},
				page: 1,
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
				items: [{
					txt: "创建账号",
					background: ""
				}, {
					txt: "重置密码",
					background: ""
				}],
				selectedData: [],
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
							name: "newpassword",
							placeholder: "请再次输入密码",
							maxlength: "20",
							type: "password",
							reg: /^[A-Za-z0-9]{6,16}$/,
							errorTip: "密码错误"
						}
					]
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
				tip: {
					title: "温馨提示",
					type: "handletips",
					flag: false,
					optiontype: "onoff",
					tip: [{
						text: "请先选择需要操作的数据！"
					}]
				},
				columns: [{
						width: 100,
						titleAlign: 'center',
						columnAlign: 'center',
						type: 'selection',
						titleCellClassName: "headerStyle"
					},
					{
						field: 'username',
						title: '账号',
						width: 200,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'createDate',
						title: '创建时间',
						width: 200,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'accountID',
						title: '操作',
						width: 180,
						titleAlign: 'center',
						columnAlign: 'center',
						componentName: 'TableOperation'
					}
				]
			}
		},
		methods: {
			//每页显示数
			getSecVal(val) {
				this.tableState.size = val;
				this.$store.commit("upDateAccountState", this.tableState);
				this.upDateTable("/user", this.tableState);
			},
			//创建账号，重置密码
			prompt(index) {
				let data = this.tipData[index];
				let ids = this.$store.state.PromptBox.tableHandleIds.ids;

				if(data.type == "account") {
					this.$store.commit("tipInputData", data);
					this.$store.commit("isShow", true);
				} else if(!ids) {
					this.$store.commit("tipInputData", this.tip);
					this.$store.commit("isShow", true);
				} else {
					this.$store.commit("tipInputData", data);
					this.$store.commit("isShow", true);
				}
			},
			//更新表格数据
			upDateTable(src, state) {
				let data = {
					pageIndex: state.index,
					pageSize: state.size.name
				}
				this.$store.dispatch("upDateTableData", {
					src: src,
					state: data
				});
			},
			//每页显示数量
			pageIndex(data) {
				this.tableState.index = data;
				this.page = data; //修改页码
				this.$store.commit("upDateAccountState", this.tableState);
				this.upDateTable("/user", this.tableState)
			},
			handle(params) {
				//删除账号
				if(params.type === "delete") {
					let id = params.id;
					TOOLS.delete("/user/" + id, {}).then(res => {
						if(+res.data.code === 0) {
							this.$store.commit("isBlock");
							this.$store.commit("message", res.data.message);
							this.$store.commit("err", false);
							this.upDateTable("/user", this.tableState);
						};
					}).catch(err => {
						this.$store.commit("isBlock");
						this.$store.commit("message", err.message);
						this.$store.commit("err", false);
					})
				}
			},
			//获得ids
			getSelect(arr) {
				this.$store.commit("tableHandleIds", arr);
			}
		},
		beforeMount() {
			this.size = +this.tableState.size; //获取每页显示多少条
			this.page = +this.tableState.index; //获取当前是第几页
			this.$store.commit("tableHandleIds", []);
		},
		mounted() {
			this.upDateTable("/user", this.tableState);
			this.$store.commit("isShow", false);
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
			height: 70px;
			font-size: 16px;
			color: #5C5C5C;
		}
	}
</style>