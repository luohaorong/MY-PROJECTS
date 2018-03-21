<template>
	<div class="container">
		<section class="ipc_top">
			<div class="ipc_top_left">
				<p class="every_page_num">
					<span>每页</span>
					<select-unit class="show_num" :select-item="numItem" :defaultItem="size" @selectValue="getSecVal"></select-unit>
					<span>条</span>
				</p>
				<select-unit class="address" :defaultItem="province" :select-item="provinceItem" @selectValue="getProvince" @getItems="getProvinceItems"></select-unit>
				<select-unit class="address" :defaultItem="city" :select-item="cityItem" @selectValue="getCity"></select-unit>
				<select-unit class="address" :defaultItem="county" :select-item="countyItem" @selectValue="getCounty"></select-unit>
				<select-unit class="pushType" :defaultItem="pushState" :select-item="pushType" @selectValue="push"></select-unit>
				<select-unit class="onlineType" :defaultItem="onlineState" :select-item="onlineType" @selectValue="online"></select-unit>
				<select-unit class="onlineType" :defaultItem="alarmState" :select-item="alarmItem" @selectValue="ipcType"></select-unit>
				<SearchInput @searchClick="searchClick" :val="searchVal" class="ipc_search" :msg="msg" />
			</div>
			<div class="ipc_top_right">
				<ButtonTemp v-for="(item,index) in items" :message="item" :keys="'btn' + index" class="button-style" @btnClick="prompt(index,item.option)"></ButtonTemp>
			</div>
		</section>
		<section class="table_container">
			<table-unit :tableData="tableData" :tip="tip" :columns="columns" :pageSize="pageSize" :pageState="page" @pageIndex="pageIndex" @getSelects="getSelect" @handle="option"></table-unit>
		</section>
	</div>
</template>

