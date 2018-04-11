<template>
	<div class="container" @click="ipcInforHide">
		<section class="ipc_top">
			<div class="ipc_top_left">
				<p class="every_page_num">
					<span>每页</span>
					<select-unit class="show_num" :select-item="numItem" :defaultItem="size" @selectValue="getSecVal"></select-unit>
					<span>条</span>
				</p>
				<select-unit class="pushType" :defaultItem="modeState" :select-item="deviceMode" @selectValue="push"></select-unit>
				<select-unit class="onlineType" :defaultItem="onlineState" :select-item="onlineType" @selectValue="online"></select-unit>
				<SearchInput @searchClick="searchClick" :val="searchVal" class="ipc_search" :msg="msg" />
			</div>
			<div class="ipc_top_right">
				<ButtonTemp v-for="(item,index) in items" :message="item" :keys="'btn' + index" class="button-style" @btnClick="prompt(index)"></ButtonTemp>
			</div>
		</section>
		<section class="table_container">
			<table-unit :tableData="tableData" :tip="tip" :pageSize="pageSize" :columns="columns" :pageState="page" @rowClick="rowClick" @getSelects="getSelect" @pageIndex="pageIndex" @handle="option"></table-unit>
		</section>
		<section class="ipc_information" ref="ipc_infor">
			<ipc-information :ipcShow="ipcShow"  :dataList="dataList" @optionClick="optionClick"></ipc-information>
		</section>
	</div>
</template>

