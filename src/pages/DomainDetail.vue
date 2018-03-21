<template>
	<div class="domailDetail">
		<detail :data="data" @canEdit="canEdit" @headerBtnClick="headerBtnClick">
			<div slot="domainRule">
				<ReleaseRule :ruleData="ruleData"></ReleaseRule>       
			</div>
		</detail>
		<div class="submit_btns" v-if="myEdit">
			<ButtonTemp v-for="(item,index) in items" :message="item" :keys="'btn' + index" class="button-style" @btnClick="handle(index)"></ButtonTemp>
		</div>
	</div>
</template>

<script>
	import Detail from "@/components/Detail"
	import ButtonTemp from "@/components/ButtonTemp"
	import ReleaseRule from "@/components/ReleaseRule"
	export default {
		name: "IPCDetail",
		components: {
			Detail,
			ButtonTemp,
			ReleaseRule
		},
		data() {
			return {
				data: {
					header: {
						title: "域名详情",
						src: "/static/images/edit.png",
						buttonMsg: [{
							txt: "返回"
						}],
						isEdit: true
					},
					body: []
				},
				items: [{
					txt: "确定"
				}, {
					txt: "取消",
					background: "#DDDDDD"
				}],
				myEdit: false,
				playHost: "",
				pushHost: "",
				pushFlowProtocol: "",
				pushType: "",
				releaseType: "",
				publishedNumber: "",
				priorityNumber: "",
				playPrimaryKey: "",
				streamProviderId: "",
				baseData: {},
				ruleData: {
					releaseType: "",
					priorityNumber: "",
					releaseRule: ""
				}
			}
		},
		methods: {
			headerBtnClick(data) {
				window.history.go(-1);
			},
			canEdit() {
				this.myEdit = true
			},
			handle(val) {
				if(val % 2 == 0) {
					let id = this.$route.query.id;
					let data = this.$store.state.Detail.editData;

					data["id"] = id;
					data["playAuthSwtich"] = true;
					data["pushAuthSwtich"] = true;
					data["playHost"] = this.playHost;
					data["pushHost"] = this.pushHost;
					data["pushFlowProtocol"] = this.pushFlowProtocol;
					data["pushType"] = this.pushType;
					data["releaseType"] = this.releaseType;
					data["publishedNumber"] = this.publishedNumber;
					data["priorityNumber"] = this.priorityNumber;
					data["playPrimaryKey"] = this.playPrimaryKey;
					data["streamProviderId"] = this.streamProviderId;

					TOOLS.put("/stream", data).then(res => {
						if(+res.data.code === 0) {
							this.$store.commit("isBlock");
							this.$store.commit("message", res.data.message);
							this.$store.commit("err", false);
							this.$router.push("/Domain/1/DomainTable")
						};
					}).catch(err => {
						this.$store.commit("isBlock");
						this.$store.commit("message", err.message);
						this.$store.commit("err", false);
					})
				} else {
					window.history.go(-1);
				}
			}
		},
		beforeMount() {
			let id = this.$route.query.id;
			TOOLS.get("/stream/" + id).then(res => {
				let data = res.data;
				if(+data.code === 0) {
					let body = data.data;

					let filter = this.$store.getters.screenData(body);
					let pushType = filter.pushType
					let pushProtocol = filter.pushProtocol
					let time = this.$store.getters.creatTime(body.updateDate); //创建时间

					this.playHost = body.playHost;
					this.pushHost = body.pushHost;
					this.pushFlowProtocol = body.pushProtocol;
					this.pushType = body.pushType;
					this.releaseType = body.releaseType;
					this.publishedNumber = body.publishedNumber;
					this.priorityNumber = body.priorityNumber;
					this.playPrimaryKey = body.playPrimaryKey;
					this.streamProviderId = body.streamProviderId

					this.ruleData.releaseType = body.releaseType;
					this.ruleData.priorityNumber = body.priorityNumber;
					
					if(body.releaseRule){
						this.ruleData.releaseRule = JSON.parse(body.releaseRule);
					}

					this.data.body = [{
						content: [{
								title: "推流域名",
								txt: [{
									name: "",
									key: "pushHost",
									value: body.pushHost
								}]
							},
							{
								title: "播放域名",
								txt: [{
									name: "",
									key: "playHost",
									value: body.playHost
								}]
							}, {
								title: "服务商",
								txt: [{
									name: "",
									key: "name",
									value: body.name
								}]
							}, {
								title: "创建时间",
								txt: [{
									name: "",
									key: "updateDate",
									value: time
								}]
							}
						]
					}, {
						title: "推流鉴权",
						content: [{
								title: "协议",
								txt: [{
									name: "",
									key: "pushProtocol",
									value: "RTMP"
								}]
							},
							{
								title: "推流KEY",
								isEdit: true,
								txt: [{
									name: "",
									key: "pushKey",
									value: body.pushKey
								}]
							}, {
								title: "默认推流地址防盗时长(秒)",
								isEdit: true,
								txt: [{
									name: "",
									key: "pushValidTime",
									value: body.pushValidTime,
									reg: {
										reg: /[^\d.]/g,
										target: "pushValidTime"
									}
								}]
							}, {
								title: "推流上限数",
								isEdit: true,
								txt: [{
									name: "",
									key: "upperLimit",
									value: body.upperLimit,
									reg: {
										reg: /[^\d.]/g,
										target: "upperLimit"
									}
								}]
							}, {
								title: "推流类型",
								txt: [{
									name: "",
									key: "pushType",
									value: pushType
								}]
							}, {
								title: "已发布推流数",
								txt: [{
									name: "",
									key: "publishedNumber",
									value: body.publishedNumber,
									reg: {
										reg: /[^\d.]/g,
										target: "publishedNumber"
									}
								}]
							}
						]
					}, {
						title: "播放鉴权",
						content: [{
							title: "播放KEY",
							isEdit: true,
							txt: [{
								name: "",
								key: "playKey",
								value: body.playPrimaryKey
							}]
						}, {
							title: "默认播放有效时长(秒)",
							isEdit: true,
							txt: [{
								name: "",
								key: "playValidTime",
								value: body.playValidTime,
								reg: {
									reg: /[^\d.]/g,
									target: "playValidTime"
								}
							}]
						}, {
							title: "",
							txt: [{
								name: "",
								isSlot: true,
								slotName: "domainRule",
								value: ""
							}]
						}]
					}];
					this.$store.getters.detailData(this.data.body);
				}
			})
		},
		mounted() {
			this.myEdit = false //初始开关化状态
		}
	}
