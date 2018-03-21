<template>
	<div class="show_rule">
		<div v-if="ruleData.releaseType === 0" class="releaseRule">
			<p>按优先级发布域名</p>
			<p>{{ruleData.priorityNumber}}</p>
		</div>
		<div v-else-if="ruleData.releaseType === 1" class="publishedNumber">
			<p>按规则发布域名</p>
			<p class="rule_domain">
				<span v-for="item in ruleData.releaseRule">{{item}}</span>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		mame: "releaseRule",
		data() {
			return {

			}
		},
		props: ["ruleData"],
		computed: {

		},
		methods: {

		},
		mounted() {}
	}
</script>

<style lang="less">
	.show_rule {
		p {
			font-size: 15px;
			color: #5C5C5C;
			font-weight: bold;
			margin-bottom: 10px;
		}
		.rule_domain {
			display: flex;
			justify-content: center;
			span {
				margin-right: 10px;
				display: block;
				width: 48px;
				text-align: center;
				padding: 5px;
				background: #F7F7F7;
				color: #5C5C5C;
				border-radius: 4px;
				font-weight: normal;
				font-size: 14px;
			}
		}
	}
</style>