<template>
	<div class="container">
		<section class="ipc_top">
			<div class="ipc_top_left">
				<span class="page_title">域名列表</span>
				<p class="every_page_num">
					<span>每页</span>
					<select-unit class="show_num" :select-item="numItem" :defaultItem="size" @selectValue="getSecVal"></select-unit>
					<span>条</span>
				</p>
			</div>
			<div class="ipc_top_right">
				<router-link to="/Domain/1/CreateDomain"><img src="/static/images/addnew.png" /></router-link>
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
	export default {
		name: "IPC",
		components: {
			selectUnit,
			ButtonTemp,
			TableUnit
		},
		computed: {
			tableData() {
				return this.$store.getters.fliterData
			},
			tableState() {
				return this.$store.state.TableUnit.domainTableState
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
				rankData: {
					src: "/static/images/delete.png"
				},
				tipdata: {
					title: "温馨提示",
					type: "handletips",
					flag: false,
					optiontype: "onoff",
					tip: [{
						text: "该域名下有以发布的设备，不可以删除！"
					}]
				},
				columns: [{
						field: 'pushHost',
						title: '推流域名',
						width: 220,
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
						width: 100,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'createDate',
						title: '创建时间',
						width: 100,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'upperLimit',
						title: '推流上限',
						width: 100,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'publishedNumber',
						title: '已发布推流数',
						width: 100,
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
						componentName: 'PriorityNumber',
						titleCellClassName: "headerStyle"
					},
					{
						field: 'domainId',
						title: '操作',
						width: 180,
						titleAlign: 'center',
						columnAlign: 'center',
						componentName: 'TableOperation',
						titleCellClassName: "headerStyle"
					}
				]
			}
		},
		methods: {
			//每页显示条数
			getSecVal(val) {
				this.tableState.size = val;
				this.$store.commit("upDateDomainState", this.tableState);
				this.upDateTable("/stream", this.tableState);
				this.pageSize = val.name;
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
			},
			upDateTable(src, state) {
				let data = {
					pageIndex: state.index,
					pageSize: state.size.name
				}
				this.$store.dispatch("upDateTableData", {
					src: src,
					state: data,
					fn: res => {
						let tmp = {};
						res.data.map((item) => {
							tmp[item.id] = true;
						});
						this.$store.commit("upDateRankFlag", tmp); //记录域名优先级排行状态
					}
				});
			},
			pageIndex(data) {
				this.tableState.index = data;
				this.page = data; //修改页码
				this.$store.commit("upDateDomainState", this.tableState);
				this.upDateTable("/stream", this.tableState);
			},
			handle(params) {
				//删除域名
				if(params.type === "delete") {
					let id = params.id;
					let publishedNumber = params.rowData.publishedNumber;
					if(publishedNumber > 0) {
						this.$store.commit("tipInputData", this.tipdata);
						this.$store.commit("isShow", true);
					} else {
						TOOLS.delete("/stream/" + id, {}).then(res => {
							if(+res.data.code === 0) {
								this.$store.commit("isBlock");
								this.$store.commit("message", res.data.message);
								this.$store.commit("err", false);
								this.upDateTable("/stream", this.tableState);
							};
						}).catch(err => {
							this.$store.commit("isBlock");
							this.$store.commit("message", err.message);
							this.$store.commit("err", false);
						})
					}
				}
				//前往域名详情页面
				if(params.type === "more") {
					this.$router.push("/Domain/1/DomainDetail?id=" + params.id)
				}
				//域名优先级排列
				if(params.type === "rank") {
					delete params.type;
					TOOLS.get("/stream/updatePriorityNumber", params).then(res => {
						if(+res.data.code === 0) {
							let data = this.$store.state.TableUnit.priorityFlag;
							data[params.id] = true;
							this.$store.commit("isBlock");
							this.$store.commit("message", res.data.message);
							this.$store.commit("err", false);
							this.$store.commit("upDateRankFlag", data);
							this.upDateTable("/stream", this.tableState);
						};
					}).catch(err => {
						this.$store.commit("isBlock");
						this.$store.commit("message", err.message);
						this.$store.commit("err", false);
					})
				}
			},
			getSelect(arr) {
				this.$store.commit("tableHandleIds", arr);
			}
		},
		beforeMount() {
			//一下是获取table之前的状态
			this.size = +this.tableState.size; //获取每页显示多少条
			this.page = +this.tableState.index; //获取当前是第几页
			this.$store.commit("upDatehandleFlag", 4);
		},
		mounted() {
			this.upDateTable("/stream", this.tableState);
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
					line-height: 30px;
					font-size: 18px;
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