<template>
	<section>
		 <v-table
	            is-horizontal-resize
	            style="width:100%;min-height: 473px;"
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
	            @on-custom-comp="customCompFunc"
	    ></v-table>
	     <v-pagination :total="tableData['recordsTotal']" :layout="['total', 'prev', 'pager', 'next', 'jumper']" @page-change="pageChange"></v-pagination>
	</section>
</template>

<script>
	export default{
		name:"tableUnit",
		props:["tableData","columns"],
        data() {
            return {
                loadingContent:"<span>加载中...</span>",
                errorContent:'<a href="">刷新重试</a>'
            }
        },
        computed:{
        	isLoading(){
        		return this.$store.state.TableUnit.isLoading
        	}
        },
         methods:{
                 //
                 selectALL(selection){

                     console.log('select-aLL',selection);
                 },
			selectChange(selection) {
				let arr=[];
				selection.forEach(function(value) {
					arr.push(value.id);
				});
				this.selectdata = arr
				
				console.log(this.selectdata)
				
			},

			selectGroupChange(selection) {
				//console.log('select-group-change', selection);
			},
			customCompFunc(params) {
				console.log(params);
			},
			pageChange(pageIndex){
				console.log(pageIndex)
			}
		}
	}
</script>

<style>

</style>