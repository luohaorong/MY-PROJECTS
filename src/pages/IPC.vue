<template>
	<div class="container">
		<section class="ipc_top">
			<div class="ipc_top_left" v-if="">
				<p class="every_page_num">
					<span>每页</span>
					<select-unit class="show_num" :select-item="numItem" @selectValue="getSecVal"></select-unit>
					<span>条</span>
				</p>
				<select-unit class="address" :select-item="provinceItem" @selectValue="getProvince" @getItems="getProvinceItems"></select-unit>
				<select-unit class="address" :select-item="cityItem" @selectValue="getCity"></select-unit>
				<select-unit class="address" :select-item="countyItem" @selectValue="getCounty"></select-unit>
				<select-unit class="pushType" :select-item="pushType" @selectValue="push"></select-unit>
				<select-unit class="onlineType" :select-item="onlineType" @selectValue="online"></select-unit>
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
	export default {
		name: "IPC",
		components: {
			selectUnit,
			ButtonTemp,
			TableUnit
		},
		computed: {
			tableData(){
				return this.$store.getters.fliterData
			}
			
		},
		data() {
			return {
				numItem: {
					name: "showNumber",
					list: [10, 15, 20, 25, 30, 35]
				},
				provinceItem: {
					name: "showProvince",
					gray: "请选择省",
					list: ["请选择省", "成都", "北京", "上海", "天津", "石家庄", "三亚"]
				},
				cityItem: {
					name: "showCity",
					gray: "请选择市",
					list: ["请选择市", "成都", "北京", "上海", "天津", "石家庄", "三亚"]
				},
				countyItem: {
					name: "showCounty",
					gray: "请选择县",
					list: ["请选择县", "成都", "北京", "上海", "天津", "石家庄", "三亚"]
				},
				pushType: {
					name: "pushType",
					gray: "推流状态",
					list: ["推流状态", "IPC", "NVR"]
				},
				onlineType: {
					name: "onlineType",
					gray: "在线状态",
					list: ["在线状态", "IPC", "NVR"]
				},
				items: ["发布推流地址", "升级", "重启"],
				tipData: [{
					title: "发布推流权限申请",
					type: "input",
					tip: [{
						name: "passWord",
						placeholder: "请输入权限密码",
						reg: /\w/g,
						errorTip: "密码错误"
					}],
					notice: "确认操作后无法恢复，请谨慎操作！",
					option: "rightpwd"
				}, {
					title: "升级权限申请",
					type: "input",
					tip: [{
						name: "passWord",
						placeholder: "请输入权限密码",
						reg: /\w/g,
						errorTip: "密码错误"
					}],
					notice: "确认操作后无法恢复，请谨慎操作！",
					option: "rightpwd"
				}, {
					title: "重启权限申请",
					type: "input",
					tip: [{
						name: "passWord",
						placeholder: "请输入权限密码",
						reg: /\w/g,
						errorTip: "密码错误"
					}],
					notice: "确认操作后无法恢复，请谨慎操作！",
					option: "rightpwd"
				}],
				columns:[
					{width: 60, titleAlign: 'center',columnAlign:'center',type: 'selection'},
                    {field: 'ipcId', title: 'IPC ID', width: 120, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'ipcModel', title: 'IPC 型号', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'cateringName', title: '商家名称', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'createDate', title: '创建时间', width: 200, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'streamStatus', title: '推流状态', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'status', title: '设备状态', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'state', title: '在线状态', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'fwVersion', title: '固件版本', width: 200, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'option', title: '操作', width: 80, titleAlign: 'center', columnAlign: 'center',formatter: function(){
                    	return "<p class='optionBtn'><img src='/src/assets/images/more.png' /></p>"
                    }}
                    ]
			}
		},
		methods: {
			//每页显示多少条
			getSecVal(val) {
				console.log(val)
				this.$store.dispatch("upDateTableData",{
				src:"/camera",
				index:1,
				size:val
			})
			},
			//获取省
			getProvince(val) {
				
				console.log(val)

			},
			getProvinceItems() {
				/*TOOLS.get("/region", {
					"pid": 1
				}).then(res => {
					if(res.data.code === 0) {
						this.provinceItem.list = res.data.data;
					};
				})*/
			},
			//市
			getCity(val) {
				console.log(`address:${val}`)
			},
			//区
			getCounty(val) {
				console.log(`address:${val}`)
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
			this.$store.dispatch("upDateTableData",{
				src:"/camera",
				index:1,
				size:10
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
	}
</style>