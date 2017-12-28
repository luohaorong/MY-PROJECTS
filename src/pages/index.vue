<template>
	<section>
		<NavBar :data-nav="dataNav" @navIndex="getNavIndex"></NavBar>
		<sub-nav :sub-nav="subNav" v-if="showIndex === 0"></sub-nav>
		<Equipment v-if="showIndex === 0">设备管理</Equipment>
		<h1 v-if="showIndex === 1">域名管理</h1>
		<h1 v-if="showIndex === 2">固件管理</h1>
		<h1 v-if="showIndex === 3">查询</h1>
	</section>
</template>

<script>
	import NavBar from "@/components/Nav"
	import Equipment from "@/components/Equipment"
	import SubNav from "@/components/SubNav"
	import { mapState } from 'vuex';
	export default {
		name:"index",
		components:{
			NavBar,
			Equipment,
			SubNav
		},
		data(){
			return{
				dataNav:["设备管理","域名管理","固件管理","查询"],
				showIndex:0,
				subNav:["PC管理","屏设备管理","NVR管理"]
			}
		},
		methods:{
			getNavIndex(index){
				this.showIndex = index;
			}
		}
		
		
	}
		

</script>

<style>
</style>