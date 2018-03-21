<template>
	<div class="table-operation">
		<div v-if="rowData.releaseType == 0">
			<div v-if="isShow[rowData.id]" class="priority">
				<span>{{rowData.priorityNumber}}</span>
				<img @click="editClick(rowData)" class="rank" :src="rankdata.src" alt="" />
			</div>
			<div v-if="!isShow[rowData.id]" class="inputList">
				<input type="text" class="input_number" :value="rowData.priorityNumber" ref="input" />
				<img class="rank_ok" :src="rankdata.oksrc" @click="okClick(rowData)" alt="" />
				<img :src="rankdata.cacelsrc" @click="cancleClick(rowData)" alt="" />
			</div>
		</div>
		<div v-else>按规则发布的域名</div>
	</div>
</template>

<script>
	export default {
		name: "tableOperation",
		data() {
			return {
				
			}
		},
		computed: {
			rankdata() {
				return this.$store.state.TableUnit.handleItems.priority;
			},
			isShow(){
				return this.$store.state.TableUnit.priorityFlag
			}
		},
		props: {
			rowData: {
				type: Object
			}
		},
		methods: {
			okClick(data) {
				let params = {
					type: "rank",
					id: data.id,
					priorityNumber: +this.$refs.input.value
				};
				this.$emit('on-custom-comp', params);
			},
			editClick(val) {
				let data = this.isShow;
				data[val.id] = false;
				this.$store.commit("upDateRankFlag",data);
			},
			cancleClick(val) {
				let data = this.isShow;
				data[val.id] = true;
				this.$store.commit("upDateRankFlag",data);
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	@import url("../assets/styles/templete.less");
	.table-operation {
		.priority {
			.flexJustifyCentAlignCent();
			.widthHeight(100%, 100%);
			span {
				display: block;
				margin-right: 10px;
				line-height: 20px;
			}
			.rank {
				cursor: pointer;
			}
		}
		.inputList {
			.flexJustifyCentAlignCent();
			.widthHeight(100%, 100%);
			.rank_ok {
				margin-left: 8px;
				margin-right: 10px;
			}
			img {
				cursor: pointer;
			}
			>input {
				.widthHeight(44px, 26px);
				text-align: center;
				border-radius: 15px;
				border: 1px solid #ccc;
			}
		}
	}
</style>