<template>
	<div class="admin_wrap" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<div class="admin_pic">
			<img src="../assets/images/admin.png" alt="" />
		</div>
		<div v-if="isShow" class="admin_list">
			<ul>
				<li v-for="(item,index) in adminItems" @click="goHandle(item.attr)">
					{{ item.title }}
				</li>
			</ul>
			<div class="arrow"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "adminWrap",
		data() {
			return {
				isShow: false,
				roleType: TOOLS.cache("roleType"),
				tipData: [{
					title: "修改密码",
					type: "modifypwd",
					tip: [{
						name: "passWord",
						placeholder: "请输入旧密码",
						type: "password",
						maxlength: "20",
						reg: /^[A-Za-z0-9]{6,20}$/,
						errorTip: "密码错误"
					}, {
						name: "passWord",
						placeholder: "请输入新密码(6-20字以内)",
						type: "password",
						maxlength: "20",
						reg: /^[A-Za-z0-9]{6,20}$/,
						errorTip: "密码错误"
					}, {
						name: "passWord",
						placeholder: "请再次新密码",
						type: "password",
						maxlength: "20",
						reg: /^[A-Za-z0-9]{6,20}$/,
						errorTip: "密码错误"
					}],
					notice: ""
				}, {
					title: "退出登录",
					type: "handletips",
					optiontype: "logout",
					tip: [{
						text: "确定要退出当前账号吗？"
					}],
					notice: ""
				}],
			}
		},
		props: ["adminItems"],
		created() {
			if(TOOLS.cache("roleType") == "1") {
				return this.adminItems == this.adminItems.shift();
			}
		},
		methods: {
			mouseenter() {
				this.isShow = true
			},
			mouseleave() {
				this.isShow = false
			},
			goHandle(id) {
				if(id == "accounts") this.$router.push("/accounts")

				if(id == "modifyPassword") {
					let data = this.tipData[0];
					this.$store.commit("tipInputData", data);
					this.$store.commit("isShow", true);
				}

				if(id == "logout") {
					let data = this.tipData[1];
					this.$store.commit("tipInputData", data);
					this.$store.commit("isShow", true);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../assets/styles/templete.less");
	.admin_wrap {
		position: relative;
		margin-left: 50px;
		cursor: pointer;
		.widthHeightBbRadius(40px, 40px, #363636, 20px);
		&:hover {
			.admin_list {
				display: block;
			}
		}
		.admin_list {
			display: block;
			.transition (.5);
			.positionL(54px, 50%);
			margin-left: -50px;
			width: 100px;
			>ul {
				width: 100%;
				position: absolute;
				background: #fff;
				z-index: 5;
				border: 1px solid #D2D2D2;
				li {
					.widthHeightCenterLinehFontsColor(100%, 39px, 39px, 14px);
					border-top: 1px solid #D2D2D2;
					&:first-child {
						border-top: none;
					}
					&:hover {
						color: #F6A623;
					}
				}
			}
			.arrow {
				.positionL(-8px, 50%);
				.widthHeightBbRadius(14px, 14px, #fff, 0);
				margin-left: -8px;
				border-top: 1px solid #D2D2D2;
				z-index: 2;
				transform: rotateZ(45deg);
			}
		}
	}
</style>