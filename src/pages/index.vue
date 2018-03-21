<template>
	<article>
		<NavBar :data-nav="dataNav" @navIndex="getNavIndex"></NavBar>
		<sub-nav :sub-nav="subNav" v-if="showIndex === 0"></sub-nav>
		<section>
			<router-view></router-view>
		</section>
		<prompt-box :tipInputData="tipInputData" @getV="getValue"></prompt-box>
	</article>
</template>

<script>
	import NavBar from "@/components/Nav"
	import SubNav from "@/components/SubNav"
	import PromptBox from "@/components/PromptBox"
	export default {
		name: "index",
		components: {
			NavBar,
			SubNav,
			PromptBox
		},
		computed: {
			//从vuex中获取弹出框的数据
			tipInputData() {
				return this.$store.state.PromptBox.tipInputData
			}
		},
		data() {
			return {
				dataNav: [{
					title: "设备管理",
					src: "/Equipment/0/IPCTable/0"
				}, {
					title: "域名管理",
					src: "/Domain/1/DomainTable"
				}, {
					title: "固件管理",
					src: "/Firmware/2/FirmwareTable"
				}, {
					title: "报警管理",
					src: "/Alarn/3/AlarmDevices"
				}],
				showIndex: 0,
				subNav: [{
					title: "IPC管理",
					src: "/Equipment/0/IPCTable/0"
				}, {
					title: "NVR管理",
					src: "/Equipment/0/NVRTable/1"
				}],
				values: ""
			}
		},
		mounted() {
			let path = this.$route.params;
			this.showIndex = +path.index;
		},
		methods: {
			getNavIndex(index) {
				this.showIndex = index;
			},
			restartOption(url) {
				let ids = JSON.parse(TOOLS.cache("handleIds"));
				let data = null;

				if(url === "/camera/restart") {
					data = {
						ipcIds: ids.ipcIds
					}
				} else if(url === "/device/nvr/restart") {
					data = {
						nvrIds: ids.nvrIds
					}
				}

				TOOLS.put(url, data).then(res => {
					if(+res.data.code === 0) {
						this.$store.commit("isShow", false);
						this.$store.commit("isBlock");
						this.$store.commit("message", "重启命令已下发");
						this.$store.commit("err", false);
						sessionStorage.removeItem("handleIds"); //清空IDS
					};
				})
			},
			//判断是否筛选
			selectIPC(_this) {
				let type = TOOLS.cache("ipcType");
				if(type) {
					_this.$router.push("/SetAlarnPage")
				} else {
					_this.$store.commit("isBlock");
					_this.$store.commit("message", "请先选择IPC类型");
					_this.$store.commit("err", false);
				}
			},
			//获取弹出框组件传出来的值
			getValue(obj, callBack) {
				var objarr = obj.getD;
				let restartUrl = "";
				let tag = obj.tag;
				//IPC重启
				if(tag === "ipc") {
					restartUrl = "/camera/restart";
				}
				if(tag === "nvr") {
					restartUrl = "/device/nvr/restart";
				}
				//修改密码
				if(obj.type === "modifypwd") {
					objarr["username"] = TOOLS.cache("userName");
					if(objarr.password !== objarr.newpassword) {
						this.err = true;
						this.errTip = "两次密码输入不匹配，请重新输入";
						return false;
					} else if(objarr.currPassword === objarr.newpassword) {
						this.err = true;
						this.errTip = "新旧密码相同，请重新输入";
						return false;
					} else {
						this.err = false;
						this.errTip = "";
						delete objarr["newpassword"];
					}

					TOOLS.put("/user", objarr).then(res => {
						if(+res.data.code === 0) {
							this.tableData = res.data.data;
							this.$store.commit("isShow", false);
							this.$store.commit("isBlock");
							this.$store.commit("message", "修改成功");
							this.$store.commit("err", false);
							setTimeout(() => {
								this.$router.push("/logout")
							}, 1600)
						};
					})
				}

				//创建账号
				if(obj.type === "account") {
					if(objarr.password !== objarr.newpassword) {
						this.err = true;
						this.errTip = "两次密码输入不匹配，请重新输入";
						return false;
					} else {
						this.err = false;
						delete objarr["newpassword"];
					}
					TOOLS.post("/user/register", objarr).then(res => {
						if(+res.data.code === 0) {
							this.tableData = res.data.data;
							this.$store.commit("isShow", false);
							this.$store.commit("isBlock");
							this.$store.commit("message", "创建成功");
							this.$store.commit("err", false);
						};
					})
				}

				//退出登录
				if(obj.type === "handletips" && obj.value === "logout") {
					TOOLS.post("/user/logout", {
						id: TOOLS.cache("userId")
					}).then(res => {
						if(+res.data.code === 0) {
							this.$router.push("/logout");
							this.$store.commit("isShow", false);
							sessionStorage.removeItem("userId"); //清空userId
						}
					})
				}

				//关闭提示框
				if(obj.value === "onoff") {
					this.$store.commit("isShow", false);
				}
				//重置普通用户登录密码
				if(obj.type === "handletips" && obj.value === "resetpwd") {
					let id = this.$store.state.PromptBox.tableHandleIds.ids;
					TOOLS.put("/user/password", {
						ids: id
					}).then(res => {
						if(+res.data.code === 0) {
							this.$store.commit("isShow", false);
							this.$store.commit("isBlock");
							this.$store.commit("message", "重置成功");
							this.$store.commit("err", false);
							this.$store.commit("tableHandleIds", ""); //清空已经操作的IDS
						}
					})
				}

				//删除模板
				if(obj.type === "handletips" && obj.value === "deleteTemplate") {
					let id = this.$store.state.PromptBox.tableHandleIds;
					let tableState = this.$store.state.TableUnit.alarmTemplateTableState;

					let data = {
						pageIndex: tableState.index,
						pageSize: tableState.size.name,
						ruleType: tableState.warnState.id === -1 ? "" : state.warnState.id
					}
						
					TOOLS.delete("/alarm/template/" + id + "/delete", {}).then(res => {
						if(+res.data.code === 0) {
							this.$store.commit("isShow", false);
							this.$store.commit("isBlock");
							this.$store.commit("message", "删除成功");
							this.$store.commit("err", false);
							this.$store.dispatch("upDateTableData", {
								src: "/alarm/templates",
								state: data
							});
						};
					})
				}

				//权限密码申请
				if(obj.getD.passWord && obj.type === "input") {
					let data = {
						userId: TOOLS.cache("userId"),
						pwd: obj.getD.passWord
					}
					TOOLS.get("/user/handlePass", data).then(res => {
						if(+res.data.code === 0) {
							let that = this;
							this.$store.commit("isShow", false);
							switch(obj.flag) {
								case "push":
									this.$router.push("/SelectDomain")
									break;
								case "restart":
									this.restartOption(restartUrl);
									break;
								case "update":
									this.$router.push("/SelectUpdateConfig?tag=" + tag)
									break;
								case "setalarm":
									this.selectIPC(that);
									break;
								default:
									'';
							}
						};
					})
				}
			}
		}
	}
</script>

<style>

</style>