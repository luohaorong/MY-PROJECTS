<template>
	<div class="container">
		<section class="ipc_top">
			<div class="ipc_top_left" v-if="">
				<span class="page_title">固件列表</span>
				<p class="every_page_num">
					<span>每页</span>
					<select-unit class="show_num" :select-item="numItem" :defaultItem="size" @selectValue="getSecVal"></select-unit>
					<span>条</span>
				</p>
				<select-unit class="pushType" :defaultItem="deviceType" :select-item="deviceTypeItem" @selectValue="getDeviceType"></select-unit>
				<select-unit class="onlineType" :defaultItem="deviceModel" :select-item="deviceModelItem" @selectValue="getDeviceModel"></select-unit>
			</div>
			<div class="ipc_top_right">
				<router-link to="/Firmware/2/addFirmware"><img src="/static/images/update.png" /></router-link>
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
		name: "Firmware",
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
				return this.$store.state.TableUnit.firmwareTableState
			}
		},
		data() {
			return {
				size: {
					name: 10,
					id: 1
				}, //记录table每页显示多少条，切换页面返回当前页面后依然保持之前所选的值
				page: 1, //记录table是第几页，切换页面返回当前页面后依然保持之前所选的值
				pageSize:10,//每页显示多少条
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
				deviceType: {
					name: "设备类型",
					id: -1
				},
				deviceModel: {
					name: "设备型号",
					id: -1
				},
				deviceTypeItem: {
					name: "showDeviceItem",
					gray: "设备类型",
					list: [{
						name: "设备类型",
						id: -1
					}]
				},
				deviceModelItem: {
					name: "showDeviceModelItem",
					gray: "设备型号",
					list: [{
						name: "设备型号",
						id: -1
					}]
				},
				columns: [{
						field: 'romName',
						title: '固件名称',
						width: 320,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'deviceTypeName',
						title: '设备类型',
						width: 100,
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
						width: 160,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'createDate',
						title: '上传时间',
						width: 160,
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
						width: 280,
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
						field: 'firmwareId',
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
			//每页显示多少条
			getSecVal(val) {
				this.tableState.size = val;
				this.$store.commit("firmwareTableState", this.tableState);
				this.upDateTable("/rom/list", this.tableState);
				this.pageSize = val.name;
			},
			//设备类型
			getDeviceType(val) {
				this.tableState.deviceType = val;
				if(val.id === -1) {
					this.deviceType = {
						name: "showDeviceItem",
						gray: "设备类型",
						list: [{
							name: "设备类型",
							id: -1
						}]
					}
					this.deviceModel = {
						name: "showDeviceModelItem",
						gray: "设备型号",
						list: [{
							name: "设备型号",
							id: -1
						}]
					}
				} else {
					TOOLS.get("/rom/model/" + val.id, {}).then(res => {
						if(+res.data.code === 0) {
							let list = res.data.data;
							var newArray = [];
							newArray = list.map((v, index) => {
								return {
									name: v,
									id: index
								}
							})

							let deviceModelItem = {
								name: "showDeviceModelItem",
								gray: "设备类型",
								list: newArray
							}
							newArray.unshift({
								name: "设备类型",
								id: -1
							});
							this.deviceModelItem = deviceModelItem
						}
					})
				}
				this.$store.commit("upDateFirmwareState", this.tableState);
				this.upDateTable("/rom/list", this.tableState)
			},
			//设备型号
			getDeviceModel(val) {
				this.tableState.deviceModel = val;
				this.$store.commit("upDateFirmwareState", this.tableState);
				this.upDateTable("/rom/list", this.tableState);
			},
			upDateTable(src, state) {
				let data = {
					pageIndex: state.index,
					pageSize: state.size.name,
					deviceType: state.deviceType.id === -1?"":state.deviceType.id,
					model: state.deviceModel.id === -1?"":state.deviceModel.name
				}
				this.$store.dispatch("upDateTableData", {
					src: src,
					state: data
				});
			},
			pageIndex(data) {
				this.tableState.index = data;
				this.page = data; //修改页码
				this.$store.commit("upDateFirmwareState", this.tableState);
				this.upDateTable("/rom/list", this.tableState)
			},
			handle(params) {
				//删除固件
				if(params.type === "delete") {
					let id = params.id;
					TOOLS.delete("/rom/del/" + id, {}).then(res => {
						if(+res.data.code === 0) {
							this.$store.commit("isBlock");
							this.$store.commit("message", res.data.message);
							this.$store.commit("err", false);
							this.upDateTable("/rom/list", this.tableState);
						};
					}).catch(err => {
						this.$store.commit("isBlock");
						this.$store.commit("message", err.message);
						this.$store.commit("err", false);
					})
				}

				//下载固件
				if(params.type === "download") {
					if(params.romurl){
						window.location.href = params.romurl
					}else {
						this.$store.commit("isBlock");
						this.$store.commit("message", "无效的下载链接");
						this.$store.commit("err", false);
					}
				}
			}
		},
		beforeMount() {
			//一下是获取table之前的状态
			this.size = +this.tableState.size; //获取每页显示多少条
			this.page = +this.tableState.index; //获取当前是第几页
			this.$store.commit("upDatehandleFlag", 3);
		},
		mounted() {
			this.upDateTable("/rom/list", this.tableState);
			//获取设备类型
			TOOLS.get("/rom/type", {}).then(res => {
				if(+res.data.code === 0) {
					let list = res.data.data;
					var newArray = [];
					newArray = list.map(v => {
						return {
							name: v.deviceTypeName,
							id: v.deviceType
						}
					})
					let deviceTypeItem = {
						name: "showDeviceItem",
						gray: "设备类型",
						list: newArray
					}
					//最后插入在数据的最前端
					newArray.unshift({
						name: "设备类型",
						id: -1
					});
					this.deviceTypeItem = deviceTypeItem
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
					line-height: 30px;
					font-size: 18px;
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
	}
</style>