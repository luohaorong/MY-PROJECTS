<template>
	<div class="button-temp" :style="{background:message.background}" @click="myClick()">{{message.txt}}</div>
</template>

<script>
	export default {
		name: "button-temp",
		props: ["message"],
		methods: {
			myClick(){
				this.$emit("btnClick",this)
			}
		}
	}
</script>

<style lang="less">
	.button-temp {
		text-align: center;
		color: #FFF;
		cursor: pointer;
	}
</style>