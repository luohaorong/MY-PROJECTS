<template>
	<article>
		<detail :data="data" @headerBtnClick="headerBtnClick" @itemClick="itemClick" @itemOkClick="itemOkClick" @itemCacelClick="itemCacelClick" @blurItem="blurItem">
			<section slot="stream_type">
				<select :disabled="isShow" class="selectList" @change="streamChange" v-model="stream">
					<option :value="item" :data-id="item.id" v-for="(item,index) in streamData">{{ item.name }}</option>
				</select>
			</section>
			<section slot="resolution_ratio">
				<select :disabled="isShow" class="selectList" @click="ratioChange" v-model="ration">
					<option :value="item" :data-id="item.id" v-if="ratioShow === item.type" v-for="(item,index) in resolutionData"> {{item.name}} </option>
				</select>
			</section>

			//报警设置展示
			<div slot="alarmShow">
				<alarm-show :alarmList="item" :alarntype="alarntype[index]" v-for="(item,index) in alarmList" @switch="switchBtn(index)"></alarm-show>
			</div>

			<div slot="abnormal">
				<AbnormalLog :deviceExceptions="deviceExceptions"></AbnormalLog>
			</div>

			<span class="play" slot="rtmp" @click="playClick($event)" :data-type="2">
				播放
			</span>
			<span class="play" slot="flv" @click="playClick($event)" :data-type="3">
				播放
			</span>
			<span class="play" slot="m3u8" @click="playClick($event)" :data-type="1">
				播放
			</span>
		</detail>
		<!--视频播放-->
		<div id="playVideo" v-show="isPlayer">
			<div id="closeVideo" @click="closePlayer"></div>
			<div id="J_prismPlayer" class="prism-player"></div>
			<div class="playUrl">播放地址：{{playUrl}}</div>
		</div>
	</article>
</template>

