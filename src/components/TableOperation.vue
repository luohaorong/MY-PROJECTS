<template>
	<span class="table-operation">
		<a v-for="(item,index) in optionsItem" href="" @click.stop.prevent="handleRow(item,index)"><img :src="item.src"/>{{item.src}}</a>
	</span>
</template>

<script>
	export default {
		name: "table-operation",
		data() {
			return{
				
			}
		},
		props: ["optionsItem"],
		methods: {
			handleRow(val) {
				/*// 参数根据业务场景随意构造
				let params = {
					type: 'edit',
					index: this.index,
					rowData: this.rowData
				};*/
				this.$emit('onRowHandle', val);
			}
		}
	}
</script>

<style>

</style>