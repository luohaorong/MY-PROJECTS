<template>
	<section class="new_alarm">
		<p class="alarm_title">新建报警模板</p>
		<section class="alarm_content">
			<div class="alarm_modle">
				<div class="modle_name">
					<input class="modle_name_inp" type="text" v-model="modleName" maxlength="40" placeholder="请输入模板名称" />
				</div>
				<div class="selc_prompt">
					<select-unit class="selc_type" :select-item="typeItem" @selectValue="getSecVal"></select-unit>
					<p class="alarm_prompt">重复周期(星期)</p>
				</div>
				<div class="week_com">
					<week :weekData="weekData" @weekdblClick="weekdblClick" @weekClick="weekClick"></week>
				</div>
				<div class="write_time">
					<ul class="time_title">
						<li>时</li>
						<li>分</li>
						<li>时</li>
						<li>分</li>
					</ul>
					<ul class="tiem_content">
						<li v-for="(item,index) in tiemContent">
							<div class="time_wrap">
								<input @keyup="keyUpTest(item.startH,index,'startH')" type="text" v-model="item.startH" />
								<span>:</span>
								<input @keyup="keyUpTest(item.startM,index,'startM')" type="text" v-model="item.startM" />
							</div>
							<span>到</span>
							<div class="time_wrap">
								<input @keyup="keyUpTest(item.endH,index,'endH')" type="text" v-model="item.endH" />
								<span>:</span>
								<input @keyup="keyUpTest(item.endM,index,'endM')" type="text" v-model="item.endM" />
							</div>
							<img class="img" @click="selectClick(item)" :src="item.isSelect ? sec : sec_gray" />
						</li>
					</ul>
				</div>
			</div>
		</section>
		<div class="alarm_btn">
			<ButtonTemp v-for="(item,index) in btnItems" :message="item" :keys="'btn' + index" class="button-style" @btnClick="prompt(index,item.option)"></ButtonTemp>
		</div>
	</section>
</template>