<script>
	import Detail from "@/components/Detail"
	import AlarmShow from "@/components/AlarmShow"
	import AbnormalLog from "@/components/AbnormalLog"
	import "../../static/plugin/aliplayer/aliplayer.js"
	export default {
		name: "IPCDetail",
		components: {
			Detail,
			AlarmShow,
			AbnormalLog
		},
		data() {
			return {
				data: {
					header: {
						title: "IPC详情",
						src: "/static/images/edit.png",
						buttonMsg: [{
							txt: "返回",
							tag: "back"
						}, {
							txt: "查看录制记录",
							tag: "recode"
						}]
					},
					body: []
				},
				alarntype: [{
					name: "视频遮挡",
					flag: true
				}, {
					name: "视频丢失",
					flag: true
				}],
				stream: '',
				ration: '',
				rationVal: '',
				isShow: true,
				ratioShow: 1,
				ipcId: "",
				player: {},
				isPlayer: false,
				streamData: [{
					name: "主码流",
					id: 2,
					type: 1
				}, {
					name: "副码流",
					id: 1,
					type: 2
				}],
				resolutionData: [{
					name: 'VGA 640*480',
					id: 1,
					type: 1,
					value: "640*480"
				}, {
					name: '4CIF 704*576',
					id: 2,
					type: 1,
					value: "704*576"
				}, {
					name: '720P 1280*720',
					id: 3,
					type: 1,
					value: "1280*720"
				}, {
					name: '960P 1280*960',
					id: 4,
					type: 1,
					value: "1280*960"
				}, {
					name: '1080P 1920*1080',
					id: 5,
					type: 1,
					value: "1920*1080"
				}, {
					name: 'CIF 352*288',
					id: 6,
					type: 2,
					value: "352*288"
				}, {
					name: 'CIF 704*288',
					id: 7,
					type: 2,
					value: "704*288"
				}, {
					name: '4CIF 704*576',
					id: 8,
					type: 2,
					value: "704*576"
				}],
				alarmList: {},
				deviceExceptions: {},
				alarmType: "",
				playUrl: ""
			}
		},
		methods: {
			//点击返回
			headerBtnClick(data) {
				if(data.tag === "back") {
					this.$router.push("/Equipment/0/IPCTable/0")
				} else if(data.tag === "recode") {
					this.$router.push("/Equipment/0/Recodes/0?ipcId=" + this.ipcId)
				}
			},
			//点击编辑
			itemClick(data) {
				if(data.data && data.data.key === "resolution_ratio") {
					this.isShow = false; //是否可以编辑
				}
			},
			//编辑完成
			itemOkClick(data) {
				let editData = this.$store.state.Detail.editData; //所有可编辑的数据
				let streamId = this.stream.id;
				let ration = this.ration.value;
				let opt = {};
				if(!ration) {
					this.$store.commit("isBlock", true);
					this.$store.commit("message", "请选择分辨率");
					this.$store.commit("err", true);
					this.isShow = true; //是否可以编辑
				} else if(data.data === "resolution_ratio") {
					opt = {
						src: "/camera/transcode",
						params: {
							ipcId: this.ipcId,
							definition: streamId,
							resolution: ration
						},
						data: data,
						fn: res => {
							if(res.data.code = 0) {
								this.isShow = true; //是否可以编辑
							}
						},
						body: this.data.body,
						type: "get"
					};
					this.$store.dispatch("pullData", opt);
					this.isShow = true; //是否可以编辑
				};
				switch(data.data) {
					case "title":
						opt = {
							src: "/camera/title",
							params: {
								ipcId: this.ipcId,
								title: editData.title
							},
							data: data,
							body: this.data.body,
							type: "get"
						};
						this.$store.dispatch("pullData", opt);
						break;
					case "registerAddress":
						opt = {
							src: "/camera/registerAddr",
							params: {
								ipcId: this.ipcId,
								address: editData.registerAddress
							},
							data: data,
							body: this.data.body,
							type: "get"
						};
						this.$store.dispatch("pullData", opt);
						break;
					case "playDuration":
						opt = {
							src: "/camera/playtime",
							params: {
								id: this.$route.query.id,
								playValidTime: editData.playDuration
							},
							data: data,
							body: this.data.body,
							type: "put",
							reg: {
								reg: /[^\d.]/g,
								target: "playValidTime",
								message: "只填写数字"
							} //用于input框验证的正则表达式

						};
						this.$store.dispatch("pullData", opt);
						break;
					case "pushDuration":
						opt = {
							src: "/camera/pushtime",
							params: {
								id: this.$route.query.id,
								pushValidTime: editData.pushDuration
							},
							data: data,
							body: this.data.body,
							type: "put",
							reg: {
								reg: /[^\d.]/g,
								target: "pushValidTime",
								message: "只填写数字"
							} //用于input框验证的正则表达式
						};
						this.$store.dispatch("pullData", opt);
						break;
				};
			},
			//点击播放视频
			playClick(e) {
				let target = e.target;
				let type = target.getAttribute("data-type");
				this.isPlayer = true;

				TOOLS.get("/camera/" + this.ipcId + "/live", {
					viewType: type
				}).then(res => {
					if(res.data.code === 0) {
						let liveUrl = res.data.data.liveUrl;
						let playtDuration = res.data.data.playtDuration * 1000;
						this.playUrl = liveUrl
						this.InitPlayer(liveUrl);
						var timer = setTimeout(() => {
							this.$store.commit("isBlock", true);
							this.$store.commit("message", "播放地址已过期，请重新获取");
							this.$store.commit("err", true);
						}, playtDuration);
					}
				})

			},
			closePlayer() {
				this.isPlayer = false;
			},
			//取消编辑
			itemCacelClick() {
				this.isShow = true;
			},
			//失焦
			blurItem(data) {
				console.log(data)
			},
			//选择码流类型
			streamChange() {
				let tmp = [];
				this.ratioShow = this.stream.type;
				this.resolutionData.map((item, index) => {
					if(item.type === this.ratioShow) {
						tmp.push(item)
					}
				});
				this.ration = tmp[0];
			},
			//选择码流的值
			ratioChange() {

			},
			switchBtn(val) {
				let data = {};
				data.ipcId = this.ipcId;
				let list = this.alarmList[val];
				data.rulesSetId = list.id;

				if(+list.alarmKey === 1) {
					data.swithKey = "0"
				}
				if(+list.alarmKey === 0) {
					data.swithKey = "1"
				}
				data.ipcType = this.alarmType;

				TOOLS.post("/camera/openclosealarm", data).then(res => {
					if(+res.data.code === 0) {

						if(this.alarntype[val].flag) {
							list.alarmKey = "0"
						} else {
							list.alarmKey = "1"
						}

						this.alarntype[val].flag = !this.alarntype[val].flag;
					}
				})
			},
			InitPlayer(url) {
				this.player = new Aliplayer({
					id: "J_prismPlayer", // 容器id
					source: url, // 视频url 支持互联网可直接访问的视频地址
					autoplay: true, // 自动播放
					width: "650px", // 播放器宽度
					height: "360px", // 播放器高度
					skinLayout: [{
							name: "bigPlayButton",
							"align": "cc"
						},
						{
							name: "errorDisplay",
							align: "tlabs",
							x: 0,
							y: 0
						},
						{
							name: "infoDisplay",
							align: "cc"
						}
					]
				})
			}
		},
		beforeMount() {
			this.stream = this.streamData[0];
			this.ration = this.resolutionData[0];
			let id = this.$route.query.id;
			TOOLS.get("/camera/" + id).then(res => {
				let data = res.data;
				if(+data.code === 0) {
					let body = data.data;
					let time = this.$store.getters.creatTime(body.createDate); //创建时间
					let updateDate = "";
					if(body.device) {
						updateDate = this.$store.getters.creatTime(body.device.updateDate); //最后上线 
					}
					let filter = this.$store.getters.screenData(body);
					let status = filter.status; //设备状态
					let streamStatus = filter.streamStatus; //推流状态
					let state = filter.state; //在线状态
					let recordStaus = filter.recordStaus; //录制状态
					let pushProtocol = filter.pushProtocol; //推流协议
					let deviceType = filter.deviceType; //网关设备类型
					this.ipcId = body.ipcId;
					this.deviceExceptions = body.deviceExceptions;
					this.alarmList = body.alarmRulesSet;
					this.alarmType = body.alarmType;

					this.alarmList.map((i, index) => {
						if(+i.alarmKey === 1) {
							this.alarntype[index].flag = true
						} else {
							this.alarntype[index].flag = false
						}
					})

					if(this.alarmType != "nvripc") {
						this.data.header.buttonMsg.pop()
					}

					this.data.body = [{
							content: [{
									title: "IPC ID",
									txt: [{
										name: "",
										key: "ipcId",
										value: body.ipcId
									}]
								},
								{
									title: "IPC MAC",
									txt: [{
										name: "",
										key: "ipcMac",
										value: body.ipcMac
									}]
								}, {
									title: "IPC 型号",
									txt: [{
										name: "",
										key: "ipcModel",
										value: body.ipcModel
									}]
								}, {
									title: "IPC 标题",
									src: "/static/images/edit.png",
									isEdit: true,
									txt: [{
										name: "",
										key: "title",
										value: body.title
									}]
								}, {
									title: "固件版本",
									txt: [{
										name: "",
										key: "fwVersion",
										value: body.fwVersion
									}]
								}, {
									title: "注册时间",
									txt: [{
										name: "",
										key: "time",
										value: time
									}]
								}, {
									title: "注册地址",
									isEdit: true,
									src: "/static/images/edit.png",
									txt: [{
										name: "",
										key: "registerAddress",
										value: body.registerAddress
									}]
								}, {
									title: "设备状态",
									txt: [{
										name: "",
										key: "status",
										value: status
									}]
								}, {
									title: "推流状态",
									txt: [{
										name: "",
										key: "streamStatus",
										value: streamStatus
									}]
								}, {
									title: "绑定状态",
									txt: [{
										key: "bind",
										name: "",
										value: body.bind ? "绑定" : "未绑定"
									}]
								}, {
									title: "在线状态",
									txt: [{
										key: "state",
										name: "",
										value: state
									}]
								}, {
									title: "录制状态",
									txt: [{
										key: "recordStaus",
										name: "",
										value: recordStaus
									}]
								}, {
									title: "最后上线时间",
									txt: [{
										key: "updateDate",
										name: "",
										value: updateDate
									}]
								}, {
									title: "外网地址",
									txt: [{
										key: "networkIp",
										name: "",
										value: body.push.networkIp
									}]
								}
							]
						},
						{
							content: [{
									title: "推流鉴权",
									txt: [{
										key: "pushProtocol",
										name: "推流支持协议：",
										value: pushProtocol
									}, {
										key: "pushAddr",
										name: "推流地址：",
										value: body.push.pushAddr
									}, {
										name: "推流地址过期时长：",
										key: "pushDuration",
										value: body.push.pushDuration,
										src: "/static/images/edit.png",
										isEdit: true
									}, {
										name: "码流类型：",
										key: "stream_type",
										isSlot: true,
										slotName: "stream_type"
									}, {
										name: "分辨率：",
										key: "resolution_ratio",
										isSlot: true,
										slotName: "resolution_ratio",
										src: "/static/images/edit.png",
										isEdit: true
									}]

								},
								{
									title: "播放鉴权",
									txt: [{
										key: "iotAddr",
										name: "播放地址：",
										value: body.play.iotAddr
									}, {
										key: "rtmp",
										name: "RTMP格式：",
										value: body.play.rtmp,
										isSlot: true,
										slotName: "rtmp"
									}, {
										key: "flv",
										name: "FLV格式：",
										value: body.play.flv,
										isSlot: true,
										slotName: "flv"
									}, {
										key: "m3u8",
										name: "M3U8格式：",
										value: body.play.m3u8,
										isSlot: true,
										slotName: "m3u8"
									}, {
										key: "playDuration",
										name: "播放时长：",
										value: body.play.playDuration,
										src: "/static/images/edit.png",
										isEdit: true
									}]
								}
							]
						},
						{
							title: "绑定商家信息",
							content: [{
									title: "绑定商家信息",
									txt: [{
										key: "cateringName",
										name: "商家名称：",
										value: body.cateringName
									}, {
										key: "cateringAddress",
										name: "商家地址：",
										value: body.cateringAddress
									}, {
										key: "cateringCode",
										name: "餐饮服务许可证号：",
										value: body.cateringCode
									}, {
										key: "managementCode",
										name: "经营服务许可证号：",
										value: body.managementCode
									}]

								},
								{
									title: "是否存在网关设备:",
									txt: [{
										key: "mac",
										name: "网关设备MAC：",
										value: body.device ? body.device.mac : ""
									}, {
										key: "id",
										name: "网关设备ID：",
										value: body.device ? body.device.id : ""
									}, {
										key: "deviceType",
										name: "网关设备类型：",
										value: deviceType
									}]
								}
							]
						}, {
							title: "",
							content: [{
								title: "报警设置",
								txt: [{
									isSlot: true,
									slotName: "alarmShow"
								}]
							}]
						}, {
							title: "",
							content: [{
								title: "异常记录",
								txt: [{
									isSlot: true,
									slotName: "abnormal"
								}]
							}]
						}
					];
					this.$store.getters.detailData(this.data.body);
				}
			})
		},
		mounted() {
			this.InitPlayer();
		}
	}
</script>

<style lang="less">
	#body_list1 {
		.body_item {
			width: auto;
		}
	}
	
	#body_list2 {
		.body_item {
			min-width: 500px;
		}
	}
	
	.selectList {
		min-width: 90px;
		height: 20px;
		border: 1px solid #D7D7D7;
		border-radius: 100px;
		padding: 0 8px;
		cursor: pointer;
		outline: none;
	}
	
	.play {
		cursor: pointer;
	}
	/*视屏样式*/
	
	#playVideo {
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -325px;
		margin-top: -180px;
		z-index: 100;
		width: 650px;
		height: 360px;
		background-color: #000000;
		.playUrl {
			width: 100%;
			height: 60px;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 100;
			background: #ddd;
			opacity: 0.6;
			word-break:break-all;
			padding: 10px;
		}
	}
	
	#closeVideo {
		width: 32px;
		height: 32px;
		position: absolute;
		top: 20px;
		right: 16px;
		z-index: 100;
		background-image: url(/static/images/close11.png);
		background-repeat: no-repeat;
		background-size: 32px;
		cursor: pointer;
	}
	
	#body_list3 {
		.body_content {
			.body_item {
				width: 100%!important;
				.com_item {
					width: 100%!important;
				}
			}
		}
	}
</style>