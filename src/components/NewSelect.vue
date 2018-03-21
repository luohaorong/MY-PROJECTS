<template>
	<div class="seclect_wrapper">
		<select class="sec_item" :name="selectItem.name" v-model="checkItem" @change="changeHandle()" :class="{change:checkItem.name != this.selectItem.gray}">
			<option :value="item" :data-id="item.id" v-for="(item,index) in selectItem.list">{{ item.name}}</option>
		</select>
		<span class="vertical_line">
			<span class="arrow"></span>
		</span>
	</div>
</template>

<script>
	export default {
		name: "selectBox",
		props: ["selectItem", "defaultItem"],
		data() {
			return {
				checkItem: this.defaultItem || this.selectItem.list[0]
			}
		},
		methods: {
			changeHandle() {
				this.$emit("selectValue", this.checkItem);
			}
		}
	}
</script>

<style scoped lang="less">
	@import url("../assets/styles/templete.less");
	.seclect_wrapper {
		width: 160px;
		height: auto;
		position: relative;
		border-radius: 10px;
		.sec_item {
			width: inherit;
			height: 20px;
			cursor: pointer;
			font-size: 12px;
			color: #CCCCCC;
			letter-spacing: 0;
			outline: none;
			border: 1px solid #CCCCCC;
			border-radius: 20px;
			text-indent: 10px;
			option {
				color: #5C5C5C;
				background-image: linear-gradient(-90deg, #FFCE76 0%, #FFA671 100%) !important;
				&:hover{
					background-image: linear-gradient(-90deg, #FFCE76 0%, #FFA671 100%);
				}
			}
		}
		.vertical_line {
			width: 20px;
			height: 20px;
			display: inline-block;
			position: absolute;
			top: 0;
			right: 0;
			background-image: linear-gradient(-90deg, #FFCE76 0%, #FFA671 100%);
			border-top-right-radius: 15px;
			border-bottom-right-radius: 15px;
			.arrow {
				.positionR(7px, 6px);
				.widthHeight(0, 0);
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-top: 8px solid #ffffff;
			}
		}
		.change {
			color: #5C5C5C;
		}
	}
</style>