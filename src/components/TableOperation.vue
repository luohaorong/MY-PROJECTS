<template>
	<div class="table-operation">
		<a 
			v-for="(item,index)  in handleData[field]" 
			v-clipboard:copy="romUrl"
			v-clipboard:success="onCopy.bind(this,item)" 
			v-clipboard:error="onError.bind(this,item)" 
			href="" 
			@click.stop.prevent="handleRow(rowData,item.type,$event)">
			<img :src="item.src" />
		</a>
	</div>
</template>

<script>
	export default {
		name: "tableOperation",
		data() {
			return {
				romUrl: ""
			}
		},
		computed: {
			handleData() {
				return this.$store.state.TableUnit.handleItems;
			}
		},
		props: {
			rowData: {
				type: Object
			},
			field: {
				type: String
			}
		},
		methods: {
			handleRow(rowData, type, e) {
				let params = {
					id: rowData.id,
					type: type,
					romurl: rowData.romUrl,
					gwId: rowData.gwId,
					e: e,
					rowData: rowData
				};
				this.$emit('on-custom-comp', params);
			},
			copyShow(msg){
				this.$store.commit("isBlock");
				this.$store.commit("message", msg);
				this.$store.commit("err", false);
			},
			onCopy(e){
				if(e.type === "copy"){
					this.copyShow("复制成功");
				}	
			},
			onError(e){
				if(e.type === "copy"){
					this.copyShow("复制失败");
				}	
			}
		},
		mounted() {
			this.romUrl = this.rowData.romUrl
		}
	}
</script>

<style scoped="scoped" lang="less">
	@import url("../assets/styles/templete.less");
	.table-operation {
		width: 100%;
		height: 100%;
		.flexJustifyCentAlignCent();
		>a {
			.flexJustifyCentAlignCent();
			margin: 0 5px;
		}
	}
</style>