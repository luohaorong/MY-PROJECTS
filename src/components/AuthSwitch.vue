<template>
	<div class="BRactiveTrue" @click="btnClick">
		<div class="switch_btn"></div>
	</div>
</template>

<script>
	export default {
		name: "AuthSwitch",
		data() {
			return {
				switchFlag: true
			}
		},
		props:["items"],
		methods: {
			btnClick(){
				let flag = this.$store.state.Detail.isEdit;
				if(flag) this.switchFlag = !this.switchFlag
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	@import url("../assets/styles/templete.less");
	.active(){
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
</style>