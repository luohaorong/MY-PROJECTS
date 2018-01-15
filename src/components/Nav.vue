<template>
	<section class="sax_nav">
		<div class="nav_wrap">
			<ul class="nav_list">
				<li class="list_item" v-for="(item,index) in dataNav" @click="checked(index)">
					<router-link :to="item.src" class="item_link" :class="{active_nav:index === nowIndex}">
						{{ item.title }}
					</router-link>
				</li>
			</ul>
			<div class="nav_right">
				<SearchInput v-if="nowIndex==0" />
				<Admin :admin-items="adminItems" />
			</div>
		</div>
	</section>
</template>

<script>
	import SearchInput from "@/components/SearchInput"
	import Admin from "@/components/Admin"
	export default {
		props: ["dataNav"],
		name: "NavBar",
		data() {
			return {
				nowIndex: 0,
				adminItems: [{
					title: "账号管理",
					attr: "accounts"
				}, {
					title: "修改密码",
					attr: "modifyPassword"
				}, {
					title: "退出登录",
					attr: "logout"
				}]
			}
		},
		components: {
			SearchInput,
			Admin
		},
		methods: {
			checked(index) {
				this.nowIndex = index;
				this.$emit("navIndex", this.nowIndex);
			}
		}
	}
</script>

<style lang="less">
	@import url("../assets/styles/templete.less");
	.sax_nav {
		.widthHeightBgColor(100%, 82px, #363636)
	}
	
	.nav_wrap {
		margin: 0 auto;
		width: 90%;
		display: flex;
		justify-content: space-between;
	}
	
	.nav_list {
		height: 82px;
		.flexJustifyCentFlexstart();
	}
	
	.list_item {
		.widthHeight(140px, 78px);
		cursor: pointer;
	}
	
	.item_link {
		display: block;
		color: #FFFFFF;
		.widthHeightCenterLinehFontsColor(140px, 82px, 78px, 20px);
		&:hover {
			color: #FFA671;
			border-bottom: 4px solid #FFA671;
			.transition (.3s);
		}
	}
	
	.active_nav {
		color: #FFA671;
		border-bottom: 4px solid #FFA671;
	}
	
	.nav_right {
		width: 390px;
		align-items: center;
		.flexJustifyCentFlexend();
	}
</style>