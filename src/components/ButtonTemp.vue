<template>
	<div class="button-temp" @click="myClick">{{message}}</div>
</template>

<script>
	export default {
		name: "button-temp",
		props: {
			message: String
		},
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