<script>
	import selectUnit from "@/components/Select"
	import ButtonTemp from "@/components/ButtonTemp"
	import TableUnit from "@/components/TableUnit"
	import SearchInput from "@/components/SearchInput"
	import TableOperation from "@/components/TableOperation"
	import ipcInformation from "@/components/IPCInformation"
	export default {
		name: "NVR",
		components: {
			selectUnit,
			ButtonTemp,
			TableUnit,
			SearchInput,
			ipcInformation
		},
		computed: {
			tableData() {
				return this.$store.getters.fliterData
			},
			tableState() {
				return this.$store.state.TableUnit.nvrTableState
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
				modeState: {
					name: "NVR 型号",
					id: -1
				},
				onlineState: {
					name: "在线状态",
					id: -1
				},
				page: 1, //记录table是第几页，切换页面返回当前页面后依然保持之前所选的值
				pageSize:10,//每页显示多少条
				dataList:[],//ipc信息数据
				ipcShow:false,//控制IPC信息显示
				ipcStyle:{},//控制IPC信息位置
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
				deviceMode: {
					name: "deviceMode",
					gray: "NVR 型号",
					list: [{
						name: "NVR 型号",
						id: -1
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
				items: [{
					txt: "升级",
					background: ""
				}, {
					txt: "重启",
					background: ""
				}],
				tipData: [{
					title: "升级权限申请",
					flag: "update",
					type: "input",
					tag: "nvr",
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
					title: "重启权限申请",
					type: "input",
					flag: "restart",
					tag: "nvr",
					tip: [{
						name: "passWord",
						placeholder: "请输入权限密码",
						type: "password",
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
					optiontype: "resetpwd",
					tip: [{
						text: "请先选择需要操作的数据！"
					}]
				},
				columns: [{
						width: 60,
						titleAlign: 'center',
						columnAlign: 'center',
						type: 'selection'
					},
					{
						field: 'gwId',
						title: 'NVR ID',
						width: 120,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'deviceMode',
						title: '设备型号',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'businessName',
						title: '商家名称',
						width: 150,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'createDate',
						title: '注册时间',
						width: 200,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'createDate',
						title: '最后上线时间',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
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
						field: 'online',
						title: '在线状态',
						width: 80,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle",
						formatter: function(rowData) {
							if(rowData.online === "在线") {
								return `<span class='activeColor'>${rowData.online}</span>`;
							} else {
								return `<span>${rowData.online}</span>`;
							}
						}
					},
					{
						field: 'fwVersion',
						title: '版本',
						width: 200,
						titleAlign: 'center',
						columnAlign: 'center',
						isResize: true,
						titleCellClassName: "headerStyle"
					},
					{
						field: 'ipcIfor',
						title: 'IPC信息',
						width: 100,
						titleAlign: 'center',
						columnAlign: 'center',
						componentName: 'TableOperation',
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
				this.$store.commit("upDateNvrState", this.tableState); //更新table状态
				this.upDateTable("/device/nvrs", this.tableState);
				this.pageSize = val.name;
			},
			//推流状态
			push(val) {
				this.tableState.modeState = val; //推流状态
				this.$store.commit("upDateNvrState", this.tableState);
				this.upDateTable("/device/nvrs", this.tableState);
			},
			//在线状态
			online(val) {
				this.tableState.onlineState = val; //在线状态
				this.$store.commit("upDateNvrState", this.tableState);
				this.upDateTable("/device/nvrs", this.tableState);
			},
			//点击搜索
			searchClick(val) {
				this.tableState.searchValue = val; //设置点击搜索
				this.$store.commit("upDateNvrState", this.tableState);
				this.upDateTable("/device/nvrs", this.tableState);
			},
			//升级，重启
			prompt(index) {
				let data = this.tipData[index];
				let tipWord = this.tip;
				let ids = this.$store.state.PromptBox.tableHandleIds.ids;

				if(ids && ids.length>0){
					this.$store.commit("tipInputData", data);
					this.$store.commit("isShow", true);
				}else{
					this.$store.commit("tipInputData", tipWord);
					this.$store.commit("isShow", true);
				}
			},
			//更新table数据
			upDateTable(src, state) {
				let data = {
					"pageIndex": state.index,
					"pageSize": state.size.name,
					"deviceMode": state.modeState.id === -1 ? "" : state.modeState.name,
					"status": state.onlineState.id === -1 ? "" : state.onlineState.id,
					"searchParam": state.searchValue
				}
				this.$store.dispatch("upDateTableData", {
					"src": src,
					"state": data
				});
			},
			pageIndex(data) {
				this.tableState.index = data; //设置当前页码
				this.page = data; //修改页码
				this.$store.commit("upDateNvrState", this.tableState); //更新table状态
				this.upDateTable("/device/nvrs", this.tableState);
				this.ipcShow = false;//ipc信息显示
			},
			//点击操作按钮
			option(data){
				if(data.type === "more"){
					this.$router.push("/Equipment/0/NVRDetail/1?id=" + data.id)
				}else{
					TOOLS.get("/device/nvr/" + data.id +"/ipcs",{
						nvrId:data.gwId
					}).then(res=>{
						let pageTop = data.e.pageY - 20;
						this.dataList = res.data.data;
						this.ipcShow = true;//ipc信息显示
						this.$refs.ipc_infor.style.top = pageTop + "px";
					})
				}
			},
			rowClick(){
				this.ipcShow = false;//ipc信息显示
			},
			titleClick(){
				this.ipcShow = false;//ipc信息显示
			},
			//点击IPC信息的操作按钮
			optionClick(id){
				this.$router.push("/Equipment/0/IPCDetail/0?id=" + id)
			},
			//ipc信息隐藏
			ipcInforHide(){
				this.ipcShow = false;
			},
			getSelect(arr){
				TOOLS.cache("handleIds",arr);
				this.$store.commit("tableHandleIds", arr);
			}
		},
		beforeMount() {
			//一下是获取table之前的状态
			this.size = this.tableState.size; //获取每页显示多少条
			this.pageSize = this.tableState.size.name; //获取每页显示多少条,给分页组件
			this.page = +this.tableState.index; //获取当前是第几页
			this.modeState = this.tableState.modeState; //获取当前NVR 型号
			this.onlineState = this.tableState.onlineState; //获取当前在线状态
			this.searchVal = this.tableState.searchValue;
			this.$store.commit("tableHandleIds", ""); //在打开页面前清空已经选择的IDS
		},
		mounted() {
			this.upDateTable("/device/nvrs", this.tableState); //获取table数据
			this.$store.commit("upDatehandleFlag", 4); //更新控制table中操作列显示的状态
			//获取设备类型
			TOOLS.get("/device/nvr/models").then(res=>{
				res.data.data.map((item,index)=>{
					this.deviceMode.list.push({
						name:item.model,
						id:index+1
					})
				});
			});
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
					width: 150px;
				}
				.pushType, .onlineType {
					width: 130px;
				}
				.ipc_search {
					>input {
						border: 1px solid #CCCCCC;
						.widthHeightBbRadius(280px, 30px, #fff, 0);
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
		.ipc_information{
			position: absolute;
			right: 268px;
			top: 455px;
		}
	}
</style>