<template>
	<div class="createDomain">
		<detail :data="data" @headerBtnClick="headerBtnClick" :allEdit="true">
			<div slot="divceType">
				<select-unit class="pushType" :select-item="divceTypeItem" @selectValue="streamProvider"></select-unit>
			</div>
			<div slot="divcemodel">
				<select-unit class="onlineType" :select-item="divceModelItem" @selectValue="pushStreamType"></select-unit>
			</div>
			<div slot="publishDomain">
				<publish-domain @ruleUp="ruleUp" @priorityUp="priorityUp"></publish-domain>
			</div>
		</detail>
		<div class="submit_btns">
			<ButtonTemp v-for="(item,index) in items" :message="item" :keys="'btn' + index" class="button-style" @btnClick="handle(index)"></ButtonTemp>
		</div>
	</div>
</template>

<script>
	import Detail from "@/components/Detail"
	import ButtonTemp from "@/components/ButtonTemp"
	import selectUnit from "@/components/NewSelect"
	import publishDomain from "@/components/PublishDomain"
	export default {
		name: "IPCDetail",
		components: {
			Detail,
			ButtonTemp,
			selectUnit,
			publishDomain
		},
		data() {
			return {
				data: {
					header: {
						title: "创建域名"
					},
					body: [{
						content: [{
								title: "服务商",
								txt: [{
									name: "",
									isSlot: true,
									slotName: "divceType",
									key: "streamProviderId",
									value: ""
								}]
							},
							{
								title: "推流类型",
								txt: [{
									name: "",
									isSlot: true,
									slotName: "divcemodel",
									key: "pushType",
									value: ""
								}]
							}, {
								title: "推流协议",
								txt: [{
									name: "",
									key: "pushFlowProtocol",
									value: "RTMP"
								}]
							}, {
								title: "推流域名",
								isEdit: true,
								txt: [{
									name: "",
									maxlength: "64",
									placeholder: "推流域名最大为64位",
									key: "pushHost",
									value: ""
								}]
							}, {
								title: "推流上限数",
								isEdit: true,
								txt: [{
									name: "",
									maxlength: "6",
									placeholder: "推流最大数为999999",
									key: "upperLimit",
									value: "",
									reg:{
										reg:/[^\d.]/g,
										target:"upperLimit"
									}
								}]
							}, {
								title: "播放域名",
								isEdit: true,
								txt: [{
									name: "",
									maxlength: "64",
									placeholder: "播放域名最大为64位",
									key: "playHost",
									value: ""
								}]
							},
							{
								title: "",
								txt: [{
									name: "",
									isSlot: true,
									slotName: "publishDomain",
									key: "publishDomain",
									value: ""
								}]
							}
						]
					}, {
						title: "推流鉴权",
						content: [{
								title: "推流KEY",
								isEdit: true,
								txt: [{
									name: "",
									maxlength: "32",
									placeholder: "推流KEY长度6-32位",
									key: "pushKey",
									value: ""
								}]
							},
							{
								title: "默认推流地址防盗时长(秒)",
								isEdit: true,
								txt: [{
									name: "",
									key: "pushValidTime",
									value: "1800",
									reg:{
										reg:/[^\d.]/g,
										target:"playHost"
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
									maxlength: "32",
									placeholder: "播放KEY长度6-32位",
									key: "playPrimaryKey",
									value: ""
								}]
							},
							{
								title: "默认播放有效时长 (秒)",
								isEdit: true,
								txt: [{
									name: "",
									key: "playValidTime",
									value: "1800",
									reg:{
										reg:/[^\d.]/g,
										target:"playHost"
									}
								}]
							}
						]
					}]
				},
				items: [{
					txt: "确定",
					background: ""
				}, {
					txt: "取消",
					background: "#DDDDDD"
				}],
				divceTypeItem: {
					name: "showDeviceItem",
					gray: "阿里云",
					list: [{
						name: "阿里云",
						id: 1
					}, {
						name: "七牛",
						id: 2
					}]
				},
				divceModelItem: {
					name: "showDeviceModelItem",
					gray: "推流类型",
					list: [{
						name: "普通推流",
						id: 0
					}, {
						name: "边缘推流",
						id: 1
					}]
				},
				myEdit: false,
				streamProviderId: "1", //默认为阿里云
				pushType: "0" ,//默认为普通推流
				priorityNumber: ""
			}
		},
		methods: {
			streamProvider(val) {
				this.streamProviderId = val.id	
			},
			pushStreamType(val) {
				this.pushType = val.id
			},
			headerBtnClick(data) {
				window.history.go(-1);
			},
			handle(val) {
				if(val % 2 == 0) {
					let data = this.$store.state.Detail.editData;
					let releaseType = this.$store.state.Detail.releaseType;
					let ruleData = this.$store.state.Detail.ruleData;
					data["pushType"] = this.pushType; //
					data["streamProviderId"] = this.streamProviderId;
					data["pushProtocol"] = "1";
					data.releaseType = releaseType; //发布类型
				
					if(+releaseType === 0){
						data.priorityNumber = this.priorityNumber;
						delete data.ruleData;
					}
					
					if(+releaseType === 1){
						data.releaseRule = ruleData;// 按规则发布
						delete data.priorityNumber;
					}
					
					let opt = {
						src: "/stream",
						params: data,
						body: this.data.body,
						type: "post",
						fn: (res) => {
							if(res.data.code == "0") {
								this.$store.commit("ruleData",[]);
								this.$router.push("/Domain/1/DomainTable");
							};
						}
					};
					this.$store.dispatch("pullData", opt);

				} else {
					window.history.go(-1);
				}
			},
			ruleUp(data){
				
			},
			priorityUp(data){
				this.priorityNumber = data
			}
		},
		beforeMount() {
			this.$store.getters.detailData(this.data.body);
		}
	}
</script>

<style lang="less">
	@import url("../assets/styles/templete.less");
	
	.createDomain{
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
			width: 19%!important;
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
		margin-bottom: 90px;
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
	.publishContain{
		width: 480px;
		height: auto;
		position: absolute;
		top: 488px;
		left: 40%;
	}
	}
	
</style>