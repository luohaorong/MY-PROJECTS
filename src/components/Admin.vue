<template>
	<div class="admin_wrap">
		<div class="admin_pic">
			<img src="../assets/images/admin.png" alt="" />
		</div>
		<div class="admin_list">
			<ul>
				<li v-for="(item,index) in adminItems">
					<router-link :to="item.src" class="item_link_min">
						{{ item.title }}
					</router-link>
				</li>
			</ul>
			<div class="arrow"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "adminWrap",
		props: ["adminItems"]
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
			.widthHeightBbRadius(100px, 120px, #fff, 0);
			border: 1px solid #D2D2D2;
			>ul {
				width: 100%;
				position: absolute;
				background: #fff;
				z-index: 5;
				li {
					width: 100%;
					height: 39px;
					border-top: 1px solid #D2D2D2;
					&:first-child {
						border-top: none;
					}
					.item_link_min {
						display: block;
						font-size: 14px;
						.centerLinehFontsColor(39px, #343434);
						&:hover {
							color: #F6A623;
						}
					}
				}
			}
			.arrow{
				.positionL(-8px, 50%);
				.widthHeightBbRadius(14px, 14px, #fff,0);
				margin-left: -8px;
				border-top: 1px solid #D2D2D2;
				z-index: 2;
				transform: rotateZ(45deg);
			}
		}
	}
</style>