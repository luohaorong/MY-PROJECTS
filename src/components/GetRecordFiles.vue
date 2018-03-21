<template>
	<p class="getFile">
		<button :title="getFile[rowData.statusCode]" :disabled="isClick && +rowData.statusCode !== 2" :class="(isClick && +rowData.statusCode !== 2) ? 'getBtn disabledBtn' : 'getBtn' " @click="handleRow(rowData)">{{getFile[rowData.statusCode]}}</button>
	</p>
</template>

<script>
	export default {
		name: "tableOperation",
		data() {
			return {
				getFile:{
					"0":"点击获取文件",
					"1":"获取文件中",
					"2":"下载"
				}
			}
		},
		computed:{
			isClick(){
				return this.$store.state.TableUnit.isClick
			}
		},
		props: ["rowData"],
		methods: {
			handleRow(rowData) {
				this.$emit('on-custom-comp', rowData);
			}
		}
	}
</script>

<style lang="less">
	@import url("../assets/styles/templete.less");
	.getFile {
		margin-top: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		.getBtn {
			display: block;
			background-image: linear-gradient(-270deg, #FFCE76 0%, #FFA671 100%);
			border-radius: 50px;
			width: 100px;
			height: 30px;
			cursor: pointer;
			line-height: 30px;
			font-size: 12px;
			color: #5C5C5C;
			text-align: center;
			text-overflow:ellipsis;
			overflow:hidden;
			white-space:nowrap;
		}
		.disabledBtn{
			cursor: wait;
			background-image: linear-gradient(-270deg, #cdcdcd 0%, #cccccc 100%);
		}
	}
</style>