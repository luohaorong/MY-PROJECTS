<template>
	<div class="setAlarn">
		<p class="alarm_title">设置报警</p>
		<section class="alarm_content">
			<SetAlarnTem v-for="item in lists" :Items="item" @getAlarnList="getAlarnList" @selectItem="selectItem"></SetAlarnTem>
		</section>
		<div class="alarm_btn">
			<ButtonTemp v-for="(item,index) in btnItems" :message="item" :keys="'btn' + index" class="button-style" @btnClick="btnClick(index,item.option)"></ButtonTemp>
		</div>
	</div>
</template>

<script>
	import ButtonTemp from "@/components/ButtonTemp"
	import SetAlarnTem from "@/components/SetAlarnTem"
	import selectUnit from "@/components/NewSelect"
	export default {
		name: "NewAlarm",
		components: {
			ButtonTemp,
			SetAlarnTem
		},
		data() {
			return {
				btnItems: [{
					txt: "确定",
					option: "sure",
					background: "#FFCD76"
				}, {
					txt: "取消",
					option: "cancel",
					background: "#DDDDDD"
				}],
				lists: [{
					type: "2",
					templateId: "",
					name: "视频遮挡",
					value: "请先选择模板",
					itemAlarnList: "",
					dayslot: "",
					flag: false
				}]
			}
		},
		methods: {
			getAlarnList(tag) {
				let type;
				if(+tag === 2) {
					type = 1
				} else if(+tag === 1) {
					type = 2
				}

				TOOLS.get("/alarm/templates/" + tag, {}).then(res => {
					if(+res.data.code === 0) {
						this.lists[type - 1].itemAlarnList = res.data.data;
						this.lists[type - 1].flag = !this.lists[type - 1].flag
					};
				})
			},
			selectItem(item, tag) {
				let type;
				if(+tag === 2) {
					type = 1
				} else if(+tag === 1) {
					type = 2
				}
				this.lists[type - 1].value = item.ruleName;
				this.lists[type - 1].flag = !this.lists[type - 1].flag;
				let data = JSON.parse(item.ruleDetails);
				this.lists[type - 1].dayslot = data.msgData[0].time[0];
				this.lists[type - 1].templateId = item.id;
			},
			btnClick(index, params) {
				let handleIds = JSON.parse(TOOLS.cache("handleIds"));
				let data = {};
				let type = TOOLS.cache("ipcType");
				if(params === "sure") {
					data = {
						ipcType: TOOLS.cache("ipcType"),
						ipcIds: handleIds.ipcIds,
						ruleData: [{
							"ruleId": this.lists[0].templateId,
							"key": "1"
						}]
					}

					//如果是NVR下挂IPC则会有 视频丢失这个版块  视频丢失数据
					if(type === "nvripc" && this.lists[1].templateId) {
						data.ruleData.push({
							"ruleId": this.lists[1].templateId,
							"key": "1"
						})
					}

					let sendData = JSON.stringify(data);
					
					let _this = this;

					var request = new XMLHttpRequest();
					request.open("POST", TOOLS.LINK.baseUrl + "/camera/setalarm");
					request.onreadystatechange = function() {
						if(request.readyState == 4 && (request.status == 200 || request.status == 304)) { // 304未修改
							let data = JSON.parse(request.responseText);
							_this.$router.push("/Equipment/0/IPCTable/0");
						}
					}
					request.send(sendData)
				}
				if(params === "cancel") {
					window.history.go(-1)
				}
			}
		},
		mounted() {
			let type = TOOLS.cache("ipcType");

			//如果是NVR下挂IPC则会有 视频丢失这个版块
			let data = {
				type: "1",
				templateId: "",
				name: "视频丢失",
				value: "请先选择模板",
				itemAlarnList: "",
				dayslot: "",
				flag: false
			}
			if(type === "nvripc") {
				this.lists.push(data);
			}
		},
		destroyed() {
			sessionStorage.removeItem("ipcType"); //清空ipcType
		}
	}
</script>

<style lang="less">
	.setAlarn {
		width: 90%;
		height: auto;
		margin: 0 auto;
		.alarm_title {
			width: 100%;
			height: 136px;
			border-bottom: 1px solid #979797;
			font-size: 18px;
			color: #5C5C5C;
			line-height: 136px;
		}
		.alarm_content {
			display: flex;
			justify-content: flex-start;
			width: 100%;
			border-bottom: 1px solid #979797;
			margin: 40px 20px 20px 0;
			padding-bottom: 40px;
		}
		.alarm_btn {
			width: 300px;
			height: 150px;
			align-items: center;
			display: flex;
			justify-content: space-around;
			.button-temp {
				font-size: 14px;
				color: #5C5C5C;
				width: 100px;
				height: 36px;
				line-height: 36px;
				border-radius: 100px;
			}
		}
	}
</style>