<template>
	<div class="container">
		<section class="ipc_top">
			<div class="ipc_top_left">
				<span class="page_title">选择升级配置</span>
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
				noSelectTip: {
					title: "温馨提示",
					type: "handletips",
					flag: false,
					optiontype: "onoff",
					tip: [{
						text: "请先选择将要推流的域名！"
					}]
				},
				sTip: {
					title: "温馨提示",
					type: "handletips",
					flag: false,
					optiontype: "onoff",
					tip: [{
						text: "请选择相配的设备类型！"
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
					}, {
						field: 'romName',
						title: '固件名称',
						width: 220,
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
						field: 'model',
						title: '设备型号',
						width: 100,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'version',
						title: '版本号',
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
						field: 'romSize',
						title: '固件大小',
						width: 100,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'romMd5',
						title: '固件MD5',
						width: 100,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					}, {
						field: 'remark',
						title: '备注',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true
					}
				]
			}
		},
		methods: {
			//每页显示条数
			getSecVal(val) {
				this.tableState.size = val;
				this.$store.commit("upDateDomainState", this.tableState);
				this.upDateTable("/rom/list", this.tableState);
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
				this.upDateTable("/rom/list", this.tableState);
			},
			handle(params) {

			},
			rowClick(data) {
				let siblings = [];
				let index = +data.rowIndex;
				let domainCheck = document.getElementsByClassName("domainCheck");
				let active = domainCheck[index];
				let tag = this.$route.query.tag.toUpperCase();
				let len = domainCheck.length;
				this.id = data.rowData.id;
				let deviceTypeName = data.rowData.deviceTypeName;

				if(tag != deviceTypeName) {
					this.$store.commit("tipInputData", this.sTip);
					this.$store.commit("isShow", true);
					active.checked="";
					return false
				}

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
				let noSelectTip = this.noSelectTip;
				let tag = this.$route.query.tag;
				var restartUrl = "";
				var data = null;

				if(tag === "ipc") {
					restartUrl = "/camera/updateRom";
					data = {
						ipcIds: handleIds.ipcIds,
						romId: this.id
					}
				} else if(tag === "nvr") {
					restartUrl = "/device/nvr/upgrade";
					data = {
						ipcIds: handleIds.nvrIds,
						romId: this.id
					}
				}

				if(!this.id) {
					this.$store.commit("tipInputData", noSelectTip);
					this.$store.commit("isShow", true);
				} else {
					TOOLS.post(restartUrl, data)
						.then((res) => {
							if(+res.data.code == 0) {
								this.$store.commit("isShow", false);
								this.$store.commit("isBlock");
								this.$store.commit("message", "升级命令已下发");
								this.$store.commit("err", false);
								this.$router.push("/Equipment/0/IPCTable/0");
							}
						})
				}
			},
			cacleClick() {
				this.$router.push("/Equipment/0/IPCTable/0")
			}
		},
		mounted() {
			this.upDateTable("/rom/list", this.tableState);
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