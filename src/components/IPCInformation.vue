<template>
	<section v-show="ipcShow">
		<ul class="information_list" v-if="dataList.length">
			<li v-for="item in dataList" class="infor_item">
				<div class="item_text">
					<p class="ipcId">
						<span class="title">IPC ID: </span>
						<span>{{ item.ipcId }}</span>
					</p>
					<p class="ipcState">
						<span class="state" :class="{online:online}">{{ fliterState(item.state) }}</span>
						<span class="status">{{ fliterStatus(item.streamStatus ) }}</span>
					</p>
				</div>
				<p class="item_option" @click="optionClick(item.id)"></p>
			</li>
		</ul>
		<p class="empty" v-else>暂无IPC信息</p>
	</section>
</template>

<script>
	export default {
		name:"ipcIformation",
		data(){
			return {
				online:false
			}
		},
		props:["dataList","ipcShow"],
		methods:{
			optionClick(id){
				this.$emit("optionClick",id)
			},
			fliterState(state){
				state === 1 ? this.online = true : "";
				return this.$store.getters.onlineState(state)
			},
			fliterStatus(status){
				return this.$store.getters.pushState(status)
			}
		}
	}
</script>

<style lang="less">
	.information_list,.empty{
		width: 390px;
		min-height: 96px;
		background-color: #444444;
		box-shadow: 0 20px 20px 0 rgba(0,0,0,0.20);
		border-radius: 10px;
		.infor_item{
			width: 90%;
			height: 96px;
			border-bottom: 1px solid #333333;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.item_text{
				.ipcId{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-size: 14px;
					color: #CCCCCC;
					margin-bottom: 7px;
					.title{
						padding-right: 8px;
					}
				}
				.ipcState{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-size: 14px;
					color: #777777;
					.state{
						padding-right: 8px;
						border-right: 1px solid #777777;;
					}
					.status{
						padding-left: 8px;
					}
				}
			}
			.item_option{
				width: 23px;
				height: 23px;
				background-image: url("/static/images/more.png");
				background-repeat: no-repeat;
				background-size: 23px;
				cursor: pointer;
			}
		}
	}
	.empty{
		color: #FFFFFF;
		text-align: center;
		line-height: 96px;
	}
	.online{
		color: #FFB272;
	}
</style>