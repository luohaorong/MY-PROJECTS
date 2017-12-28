<template>
	<section class="sax_nav">
		<ul class="nav_list">
			<li class="list_item"  v-for="(item,index) in dataNav" :class="{active_nav:index === nowIndex}" @click="checked(index)">{{ item }}</li>
		</ul>
	</section>
</template>

<script>
	export default {
		props:["dataNav"],
		name:"NavBar",
		data(){
			return{
				nowIndex:0
			}
		},
		methods:{
			checked(index){
				this.nowIndex = index;
				this.$emit("navIndex",this.nowIndex);
			}
		}
	}
</script>

<style>
	.sax_nav{
		background-color: #363636;
		width: 100%;
		height: 82px;
	}
	.nav_list{
		width: calc(100% - 113px);
		height: 82px;
		margin-left: 84px;
		display: flex;
		justify-content: flex-start;
	}
	.list_item{
		width: 140px;
		height: 78px;
		line-height: 78px;
		font-size: 20px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		cursor: pointer;
	}
	.active_nav{
	    color: #FFA671;
    	border-bottom: 4px solid #FFA671;
	}
</style>