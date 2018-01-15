<template>
	<section class="messageContainer" :class="{active:isBlock}">
		<p class="messageText" :class="{errMessage:err}">{{ message }}</p>
	</section>
</template>

<script>
	export default{
		name:"messageBar",
		computed:{
			isBlock(){
				return this.$store.state.MessageBar.isBlock
			},
			message(){
				return this.$store.state.MessageBar.message
			},
			err(){
				return this.$store.state.MessageBar.err
			}
		},
		methods:{
			
		}
	}
</script>

<style  scoped lang="less">
	@keyframes fadeIn{
		0%{
			opacity: 1;
		};
		50%{
			opacity: 1;
		};
		100%{
			opacity: 0;
		};
	}
	.active{
		display: block !important;
		animation: fadeIn 3.3s;
	}
	.messageContainer{
		width: 200px;
		height: 60px;
		display: none;
		border-radius: 7px;
		background-color: #333333;
		position: absolute;
		top:50%;
		left: 50%;
		margin-top: -30px;
		margin-left: -100px;
		.messageText{
			font-size: 14px;
			width: 100%;
			height: 100%;
			line-height: 60px;
			text-align: center;
			color: #FFFFFF;
		}
		.errMessage{
			color: #D0011B;
		}
	}
	
</style>