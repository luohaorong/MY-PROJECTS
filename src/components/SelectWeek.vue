<template>
	<ul class="week_list">
		<li v-for="item in weekData" class="week_item"  :class="item.isSelect ? 'selected_iem ' + item.className : item.className" @dblclick="weekdblClick(item)" @click="weekClick(item)">{{ item.day }}</li>
	</ul>
</template>

<script>
	export default {
		name:"week",
		props:["weekData"],
		methods:{
			weekClick(item){
				item.isSelect = true;
				this.$emit("weekClick",item);
			},
			weekdblClick(item){
				item.isSelect = false;
				this.$emit("weekdblClick",item);
			}
		}
	}
</script>

<style lang="less">
	.week_list{
		width:300px;
		height: 40px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.week_item{
			width: 30px;
			height: 30px;
			border-radius: 50%;
			background-color:  #FFFFFF;
			border: 1px solid #F0F0F0;
			font-size: 14px;
			color: #BFBFBF;
			line-height: 28px;
			text-align: center;
			cursor: pointer;
		}
		.selected_iem{
			background-color: #FFB272;
			color: #5C5C5C;
		}
		.optional_item{
			border: 2px solid #f35f1c;
			color: #5C5C5C;
		}
		
	}
</style>