<script>
	import selectUnit from "@/components/Select"
	import week from "@/components/SelectWeek"
	import ButtonTemp from "@/components/ButtonTemp"
	export default {
		name: "NewAlarm",
		components: {
			selectUnit,
			week,
			ButtonTemp
		},
		data() {
			return {
				typeItem: {
					name: "typeItem",
					gray: "请选择报警类型",
					list: [{
						name: "请选择报警类型",
						id: -1
					}, {
						name: "视频遮挡",
						id: 2
					}, {
						name: "视屏丢失",
						id: 1
					}]
				},
				modleName: "", //报警模板名字
				warnType: "", //报警类型
				dayslot: [], //报警时间段
				weekNum: '', //星期几
				timeDetail: [], //报警时间详情
				weekData: [{
					day: "一",
					id: 1,
					isSelect: false,
					className: ""
				}, {
					day: "二",
					id: 2,
					isSelect: false,
					className: ""
				}, {
					day: "三",
					id: 3,
					isSelect: false,
					className: ""
				}, {
					day: "四",
					id: 4,
					isSelect: false,
					className: ""
				}, {
					day: "五",
					id: 5,
					isSelect: false,
					className: ""
				}, {
					day: "六",
					id: 6,
					isSelect: false,
					className: ""
				}, {
					day: "日",
					id: 7,
					isSelect: false,
					className: ""
				}],
				tiemContent: [{
					id: 0,
					isSelect: false,
					startH: "",
					startM: "",
					endH: "",
					endM: ""
				}, {
					id: 1,
					isSelect: false,
					startH: "",
					startM: "",
					endH: "",
					endM: ""
				}, {
					id: 2,
					isSelect: false,
					startH: "",
					startM: "",
					endH: "",
					endM: ""
				}, {
					id: 3,
					isSelect: false,
					startH: "",
					startM: "",
					endH: "",
					endM: ""
				}],
				btnItems: [{
						txt: "确定",
						option: "sure",
						background: "#FFCD76"
					}, {
						txt: "取消",
						option: "cancel",
						background: "#DDDDDD"
					}

				],
				tip: {
					title: "温馨提示",
					type: "handletips",
					flag: false,
					optiontype: "onoff",
					tip: [{
						text: "参数缺失，请确认后再提交！"
					}]
				},
				sec: "/static/images/select.png",
				sec_gray: "/static/images/select_gray.png"
			}
		},
		methods: {
			//选择报警类型
			getSecVal(val) {
				this.warnType = val.id;
			},
			//单击选择
			weekClick(item) {
				let len = this.timeDetail.length;
				this.weekNum = item.id; //当前星期几
				if(len > 0){
					let bol = this.timeDetail.some((el,index,arr)=>{
						return el.week === item.id;
					});
					//同一天不重复添加
					!bol && this.timeDetail.push({
						week: item.id,
						dayslot: this.dayslot[item.id - 1]
					});
				}else{
					this.timeDetail.push({
						week: item.id,
						dayslot: this.dayslot[item.id - 1]
					});
				}
				this.tiemContent = this.dayslot[item.id - 1];
				//编辑星期几
				this.weekData.map(i => {
					if(i.id === item.id) {
						i.className = "optional_item";
					} else {
						i.className = "";
					}
				})
			},
			//双击取消
			weekdblClick(item) {
				for(let i = 0; i < this.timeDetail.length; i++) {
					if(+this.timeDetail[i].week === +item.id) {
						this.timeDetail.splice(i, 1);
					}
				};
			},
			//选择时间
			selectClick(data) {
				let obj = {
						id: data.id,
						startH: data.startH,
						startM: data.startM,
						endH: data.endH,
						endM: data.endM
					};
				if(data.isSelect) {
					obj.isSelect = false;
					this.$set(this.tiemContent,data.id,obj);
					this.weekNum ? this.dayslot[this.weekNum - 1][data.id] = obj : "";
				} else {
					//报警时间段
					obj.start = obj.startH + ":" + obj.startM
					obj.end = obj.endH + ":" + obj.endM

					if(this.weekNum && data.startH && data.startM && data.endH && data.endM) {
						obj.isSelect = true;
						this.dayslot[this.weekNum - 1][data.id] = obj
						this.$set(this.tiemContent,data.id,obj);
					} else {
						if(this.weekNum){
							this.$store.commit("message", "请填写完整时间");
						}else{
							this.$store.commit("message", "请先选择日期");
						}
						this.$store.commit("isShow", false);
						this.$store.commit("isBlock");
						this.$store.commit("err", true);
						return false;
					}
				}
			},
			//验证输入值
			keyUpTest(val, index, time) {
				let reg = /[^\d.]/g;
				let value = val ? val.replace(reg, "") : "";
				let len = value.length;
				if(len >= 3){
					let val = value.substr(2,2);
					value = val;
				}
				if((time === "startH" || time === "endH") && +value > 23) {
					value = "00";
				} else if(+value > 59) {
					value = "00";
				}
				this.tiemContent[index][time] = value;
			},
			prompt(index, opt) {
				let msgData = [];
				let timeMsg = [];
				this.timeDetail.map(i=>{
					let dayslot = [];
					i.dayslot.map(j=>{
						if(j.isSelect){
							dayslot.push({
								"start":j.start,
								"end":j.end
							})
						}
					});
					dayslot.length && timeMsg.push({
						"week":i.week,
						"dayslot":dayslot
					});
				})
				let msg = {
					"warnType": this.warnType, //报警类型
					"switch": 1, //默认为一
					"time": timeMsg //详细时间
				};
				msgData.push(msg);
				let ruleData = {
					msgType: 6, //默认为6
					msgData: msgData
				}
				let data = {
					ruleName: this.modleName, //模板名字
					ruleDetails: ruleData, //模板规则
					ruleType: this.warnType //报警类型
				}
				if(opt === "sure") {
					let len = data.ruleDetails.msgData[0].time;
					if(len.length > 0) {
						TOOLS.post("/alarm/template/save", data).then(res => {
							if(+res.data.code === 0) {
								this.$router.push("/Alarn/3/AlarnTemplate");
							};
						})
					} else {
						this.$store.commit("tipInputData", this.tip);
						this.$store.commit("isShow", true);
					}
				}

				if(opt === "cancel") {
					window.history.go(-1)
				}
			}
		},
		mounted() {
			this.weekData.map(() => {
				let tmp = [];
				this.tiemContent.map((i, j) => {
					tmp.push({
						id: j,
						isSelect: false,
						startH: "",
						startM: "",
						endH: "",
						endM: ""
					})
				})
				this.dayslot.push(tmp);
			});
		}
	}
</script>

<style lang="less">
	.new_alarm {
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
			width: 100%;
			border-bottom: 1px solid #979797;
			.alarm_modle {
				width: 388px;
				height: 400px;
				background: #FFFFFF;
				border: 1px solid #DDDDDD;
				border-radius: 10px;
				margin: 60px 0;
				.modle_name {
					width: 300px;
					height: 40px;
					margin: 20px auto;
					.modle_name_inp {
						width: 300px;
						height: 40px;
						border-bottom: 1px solid #DDDDDD;
					}
				}
				.selc_prompt {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 300px;
					height: 40px;
					margin: 0 auto;
					.selc_type {
						width: 150px;
						height: 40px;
						margin: 10px 10px 0 0;
					}
					.alarm_prompt {
						font-size: 14px;
						color: #939393;
					}
				}
				.week_com {
					width: 300px;
					height: auto;
					margin: 40px auto 20px auto;
				}
				.write_time {
					width: 300px;
					height: auto;
					margin: 0 auto;
					.time_title {
						width: 300%;
						height: 30px;
						display: flex;
						justify-content: flex-start;
						li {
							width: 65px;
							height: 30px;
							line-height: 30px;
							text-align: center;
							font-size: 13px;
							color: #828282;
						}
					}
					.tiem_content {
						width: 300px;
						height: auto;
						margin: 0 auto;
						li {
							width: 300px;
							height: 30px;
							display: flex;
							justify-content: space-between;
							align-items: center;
							span {
								font-size: 13px;
								color: #828282;
							}
							.time_wrap {
								width: 100px;
								input {
									width: 40px;
									height: 30px;
									font-size: 14px;
									color: #828282;
									text-align: center;
									border-bottom: 1px solid #D7D7D7;
								}
							}
							.img {
								cursor: pointer;
								width: 20px;
								height: 20px;
							}
						}
					}
				}
			}
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