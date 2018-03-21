<template>
	<div class="abnormalList">
		<p v-for="item in deviceExceptions"><span class="time">{{item.upTime}}</span><span class="deviceId">{{item.deviceId}}</span><span>{{item.codeName}}</span></p>
	</div>
</template>

<script>
	export default {
		mame: "abnormal",
		data() {
			return {

			}
		},
		props: ["deviceExceptions"],
		computed: {

		},
		methods: {

		},
		mounted() {}
	}
</script>

<style lang="less">
	.abnormalList{
		width: 430px;
		max-height: 270px;
		overflow-y: scroll;
		border: 1px solid #D9D9D9;
		p{
			border-bottom: 1px solid #D9D9D9;
			height: 30px!important;
			line-height: 30px!important;
			margin-bottom: 0!important;
			
			.time{
				padding: 0 10px 0 10px;
			}
			
			.deviceId{
				padding: 0 10px 0 10px;
			}
			
			&:last-child{
				border-bottom: none;
			}
		}
	}
</style>