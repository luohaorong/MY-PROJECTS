<template>
	<div class="search-input">
		<input :type="type" :class="{errTip:isErr}" maxlength="20" :placeholder="placeholder" v-model="value" ref="input" @blur="changeCount" />
		<div :style="{background: background}" class="click-icon"></div>
		<div v-if="isErr" class="err-show">{{errorMessage}}</div>
	</div>
</template>

<script>
	export default {
		name: "login-input",
		data() {
			return {
				isErr: false,
				errorMessage: "",
				value: ""
			}
		},
		props: {
			type: String,
			placeholder: String,
			background: String
		},
		methods: {
			changeCount() {
				if(!this.$refs.input.value) {
					this.isErr = true
					if(this.type == "text") this.errorMessage = "账户必须是包含6至20位的字母、数字"
					if(this.type == "password") this.errorMessage = "密码必须是包含6至20位的字母、数字"
				} else
					this.$emit("inputValue", this)
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../assets/styles/templete.less");
	.search-input {
		position: relative;
		margin-bottom: 10px;
		>input {
			.inputComponent (400px, 60px, #fff, 10px, 47px);
		}
		.errTip {
			border: 1px solid #d0021b!important;
			.transition (.5s);
		}
		.click-icon {
			.positionL(1px, 8px);
			.widthHeightBbRadius(34px, 60px, #cda, 0);
			cursor: pointer;
		}
		.err-show {
			text-align: center;
			height: 20px;
			margin-top: 10px;
			font-size: 12px;
			color: #D0011B;
			.transition (.5s);
		}
	}
</style>