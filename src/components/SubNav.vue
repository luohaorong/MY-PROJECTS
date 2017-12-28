<template>
	<section class="sax_sub_nav">
		<ul class="sub_nav_list">
			<li class="sub_list_item" v-for="(item,index) in subNav" :class="{sub_active:subActive === index}" @click="changeNav(index)">{{ item }}</li>
		</ul>
		
	</section>
</template>

<script>
	export default{
		name:"subNav",
		props:["subNav"],
		data(){
			return {
				subActive:0
			}
		},
		methods:{
			changeNav(index){
				this.subActive = index;
			}
		}
	}
</script>

<style>
	.sax_sub_nav{
		width: 100%;
		height: 50px;
		background-color: #FFFFFF;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
	}
	.sub_nav_list{
		width: calc(100% - 113px);
		height: 50px;
		margin-left: 113px;
		display: flex;
		justify-content: flex-start;
	}
	.sub_list_item{
		width: 100px;
		height: 50px;
		line-height: 50px;
		font-size: 14px;
		color: #000000;
		cursor: pointer;
	}
	.sub_active{
		color:  #E57738;
	}
</style>