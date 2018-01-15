<template>
	<div class="notFound">
		<ButtonTemp :message="message" class="btnStyle" @btnClick="goback" />
	</div>
</template>

<script>
	import ButtonTemp from "@/components/ButtonTemp"

	export default {
		name: "notFound",
		data() {
			return {
				message: "返回上一页"
			}
		},
		components: {
			ButtonTemp
		},
		methods: {
			goback(val) {
				window.history.go(-1);
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../assets/styles/templete.less");
	.notFound {
		background-image: url(../assets/images/404.png);
		-moz-background-size:100% 100%;
		background-size:100% 100%;  
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
		z-index: 0;
		.warp {
			.centerLinehFontsColor(66px, 24px);
		}
		.btnStyle {
			.widthHeightBbRadius(106px, 48px, #00b7ee, 12px);
			.centerLinehFontsColor(48px, 18px);
			margin: 30% auto;
			&:hover {
				background: #00a2d4;
			}
		}
	}
</style>