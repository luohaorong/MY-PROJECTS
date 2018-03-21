<template>
	<div class="alarmShow">
		<div class="title">
			<div class="type">{{alarntype.name}}</div>
			<img @click="switchBtn()" :src="alarntype.flag ? '/static/images/switchOpen.png' : '/static/images/switchClose.png'" alt="" />
		</div>
		<div class="timelist">
			<div class="alarmList" v-for="item in times">
				<div class="weekItem">星期{{week[item.week]}}</div>
				<p v-for="i in item.dayslot">{{i.start}} - {{i.end}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		mame: "alarmShow",
		data() {
			return {
				times: {},
				week: ["一", "二", "三", "四", "五", "六", "日"]
			}
		},
		props: ["alarmList","alarntype"],
		computed: {

		},
		methods: {
			switchBtn() {
				this.$emit("switch")
			}
		},
		mounted() {
			this.times = JSON.parse(this.alarmList.ruleDetails).msgData[0].time;
		}
	}
</script>

<style lang="less">
	.alarmShow {
		width: 40%;
		height: 190px;
		float: left;
		.title {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			height: 48px;
			.type {
				margin-right: 24px;
				font-size: 14px;
				color: #5C5C5C;
			}
			img {
				cursor: pointer;
			}
		}
		.timelist {
			width: 100%;
			.alarmList {
				width: 120px;
				float: left;
				.weekItem {
					font-size: 14px;
					color: #5C5C5C;
					letter-spacing: 0;
					line-height: 30px;
				}
				p {
					font-size: 12px;
					color: #828282;
					letter-spacing: 0;
				}
			}
		}
	}
</style>