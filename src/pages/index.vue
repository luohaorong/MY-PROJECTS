<template>
	<article>
		<NavBar :data-nav="dataNav" @navIndex="getNavIndex"></NavBar>
		<sub-nav :sub-nav="subNav" v-if="showIndex === 0"></sub-nav>
		<section>
			<router-view></router-view>
		</section>
		<prompt-box :tipInputData="tipInputData"  @getV="getValue" ></prompt-box>
	</article>
</template>

<script>
	import NavBar from "@/components/Nav"
	import SubNav from "@/components/SubNav"
	import PromptBox from "@/components/PromptBox"

	import { mapState } from 'vuex';

	export default {
		name: "index",
		components: {
			NavBar,
			SubNav,
			PromptBox
		},
		data() {
			return {
				tipInputData:{
					title:"标题",
					type:"",
					tip:[{
							name:"userName",
							placeholder:"密码重置后不可恢复，确定要重置吗？",
							reg:/\w/g,
							errorTip:"账号输入有误"
						},{
							name:"passWord",
							placeholder:"(重置后的密码: 123456)",
							reg:/\w/g,
							errorTip:"密码输入有误"
						}],
					notice:"确认操作后无法恢复，请谨慎操作！"	
				},
				dataNav: [{
					title: "设备管理",
					src: "/Equipment"
				}, {
					title: "域名管理",
					src: "/Domain"
				}, {
					title: "固件管理",
					src: "/Firmware"
				}, {
					title: "查询",
					src: "/Search"
				}],
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
				}]
			}
		},
		methods: {
			getNavIndex(index) {
				this.showIndex = index;
			},
			getValue(data){
				console.log(data)
			}
			
		}

	}
</script>

<style>
	
</style>