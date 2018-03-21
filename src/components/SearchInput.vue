<template>
	<div class="search-input">
		<input type="text" :placeholder="msg.placeholder" v-model="value" :readonly="msg.readonly"/>
		<div class="click-icon" @click="searchClick()">{{msg.txt}}</div>
	</div>
</template>

<script>
	export default {
		name: "search-input",
		props:["val","msg"],
		data() {
			return {
				value:this.val
			}
		},
		methods: {
			searchClick(){
				this.$emit("searchClick",this.value)
			}
		}
	}
</script>

<style lang="less" scoped>
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
			background: #fff url(/static/images/esearch.png) no-repeat center;
		}
	}
</style>