<script>
	import selectUnit from "@/components/Select"
	import ButtonTemp from "@/components/ButtonTemp"
	import TableUnit from "@/components/TableUnit"
	import SearchInput from "@/components/SearchInput"
	import TableOperation from "@/components/TableOperation"
	export default {
		name: "IPC",
		components: {
			selectUnit,
			ButtonTemp,
			TableUnit,
			SearchInput
		},
		computed: {
			tableData() {
				return this.$store.getters.fliterData
			},
			tableState() {
				return this.$store.state.TableUnit.ipcTableState
			}
		},
		data() {
			return {
				msg: {
					placeholder: "请输入关键字搜索",
					txt: "",
					readonly: false
				},
				size: {
					name: 10,
					id: 1
				}, //记录table每页显示多少条，切换页面返回当前页面后依然保持之前所选的值
				province: {
					name: "请选择省",
					id: -1
				},
				city: {
					name: "请选择市",
					id: -1
				},
				county: {
					name: "请选择区/县",
					id: -1
				},
				pushState: {
					name: "推流状态",
					id: -1
				},
				onlineState: {
					name: "在线状态",
					id: -1
				},
				alarmState: {
					name: "IPC类型",
					id: -1
				},
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
				provinceItem: {
					name: "showProvince",
					gray: "请选择省",
					list: [{
						name: "请选择省",
						id: -1
					}]
				},
				cityItem: {
					name: "showCity",
					gray: "请选择市",
					list: [{
						name: "请选择市",
						id: -1
					}]
				},
				countyItem: {
					name: "showCounty",
					gray: "请选择区/县",
					list: [{
						name: "请选择区/县",
						id: -1
					}]
				},
				pushType: {
					name: "pushType",
					gray: "推流状态",
					list: [{
						name: "推流状态",
						id: -1
					}, {
						name: "推流中",
						id: 1
					}, {
						name: "未推流",
						id: 2
					}, {
						name: "未发布",
						id: 3
					}]
				},
				onlineType: {
					name: "onlineType",
					gray: "在线状态",
					list: [{
						name: "在线状态",
						id: -1
					}, {
						name: "在线",
						id: 1
					}, {
						name: "离线",
						id: 2
					}]
				},
				alarmItem: {
					name: "alarmState",
					gray: "IPC类型",
					list: [{
						name: "IPC类型",
						id: -1
					}, {
						name: "IPC直连",
						id: "mqttipc"
					}, {
						name: "NVR下挂",
						id: "nvripc"
					}]
				},
				items: [{
					txt: "设置报警",
					option: "setalarm"
				}, {
					txt: "发布推流地址",
					option: "pushAddr"
				}, {
					txt: "升级",
					option: "upgrade"
				}, {
					txt: "重启",
					option: "reset"
				}],
				tipData: [{
					title: "设置报警权限申请",
					type: "input",
					flag: "setalarm",
					tip: [{
						name: "passWord",
						placeholder: "请输入权限密码",
						type: "password",
						reg: /\w/g,
						errorTip: "密码错误"
					}],
					notice: "确认操作后无法恢复，请谨慎操作！",
					option: "rightpwd"
				}, {
					title: "发布推流权限申请",
					type: "input",
					flag: "push",
					tip: [{
						name: "passWord",
						placeholder: "请输入权限密码",
						type: "password",
						reg: /\w/g,
						errorTip: "密码错误"
					}],
					notice: "确认操作后无法恢复，请谨慎操作！",
					option: "rightpwd"
				}, {
					title: "升级权限申请",
					type: "input",
					flag: "update",
					tag: "ipc",
					tip: [{
						name: "passWord",
						type: "input",
						placeholder: "请输入权限密码",
						reg: /\w/g,
						errorTip: "密码错误"
					}],
					notice: "确认操作后无法恢复，请谨慎操作！",
					option: "rightpwd"
				}, {
					title: "重启权限申请",
					type: "input",
					flag: "restart",
					tag: "ipc",
					tip: [{
						name: "passWord",
						placeholder: "请输入权限密码",
						reg: /\w/g,
						errorTip: "密码错误"
					}],
					notice: "确认操作后无法恢复，请谨慎操作！",
					option: "rightpwd"
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
						width: 60,
						titleAlign: 'center',
						columnAlign: 'center',
						type: 'selection',
						titleCellClassName: "headerStyle"
					},
					{
						field: 'ipcId',
						title: 'IPC ID',
						width: 120,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'ipcModel',
						title: 'IPC 型号',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'cateringName',
						title: '商家名称',
						width: 150,
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
						field: 'streamStatus',
						title: '推流状态',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle",
						formatter: function(rowData) {
							if(rowData.streamStatus === "推流中") {
								return `<span class='activeColor'>${rowData.streamStatus}</span>`;
							} else {
								return `<span>${rowData.streamStatus}</span>`;
							}
						}
					},
					{
						field: 'status',
						title: '设备状态',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'state',
						title: '在线状态',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle",
						formatter: function(rowData) {
							if(rowData.state === "在线") {
								return `<span class='activeColor'>${rowData.state}</span>`;
							} else {
								return `<span>${rowData.state}</span>`;
							}
						}
					},
					{
						field: 'fwVersion',
						title: '固件版本',
						width: 200,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'option',
						title: '操作',
						width: 100,
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
				this.tableState.size = val; //设置每页显示多少条
				this.pageSize = val.name;
				this.$store.commit("upDateIpcState", this.tableState); //更新table状态
				this.upDateTable("/camera", this.tableState);
			},
			//获取省市区接口方法
			getAssress(id, msg, fn) {
				let list = [];
				TOOLS.get("/region", {
					pid: id
				}).then(res => {
					list = res.data.data;
					list.unshift({
						name: msg,
						id: -1
					});
					fn.call(this, list);
				});
			},
			//获取省    
			getProvince(val) {
				this.tableState.province = val; //设置当前省份
				if(val.id === -1) {
					//清空市和区的数据
					this.tableState.city = {
						name: "请选择市",
						id: -1
					};
					this.tableState.county = {
						name: "请选择市",
						id: -1
					};
					this.cityItem = {
						name: "showCity",
						gray: "请选择市",
						list: [{
							name: "请选择市",
							id: -1
						}]
					};
					this.countyItem = {
						name: "showCounty",
						gray: "请选择区/县",
						list: [{
							name: "请选择区/县",
							id: -1
						}]
					}
				} else {
					this.getAssress(val.id, "请选择市", res => {
						let cityItem = {
							name: "showProvince",
							gray: "请选择省",
							list: res
						};
						this.cityItem = cityItem;
					});
				}
				this.upDateTable("/camera", this.tableState);
			},
			getProvinceItems() {},
			//市
			getCity(val) {
				this.tableState.city = val; //设置当前市
				//修改区的状态
				this.tableState.county = {
					name: "请选择区/县",
					id: -1
				};
				this.$store.commit("upDateIpcState", this.tableState);
				if(val.id === -1) {
					//清空区的数据
					this.countyItem = {
						name: "showCounty",
						gray: "请选择区/县",
						list: [{
							name: "请选择区/县",
							id: -1
						}]
					}
				} else {
					this.getAssress(val.id, "请选择区/县", res => {
						let countyItem = {
							name: "showProvince",
							gray: "请选择区/县",
							list: res
						};
						this.countyItem = countyItem;
					});
				}
				this.upDateTable("/camera", this.tableState);
			},
			//区
			getCounty(val) {
				this.tableState.county = val; //设置当前区
				this.$store.commit("upDateIpcState", this.tableState);
				this.upDateTable("/camera", this.tableState);
			},
			//推流状态
			push(val) {
				this.tableState.pushState = val; //设置当前区
				this.$store.commit("upDateIpcState", this.tableState);
				this.upDateTable("/camera", this.tableState);
			},
			//在线状态
			online(val) {
				this.tableState.onlineState = val; //设置当前区
				this.$store.commit("upDateIpcState", this.tableState);
				this.upDateTable("/camera", this.tableState);
			},
			//IPC直连下挂筛选
			ipcType(val) {
				this.tableState.alarmState = val; //设置当前区
				this.$store.commit("upDateIpcState", this.tableState);
				this.upDateTable("/camera", this.tableState);
				TOOLS.cache("ipcType", val.id);
			},
			//点击搜索
			searchClick(val) {
				this.tableState.searchValue = val; //设置当前区
				this.tableState.index = 1; //将页码设置为第一页
				this.page = 1;//将页码设置为第一页
				this.$store.commit("upDateIpcState", this.tableState);
				this.upDateTable("/camera", this.tableState);
			},
			//发布推流地址，升级，重启
			prompt(index, type) {
				let data = this.tipData[index];
				let ids = JSON.parse(TOOLS.cache("handleIds"));

				if(ids && ids.ids && ids.ids.length > 0) {
					this.$store.commit("tipInputData", data);
					this.$store.commit("isShow", true);
				} else {
					this.$store.commit("tipInputData", this.tip);
					this.$store.commit("isShow", true);
				}
			},
			upDateTable(src, state) {
				let data = {
					"pageIndex": state.index,
					"pageSize": state.size.name,
					"province": state.province.id === -1 ? "" : state.province.id,
					"city": state.city.id === -1 ? "" : state.city.id,
					"area": state.county.id === -1 ? "" : state.county.id,
					"streamStatus": state.pushState.id === -1 ? "" : state.pushState.id,
					"state": state.onlineState.id === -1 ? "" : state.onlineState.id,
					"alarmType": state.alarmState.id === -1 ? "" : state.alarmState.id,
					"searchValue": state.searchValue
				}
				this.$store.dispatch("upDateTableData", {
					"src": src,
					"state": data
				});
			},
			pageIndex(data) {
				this.tableState.index = data; //设置当前页码
				this.page = data; //修改页码
				this.$store.commit("upDateIpcState", this.tableState); //更新table状态
				this.upDateTable("/camera", this.tableState)
			},
			//点击操作按钮
			option(data) {
				this.$router.push("/Equipment/0/IPCDetail/0?id=" + data.id)
			},
			getSelect(arr) {
				TOOLS.cache("handleIds", arr);
				this.$store.commit("tableHandleIds", arr);
			}
		},
		beforeMount() {
			//一下是获取table之前的状态
			this.size = this.tableState.size; //获取每页显示多少条
			this.page = +this.tableState.index; //获取当前是第几页
			this.province = this.tableState.province; //获取当前省份
			this.city = this.tableState.city; //获取当前市
			this.county = this.tableState.county; //获取当前省区
			this.pushState = this.tableState.pushState; //获取当前省区
			this.onlineState = this.tableState.onlineState; //获取当前省区
/*			this.alarmState = this.tableState.alarmState //IPC类型*/
			this.searchVal = this.tableState.searchValue;
			this.$store.commit("tableHandleIds", ""); //清空IDS

			sessionStorage.removeItem("handleIds"); //清空IDS
		},
		mounted() {
			this.upDateTable("/camera", this.tableState); //获取table数据
			this.$store.commit("upDatehandleFlag", 2); //更新控制table中操作列显示的状态
			//获取省列表
			this.getAssress(1, "请选择省", res => {
				let provinceItem = {
					name: "showProvince",
					gray: "请选择省",
					list: res
				};
				this.provinceItem = provinceItem;
			});
			//如果用户之前选择过省，就获取市数据
			if(this.province.id !== -1) {
				this.getAssress(this.province.id, "请选择市", res => {
					let cityItem = {
						name: "showCity",
						gray: "请选择市",
						list: res
					};
					this.cityItem = cityItem;
				});
			}
			//如果用户之前选择过市，就获取区数据
			if(this.city.id !== -1) {
				this.getAssress(this.city.id, "请选择区/县", res => {
					let countyItem = {
						name: "showCounty",
						gray: "请选择区/县",
						list: res
					};
					this.countyItem = countyItem;
				});
			}
		}
	}
</script>

<style lang="less">
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
				.every_page_num {
					width: 120px;
					height: 30px;
					line-height: 28px;
					.flexJustifyCentFlexstart();
					.show_num {
						width: 50px;
					}
				}
				.address {
					width: 110px!important;
				}
				.pushType, .onlineType {
					width: 100px !important;
				}
				.ipc_search {
					>input {
						border: 1px solid #CCCCCC;
						.widthHeightBbRadius(260px, 30px, #fff, 0);
					}
					.click-icon {
						right: 0;
						.widthHeightBbRadius(30px, 30px, #FFA671, 0);
						background: #FFA671 url(/static/images/ipcsearch.png);
					}
				}
			}
			.ipc_top_right {
				.flexJustifyCentFlexend ();
				.button-style {
					.btnStyle();
				}
			}
		}
		.table-operation a img {
			cursor: pointer;
		}
	}
</style>