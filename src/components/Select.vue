<template>
	<div class="seclect_wrapper">
		<select class="sec_item" :name="selectItem.name" v-model="checkItem" @change="changeHandle()" :class="{change:checkItem.name != selectItem.gray}">
			<option :value="item" :data-id="item.id" v-for="(item,index) in selectItem.list">{{item.name}}</option>
		</select>
		<span class="vertical_line"></span>
	</div>
</template>

<script>
	export default {
		name: "selectBox",
		props: ["selectItem","defaultItem"],
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

<style  lang="less">
	.seclect_wrapper {
		width: auto;
		height: auto;
		position: relative;
		margin: 0 10px;
		.sec_item {
			width: inherit;
			height: 30px;
			cursor: pointer;
			font-size: 14px;
			color: #CCCCCC;
			letter-spacing: 0;
			outline:none;
			border:1px solid #CCCCCC;
			option {
				color: #5C5C5C;
			}
		}
		.vertical_line {
			width: 1px;
			height: 30px;
			display: inline-block;
			position: absolute;
			top: 0;
			right: 20px;
			background-color: #CCCCCC;
		}
		.change {
			color: #5C5C5C;
		}
	}
</style>