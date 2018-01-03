<template>
	<section class="prompt_wrapper" v-show="isShow">
		<div class="prompt_box">
			<header class="title"> {{ tipInputData.title }} </header>
			<div class="prompt_body">
				<div class="prompt_main">
					<div class="prompt_content" v-if="tipInputData.type === 'input'">
						<p class="error_tip" v-show="err" v-text="errTip"></p>
						<input type="text" v-for="item in tipInputData.tip" :placeholder="item.placeholder" :ref="item.name"/>
						<p class="notice"> {{ tipInputData.notice }} </p>
					</div>
					<div class="prompt_content" v-else>
						<p class="text_tip"  v-for="item in tipInputData.tip"> {{ item.placeholder }} </p>
					</div>
				</div>
				<div class="prompt_bnt">
					<button class="sure" @click="sureClick">确认</button>
					<button class="cancel" @click="cancelClicl">取消</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name:"PromptBox",
		props:["tipInputData"],
		data(){
			return{
				err:false,
				errTip:""
			}
		},
		computed:{
//			...mapState(["tipIsShow"])
			isShow(){
				return this.$store.state.PromptBox.isShow
			}
		},
		methods:{
			sureClick(){
				let inpArr = this.tipInputData.tip || "";
				let type = this.tipInputData.type;
				let tmp = [];
				let len = inpArr.length;
				if(type === "input"){
					for(let i=0;i<len;i++){
						let val = this.$refs[inpArr[i].name][0].value;
						let reg = inpArr[i].reg;
						if(!reg.test(val)){
							this.err = true;
							this.errTip = inpArr[i].errorTip;
							return false;
						}else{
							this.err = false;
							this.errTip = "";
						}
						tmp.push(val);
					
					}
					this.$emit("getV",tmp);
				}else{
					this.$store.commit("isShow",false);
				}
			},
			cancelClicl(){
				this.$store.commit("isShow",false);
			}
		}
	}
</script>

<style scoped lang="less">
.prompt_wrapper{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index:9;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0.69;
		background: #000000;
	}
	.prompt_box{
		width: 350px;
		min-height: 210px;
		background-color: #FFFFFF;
		.title{
			width: inherit;
			height: 60px;
			background-color: #333333;
			font-size: 18px;
			color: #FFA972;
			text-align: center;
			line-height: 60px;
		}
		.prompt_body{
			width: inherit;
			min-height: 150px;
			.prompt_main{
				width: inherit;
				min-height: 110px;
				display:flex;
				justify-content: center;
				align-items: center;
				.prompt_content{
					width: 100%;
					height: auto;
					margin-top: 20px;
					input{
						display: block;
						margin: 8px auto;
						width: 232px;
						height: 34px;
						border: 1px solid  #979797;
						text-indent: 8px;
					}
					.error_tip{
						width: 192px;
						margin: 0 auto;
						font-size: 12px;
						color: #D0011B;
						text-align: center;
					}
					.notice{
						font-size: 12px;
						color: #FFA972;
						width: 192px;
						margin: 0 auto;
						text-align: center;
					}
					.text_tip{
						width: 100%;
						height: 20px;
						line-height: 20px;
						margin: 0 auto;
						text-align: center;
						font-size: 14px;
						color: #5C5C5C;
					}
				}
			}
			.prompt_bnt{
				width: 80%;
				height: 40px;
				margin: 0 auto;
				display: flex;
				justify-content: space-around;
				font-size: 14px;
				color: #5C5C5C;
				margin-bottom: 10px;
				.sure{
					cursor: pointer;
					width: 100px;
					height: 36px;
					background-color: #FFCD76;
					border-radius: 100px;
				}
				.cancel{
					cursor: pointer;
					width: 100px;
					height: 36px;
					background: #DDDDDD;
					border-radius: 100px;
				}
			}
		}
	}
</style>