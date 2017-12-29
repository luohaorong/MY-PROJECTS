<template>
	<article>
		<NavBar :data-nav="dataNav" @navIndex="getNavIndex"></NavBar>
		<sub-nav :sub-nav="subNav" v-if="showIndex === 0"></sub-nav>
		<section>
			<router-view></router-view>
		</section>
	</article>
</template>

<script>
	import NavBar from "@/components/Nav"
	import SubNav from "@/components/SubNav"

	import { mapState } from 'vuex';

	export default {
		name: "index",
		components: {
			NavBar,
			SubNav
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
			}
		}

	}
</script>

<style>

</style>