<template>
	<div class="wraper">
		<div class="template_top">{{Items.name}}</div>
		<div class="content">
			<div class="title">
				<div class="getTem" @click="getAlarnList(Items.type)">{{Items.value}}</div>
				<div class="alarnList" v-if="Items.flag">
					<div class="titleTem" @click="selectItem(item,Items.type)" v-for="(item) in Items.itemAlarnList">{{item.ruleName}}</div>
				</div>
			</div>
			<p class="createTime">重复周期/星期</p>
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
		mame: "setAlarnTem",
		data() {
			return {
				week: ["一", "二", "三", "四", "五", "六", "日"],
				isActive: true,
				times: "",
				dayslot: {},
				tIndex: 1
			}
		},
		props: ["value", "Items"],
		computed: {

		},
		methods: {
			getAlarnList(type) {
				this.$emit("getAlarnList", type);
			},
			selectItem(item, type) {
				console.log(item);
				this.times = JSON.parse(item.ruleDetails).msgData[0].time;
				console.log(this.times);
				this.times.map((i) => {
					this.dayslot[i.week] = i.dayslot;
				});
				this.$emit("selectItem", item, type);
			},
			weekClick(val) {
				this.tIndex = val + 1
			}
		},
		mounted() {}
	}
</script>

<style lang="less">
	.wraper {
		border-radius: 10px;
		width: 260px;
		height: 270px;
		border: 1px solid #DDDDDD;
		margin: 0 30px 30px 0;
		.template_top {
			display: flex;
			justify-content: space-between;
			height: 40px;
			line-height: 40px;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			font-size: 16px;
			color: #FFFFFF;
			background: #363636;
			padding-left: 24px;
			padding-right: 14px;
			.deleteTemplate {
				cursor: pointer;
			}
		}
		.content {
			margin: 0 auto;
			width: 222px;
			.title {
				position: relative;
				font-size: 14px;
				color: #5C5C5C;
				height: 52px;
				.getTem {
					width: 100%;
					height: 56px;
					line-height: 56px;
					border-bottom: #DDD 1px solid;
					cursor: pointer;
					padding-left: 12px;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.alarnList {
					width: 100%;
					max-height: 220px;
					position: absolute;
					overflow-y: scroll;
					background: #FFF;
					border: 1px solid #ddd;
					z-index: 5;
					.titleTem {
						line-height: 32px;
						border-bottom: 1px solid #ddd;
						color: #5C5C5C;
						padding-left: 12px;
						cursor: pointer;
					}
				}
			}
			.createTime {
				display: flex;
				justify-content: space-between;
				padding-top: 12px;
				font-size: 12px;
				color: #AAA;
				letter-spacing: 0;
			}
			.week {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 52px;
				span {
					display: block;
					width: 30px;
					height: 30px;
					border-radius: 50%;
					text-align: center;
					line-height: 30px;
					border: 1px solid #F0F0F0;
					font-size: 14px;
					cursor: pointer;
				}
				.active {
					background: #FFB272 !important;
					color: #ffffff;
				}
				.gray {
					background: #DDDDDD;
				}
			}
			.times {
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
					&:last-child {
						border-bottom: none;
					}
				}
			}
		}
	}
</style>