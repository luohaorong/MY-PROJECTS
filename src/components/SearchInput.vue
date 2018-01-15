<template>
	<div class="search-input">
		<input type="text" :placeholder="msg" />
		<div class="click-icon"></div>
	</div>
</template>

<script>
	export default {
		name: "search-input",
		data() {
			return {
				msg: "输入ID/MAC搜索"
			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	@import url("../assets/styles/templete.less");
	.search-input {
		position: relative;
		>input {
			.widthHeightBbRadius(300px, 40px, #fff, 20px);
			text-indent: 20px;
		}
		.click-icon {
			.positionR(0, 20px);
			.widthHeightBbRadius(40px, 40px, #cda, 0);
			cursor: pointer;
			background: #fff url(../assets/images/esearch.png) no-repeat center;
		}
	}
</style>
