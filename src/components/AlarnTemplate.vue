<template>
	<div class="wraper">
		<div class="template_top"><p class="temp_title" :title="itemAlarnList.ruleName">{{itemAlarnList.ruleName}}</p><span>
			<img @click="deleteTemplate(itemAlarnList.id)" class="deleteTemplate" src="/static/images/bdelete.png" alt="" /></span>
		</div>
		<div class="content">
			<p class="title">{{itemAlarnList.alarmType}}</p>
			<p class="createTime"><span>创建时间</span>{{itemAlarnList.createDate.split(" ")[0]}}<span>重复周期/星期</span></p>
			<div class="week">
				<span class="weeks" :class="{active:index+1===tIndex,gray:dayslot[index+1]}" @click="weekClick(index)" v-for="(item,index) in week">{{item}}</span>
			</div>
			<div class="times">
				<div class="timeItem" v-for="item in dayslot[tIndex]">{{item.start}} - {{item.end}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		mame: "alarnTemplate",
		data() {
			return {
				week: ["一", "二", "三", "四", "五", "六", "日"],
				times: "",
				dayslot: {},
				createDate: "",
				tIndex:1
			}
		},
		props: ["itemAlarnList"],
		computed: {
			
		},
		methods: {
			deleteTemplate(id) {
				this.$emit("deleteTemplate", id)
			},
			weekClick(val){
				this.tIndex = val+1
			},
			dayslotTime(){
				this.times = this.itemAlarnList.ruleDetails && JSON.parse(this.itemAlarnList.ruleDetails).msgData[0].time;
				this.times && this.times.map((i)=>{
					this.dayslot[i.week] = i.dayslot;
				});
			}
		},
		beforeMount() {
			this.dayslotTime();
		},
		watch:{
			itemAlarnList:function(data){
				this.dayslotTime();
			}
		}
	}
</script>

<style lang="less">
	.wraper {
		float: left;
		border-radius: 10px;
		width: 260px;
		height: 270px;
		border: 1px solid #DDDDDD;
		.template_top {
			display: flex;
			justify-content: space-between;
			height: 40px;
			line-height: 40px;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			font-size: 16px;
			color: #FFFFFF;
			background-image: linear-gradient(-270deg, #FFCE76 0%, #FFA671 100%);
			padding-left: 24px;
			padding-right: 14px;
			.temp_title{
				text-overflow:ellipsis;
				overflow:hidden;
				white-space:nowrap;
			}
			.deleteTemplate {
				cursor: pointer;
			}
		}
		.content {
			margin: 0 auto;
			width: 222px;
			.title {
				font-size: 14px;
				color: #5C5C5C;
				height: 52px;
				padding-top: 22px;
			}
			.createTime {
				display: flex;
				justify-content: space-between;
				height: 32px;
				line-height: 32px;
				border-bottom: 1px solid #F0F0F0;
				font-size: 12px;
				color: #AAAAAA;
				letter-spacing: 0;
			}
			.week {
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: 26px;
				padding: 20px 0 12px;
				span {
					display: block;
					width: 26px;
					height: 26px;
					border-radius: 50%;
					text-align: center;
					line-height: 26px;
					border: 1px solid #F0F0F0;
					cursor: pointer;
				}
				.active{
					background: #FFB272 !important;
					color:#ffffff;
				}
				.gray{
					background: #DDDDDD;
				}
			}
			.times {
				margin-top: 26px;
				.timeItem {
					float: left;
					width: 90px;
					height: 30px;
					font-size: 14px;
					color: #828282;
					line-height: 30px;
					border-bottom: 1px solid #F0F0F0;
					&:nth-child(2n) {
						float: right;
					}
				}
			}
		}
	}
</style>