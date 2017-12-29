<template>
	<div class="login-main">
		<div class="head"></div>
		<div class="login-page">
			<p>{{text1}}</p>
			<p>{{text2}}</p>
			<form>
				<LoginInput v-for="item in items" v-bind:key="item.id" :placeholder="item.placeholder" :background="item.background" :type="item.type" @inputValue="getVal" />
				<ButtonTemp :message="message" class="button-style" @clickLogin="clickLogin" />
			</form>
		</div>
	</div>
</template>

<script>
	import LoginInput from "@/components/LoginInput"
	import ButtonTemp from "@/components/ButtonTemp"

	export default {
		name: "login-page",
		data() {
			return {
				text1: "欢迎使用管理注册中心",
				text2: "WELCOME TO REGISTER MANAGEMENT SYSTEM",
				message: "登录",
				placeholderName: "请输入用户名",
				placeholderPwd: "请输入密码",
				items: [{
					id: "0",
					type: "text",
					placeholder: "请输入用户名",
					background: "#fff url(/src/assets/images/admin.png) no-repeat"
				}, {
					id: "1",
					type: "password",
					placeholder: "请输入密码",
					background: "#fff url(/src/assets/images/key.png) no-repeat"
				}]
			}
		},
		components: {
			LoginInput,
			ButtonTemp
		},
		methods: {
			getVal(val) {
				if(val.type == "text") {
					let username = val.value
				}
				if(val.type == "password") {
					let password = val.value
				}
			},
			clickLogin(val) {
				console.log(val)
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../assets/styles/templete.less");
	.login-main {
		.head {
			.widthHeightBbRadius(100%, 82px, #363636, 0);
		}
		.login-page {
			margin: 0 auto;
			.widthHeightBbRadius(400px, 100px, #fff, 0);
			p {
				color: #FFA972;
				text-align: left;
				.marginTopFontSLineH(10px, 16px, 22px);
				&:first-child {
					.marginTopFontSLineH(138px, 26px, 37px);
				}
			}
			form {
				margin-top: 60px;
				.button-style {
					.widthHeightBbRadius(400px, 60px, linear-gradient(-90deg, #FFCE76 0%, #FFA671 100%), 10px);
					.centerLinehFontsColor(60px, 24px);
					.marginTopFontSLineH(22px, 24px, 60px);
				}
			}
		}
	}
</style>