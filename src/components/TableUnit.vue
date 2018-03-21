<template>
	<section>
		<v-table 
			is-horizontal-resize 
			style="width:100%;height: auto;" 
			row-hover-color="#eee" 
			row-click-color="#edf7ff" 
			:columns="columns" 
			:table-data="tableData['data']" 
			:loading-content="loadingContent" 
			:error-content="errorContent" 
			:is-loading="isLoading" 
			:select-all="selectALL" 
			:select-change="selectChange" 
			:select-group-change="selectGroupChange" 
			:show-vertical-border="false" 
			:row-click="rowClick" 
			:title-click="titleClick" 
			@on-custom-comp="customCompFunc" 
			ref="table">
		</v-table>
		<v-pagination :pageActive="pageState" :total="tableData['recordsTotal']" :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next', 'jumper']" @page-change="pageChange">
		</v-pagination>
	</section>
</template>

<script>
	export default {
		name: "tableUnit",
		//pageState用于记住用户之前点击的页码
		props: ["tableData", "columns", "pageState", "pageSize"],
		data() {
			return {
				loadingContent: "<span>加载中...</span>",
				errorContent: '<a href="">没有搜索到相关数据</a>'
			}
		},
		computed: {
			isLoading() {
				return this.$store.state.TableUnit.isLoading
			}
		},
		methods: {
			//全选
			selectALL(selection) {
				this.selectHandle(selection)
			},
			selectChange(selection) {
				this.selectHandle(selection)
			},
			selectHandle(selection) {
				let arr = [];
				let ipcIds = [];
				let nvrIds = [];
				let obj = {};
				selection.forEach(function(value) {
					arr.push(value.id);
					ipcIds.push(value.ipcId);
					nvrIds.push(value.gwId);
				});
				obj.ids = arr;
				obj.ipcIds = ipcIds;
				obj.nvrIds = nvrIds;
				this.$emit("getSelects", obj)
			},
			selectGroupChange(selection) {
				//console.log('select-group-change', selection);
			},
			customCompFunc(params) {
				this.$emit('handle', params);
			},
			ipcInforHide() {

			},
			pageChange(pageIndex) {
				this.$emit("pageIndex", pageIndex)
			},
			rowClick(rowIndex, rowData, column) {
				let data = {
					rowIndex: rowIndex,
					rowData: rowData,
					column: column
				}
				this.$emit("rowClick", data)
			},
			titleClick(rowIndex, rowData, column) {
				this.$emit("titleClick")
			}

		},
		mounted(){
			
		}
	}
</script>

<style lang="less">
	.headerStyle {
		height: 70px;
		font-size: 16px;
		color: #5C5C5C;
		font-weight: 600;
	}
	.v-table-loading-content{
		top: 108px !important;
	}
</style>