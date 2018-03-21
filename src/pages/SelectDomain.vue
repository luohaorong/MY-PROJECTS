<template>
	<div class="container">
		<section class="ipc_top">
			<div class="ipc_top_left">
				<span class="page_title">选择域名</span>
				<p class="every_page_num">
					<span>每页</span>
					<select-unit class="show_num" :select-item="numItem" :defaultItem="size" @selectValue="getSecVal"></select-unit>
					<span>条</span>
				</p>
			</div>
			<div class="ipc_top_right">
				<button-temp :message="sureBtn" @btnClick="sureClick"></button-temp>
				<button-temp :message="cacleBtn" @btnClick="cacleClick"></button-temp>
			</div>
		</section>
		<section class="table_container">
			<table-unit :tableData="tableData" :pageSize="pageSize" :columns="columns" :pageState="page" @pageIndex="pageIndex" @handle="handle" @rowClick="rowClick"></table-unit>
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
				sureBtn: {
					background: "linear-gradient(-270deg, #FFCE76 0%, #FFA671 100%)",
					txt: "确定"
				},
				cacleBtn: {
					background: "#E0E0E0",
					txt: "取消"
				},
				id: '',
				upperLimit: "",
				publishedNumber: "",
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
				tip: {
					title: "温馨提示",
					type: "handletips",
					flag: false,
					optiontype: "resetpwd",
					tip: [{
						text: "选择的推流数大于剩余推流数，请重新选择！"
					}]
				},
				noSelectTip: {
					title: "温馨提示",
					type: "handletips",
					flag: false,
					optiontype: "resetpwd",
					tip: [{
						text: "请先选择将要推流的域名！"
					}]
				},
				columns: [{
						field: 'radio',
						title: ' ',
						width: 60,
						titleAlign: 'center',
						columnAlign: 'center',
						formatter: function(value, row) {
							let ipt = `<input class="domainCheck" type="radio"/>`;
							return ipt
						}
					},
					{
						field: 'playHost',
						title: '域名',
						width: 100,
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
						field: 'playAuthSwtich',
						title: '播放鉴权状态',
						width: 100,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					}, {
						field: 'pushAuthSwtich',
						title: '推流鉴权状态',
						width: 100,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
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
					state: data
				});
			},
			pageIndex(data) {
				this.tableState.index = data;
				this.page = data; //修改页码
				this.$store.commit("upDateDomainState", this.tableState);
				this.upDateTable("/stream", this.tableState);
			},
			handle(params) {

			},
			rowClick(data) {
				let siblings = [];
				let index = +data.rowIndex;
				let domainCheck = document.getElementsByClassName("domainCheck");
				let active = domainCheck[index];
				let len = domainCheck.length;
				this.id = data.rowData.id;
				this.upperLimit = data.rowData.upperLimit; //推流上限数
				this.publishedNumber = data.rowData.publishedNumber; //已发布推流数
				for(var i = 0; i < len; i++) {
					if(i !== index) {
						siblings.push(domainCheck[i])
					}
				};
				siblings.map((item) => {
					item.checked = "";
				})
			},
			getSelect(arr) {
				this.$store.commit("tableHandleIds", arr);
			},
			sureClick() {
				let handleIds = JSON.parse(TOOLS.cache("handleIds"));
				let tipWord = this.tip;
				let noSelectTip = this.noSelectTip;
				
				if(!this.id){
					this.$store.commit("tipInputData", noSelectTip);
					this.$store.commit("isShow", true);
				}else if(this.upperLimit>this.publishedNumber) {
					TOOLS.put("/camera/stream", {
						ipcIds: handleIds.ids,
						streamHostId: this.id
					}).then((res) => {
						this.$store.commit("isShow", false);
						this.$store.commit("isBlock");
						this.$store.commit("message", "成功");
						this.$store.commit("err", false);
						this.$router.push("/Equipment/0/IPCTable/0")
					})
				}else{
					this.$store.commit("tipInputData", tipWord);
					this.$store.commit("isShow", true);
				}
			},
			cacleClick() {
				this.$router.push("/Equipment/0/IPCTable/0")
			}
		},
		beforeMount() {
			//一下是获取table之前的状态
			this.size = this.tableState.size; //获取每页显示多少条
			this.$store.commit("tableHandleIds", ""); //清空IDS
		},
		mounted() {
			this.upDateTable("/stream", this.tableState);
		},
		destroyed() {
			sessionStorage.removeItem("handleIds"); //清空handleIds
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
			}
			.ipc_top_right {
				width: 200px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.button-temp {
					height: 30px;
					width: 90px;
					border-radius: 6px;
					line-height: 30px;
				}
			}
		}
	}
</style>