<template>
	<article>
		<NavBar :data-nav="dataNav" @navIndex="getNavIndex"></NavBar>
		<sub-nav :sub-nav="subNav" v-if="showIndex === 0"></sub-nav>
		<section>
			<router-view></router-view>
		</section>
		<prompt-box :tipInputData="tipInputData" @getV="getValue" @handle="handle"></prompt-box>
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
						src: "/Equipment"
					}, {
						title: "域名管理",
						src: "/Domain"
					}, {
						title: "固件管理",
						src: "/Firmware"
					}
					/*, {
										title: "查询",
										src: "/Search"
									}*/
				],
				showIndex: 0,
				subNav: [{
					title: "IPC管理",
					src: "/Equipment/IPC"
				}, {
					title: "屏设备管理",
					src: "/Equipment/Screen"
				}, {
					title: "NVR管理",
					src: "/Equipment/NVR"
				}],
				values: ""
			}
		},
		methods: {
			getNavIndex(index) {
				this.showIndex = index;
			},
			//获取弹出框组件传出来的值
			getValue(data) {
				
				console.log("354564564",data)
				
				//权限密码申请
				if(data.option === "rightpwd" && data.data[0]) {
					TOOLS.get("/user/handlePass ", {
						userId: TOOLS.cache("userId"),
						pwd: data.data[0]
					}).then(res => {
						if(+res.data.code === 0) {
							this.tableData = res.data.data;
							this.$store.commit("isShow", false);
						};
					})
				}

				//修改密码
				if(data.option === "modifypwd") {
					TOOLS.put("/user ", {
						username: TOOLS.cache("username"),
						currPassword: password,
						password: newPassword
					}).then(res => {
						if(+res.data.code === 0) {
							
							console.log(res)
							
							this.tableData = res.data.data;
							this.$store.commit("isShow", false);
						};
					})
				}
			},
			//确定操作
			handle(val) {
				
				console.log(val)
				
				if(val === "logout") {
					TOOLS.post("/user/logout", {
						id: TOOLS.cache("userId")
					}).then(res => {
						if(+res.data.code === 0) {
							this.$router.push("/logout")
							this.$store.commit("isShow", false);
						}
					})
				}
			}
		}

	}
</script>

<style>

</style>