</script>

<style lang="less">
	@import url("../assets/styles/templete.less");
	.domailDetail {
		#body_list1, #body_list2 {
			.body_item {
				width: auto;
			}
		}
		.detail_container {
			input {
				width: 156px;
				height: 36px!important;
			}
			.item_img {
				display: none;
			}
			.body_item {
				width: 12%!important;
				margin-right: none!important;
			}
		}
		.submit_btns {
			width: 210px;
			margin-left: 5%;
			display: flex;
			justify-content: space-between;
			.button-style {
				.widthHeightBbRadius(100px, 36px, #ffa671, 18px);
				.centerLinehFontsColor(36px, 14px);
			}
		}
		.active() {
			border: 1px solid #E0E0E0;
			cursor: pointer;
			margin-left: 15px;
			.widthHeightBbRadius(50px, 20px, #ffa671, 10px);
			.switch_btn {
				magrgin-left: 30px;
				.widthHeightBbRadius(20px, 20px, #fff, 25px);
			}
		}
		.BRactiveTrue {
			.flexJustifyCentFlexend();
			.active();
		}
		.BRactiveFalse {
			.flexJustifyCentFlexstart();
			.active();
			background: #DDDDDD;
		}
		.ShowReleaseRule {
			width: 300px;
		}
	}
</style>