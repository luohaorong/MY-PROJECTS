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
					src: "/accounts"
				}, {
					title: "修改密码",
					src: "/modifyPassword"
				}, {
					title: "退出登录",
					src: "/logout"
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
	.sax_nav {
		background-color: #363636;
		width: 100%;
		height: 82px;
	}
	
	.nav_wrap {
		margin: 0 auto;
		width: 90%;
		display: flex;
		justify-content: space-between;
	}
	
	.nav_list {
		height: 82px;
		display: flex;
		justify-content: flex-start;
	}
	
	.list_item {
		width: 140px;
		height: 78px;
		cursor: pointer;
	}
	
	.item_link {
		width: 140px;
		height: 78px;
		display: block;
		line-height: 78px;
		font-size: 20px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
	}
	
	.active_nav {
		color: #FFA671;
		border-bottom: 4px solid #FFA671;
	}
	
	.nav_right {
		width: 390px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
</style>