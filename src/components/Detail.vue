<template>
	<article class="detail_container">
		<header class="head">
			<div class="title_name">
				<p class="title_text">
					{{ data.header.title }}
				</p>
				<img class="title_img" v-if="data.header.isEdit" :src="data.header.src" @click="headerEdit"/>
			</div>
			<div class="detail_btn">
				<button-temp v-for="item in data.header.buttonMsg" :message="item" @btnClick="headerBtnClick(item)"></button-temp>
			</div>
		</header>
		<section class="detail_body">
			<div class="body_list" v-for="(item,index) in data.body" :id="'body_list' + index">
				<div class="body_title_wrapper">
					<h4 class="body_item_title" v-if="!!item.title">{{ item.title }}</h4>
					<div class="com_item" v-if="item.isSlot">
						<slot :name="item.slotName"></slot>
					</div>
				</div>
				<div class="body_content">
					<div class="body_item" v-for="(i,p) in item.content" :class="{edit:edit[index][p]}">
						<div class="body_title">
							<p class="item_title">{{ i.title }}</p>
							<img class="body_title_img" @click="itemClick(index,p)" v-show="!edit[index][p]" :src="i.src" v-if="i.isEdit"/>
							<div class="com_item" v-if="i.isSlot && edit[index][p]">
								<slot :name="i.slotName"></slot>
							</div>
						</div>
						<div class="item_content" v-for="(j,k) in i.txt">
							<p class="item_name">{{ j.name }}</p>
							<p class="item_value" v-show="!isInput[index][p][k]">{{ j.value }}</p>
							<p class="item_edit">
								<input 
									v-show="isInput[index][p][k]" 
									v-model="j.value" 
									@blur="blurItem(j.key,index,p,k)" 
									v-if="(j.isEdit || i.isEdit)  && !j.isSlot" 
									:maxlength="j.maxlength || ''"
									:placeholder="j.placeholder || ''"
									type="text" 
									class="item_input"/>
								<div class="com_item" v-if="j.isSlot">
									<slot :name="j.slotName"></slot>
								</div>
								<img class="item_img ok" @click="itemOkClick(j.key,index,p,k)" v-if="j.isEdit || i.isEdit" src="/static/images/ok.png" v-show="isInput[index][p][k]"/>
								<img class="item_img cacel" @click="itemCacelClick(index,p,k)" v-if="j.isEdit || i.isEdit" src="/static/images/cacel.png" v-show="isInput[index][p][k]"/>
								<img class="item_img" @click="itemClick(index,p,k,j)" :src="j.src" v-show="!isInput[index][p][k]" v-if="j.isEdit"/>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</article>
</template>
<script>
	import ButtonTemp from "@/components/ButtonTemp.vue"
	export default {
		name:"Detail",
		components:{
			ButtonTemp
		},
		props:["data","allEdit"],
		data(){
			return{
			}
		},
		computed:{
			isInput(){
				return this.$store.state.Detail.isInput
			},
			value(){
				return this.$store.state.Detail.value
			},
			edit(){
				return this.$store.state.Detail.edit
			}
		},
		methods:{
			headerBtnClick(data){
				this.$emit("headerBtnClick",data)
			},
			changeEdit(){
				let edit = [];
				this.data.body.map((i,k)=>{
					let tmp = [];
					i.content.map((j,h)=>{
						let eArr = [];
						j.txt.map((q,p)=>{
							if(q.isEdit || j.isEdit){
								eArr.push(true);
							}else{
								eArr.push(false);
							}
						})
						let bol = eArr.some(item=>{
							return item === true;
						});
						tmp.push(bol);
					});
					edit.push(tmp)
				});
				
				this.$store.commit("edit",edit);
			},
			mapBody(fn1,fn2){
				this.data.body.map((i,k)=>{
					i.content.map((j,h)=>{
						j.txt.map((q,p)=>{
							if(q.isEdit || j.isEdit){
								fn1&&fn1.call(this,k,h,p,q);
							}else{
								fn2&&fn2.call(this,k,h,p,q);
							}
						})
					});
				});
			},
			//修改状态
			editState(i,p,k,bol){
				let editData = {};
				this.mapBody((k,h,p,q)=>{
					bol ? this.value[k][h][q.key] = q.value : "";
					let reg = q.reg;
					if(reg){
						let test = reg.reg.test(q.value);
						test ? q.value = "" : "";
					}
					editData[q.key] = q.value;
				});
				this.$store.commit("editData",editData);
			},
			headerEdit(){
				this.changeEdit();
				this.mapBody((k,h,p)=>{
					this.$set(this.isInput[k][h],p,true);
				})
				this.$emit("canEdit");//是否可以编辑
			},
			//点击编辑图标
			itemClick(i,p,k,data){
				let params = {
					data:data,
					i:i,
					p:p,
					k:k
				}
				//这里不能使用commit提交
				/*
				 由于 JavaScript 的限制， Vue 不能检测以下变动的数组：
				当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue
				当你修改数组的长度时，例如： vm.items.length = newLength
				 * http://blog.csdn.net/websoftware/article/details/73200957
				 * */
				this.$set(this.edit[i],p,true);
				if(k){
					this.$set(this.isInput[i][p],k,true);
				}else{
					this.isInput[i][p].map((item,index)=>{
						this.$set(this.isInput[i][p],index,true);
					})
				}
				this.$emit("itemClick",params);
			},
			//选择确定
			itemOkClick(data,i,p,k){
				let params = {
					data:data,
					i:i,
					p:p,
					k:k
				}
				this.$set(this.isInput[i][p],k,false);
				this.$set(this.edit[i],p,false);
				this.$emit("itemOkClick",params);
			},
			//失焦事件
			blurItem(data,i,p,k){
				this.editState(i,p,k,false);
				this.$emit("blurItem",data);
			},
			//选择取消
			itemCacelClick(i,p,k){
				let editData = {};
				this.mapBody((k,h,p,q)=>{
					editData[q.key] = this.value[k][h][q.key];
					q.value = this.value[k][h][q.key];
				});
				this.$store.commit("editData",editData);
				this.$set(this.isInput[i][p],k,false);
				this.$set(this.edit[i],p,false);
				this.$emit("itemCacelClick");
			}
		},
		mounted(){
			let allEdit = this.allEdit;
			if(allEdit){
				this.mapBody((i,p,k)=>{
					this.$set(this.isInput[i][p],k,true);
				})
			}
		}
	}
</script>

<style lang="less">
.detail_container{
	width: 90%;
	margin: 0 auto;
	.head{
		width: 100%;
		height: auto;
		padding: 20px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		.title_name{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.title_text{
				font-size: 18px;
				color: #363636;
				padding-right: 8px;
			}
			.title_img{
				cursor: pointer;
			}
		}
		.detail_btn{
			height: 40px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			text-align: center;
			.button-temp{
				min-width: 90px;
				height: 30px;
				padding: 0 10px;
				margin-left: 10px;
				border-radius: 6px;
				font-size: 14px;
				line-height: 30px;
				background-image: linear-gradient(-270deg, #FFCE76 0%, #FFA671 100%);
			}
		}
	}
	.detail_body{
		width: 100%;
		height: auto;
		.body_list{
			width: 100%;
			height: auto;
			border-top:1px solid #979797;
			padding:30px 0 0 0;
			.body_title_wrapper{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 20px;
				.body_item_title{
					margin-bottom: 10px;
				}
			}
			.body_content{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-wrap:wrap;
				.body_item{
					width: 224px;
					word-break:break-all;
					margin-right: 20px;
					margin-bottom: 48px;
					.body_title{
						display: flex;
						justify-content: flex-start;
						align-items: center;
						.item_title{
							font-size: 15px;
							color: #5C5C5C;
							font-weight: bold;
							margin-bottom: 10px;
						}
						.body_title_img{
							margin:0 0 10px 5px;
							cursor: pointer;
						}
					}
					.item_content{
						display: flex;
						justify-content: flex-start;
						align-items: center;
						font-size: 14px;
						color: #939393;
						.item_img{
							cursor: pointer;
							margin: 0 0 10px 5px;
						}
						p{
							min-height: 20px;
							line-height: 20px;
							margin-bottom: 10px;
						}
						.item_edit{
							display: flex;
							justify-content: flex-start;
							align-items: center;
							.item_input{
								height: 20px;
								font-size: 14px;
								color: #939393;
								border: 1px solid #979797;
								text-indent: 5px;
							}
						}
					}
				}
			}
			.edit{
				width: auto;
				min-width: 224px !important;
			}
		}
	}
	.com_item{
		margin: 0 10px 10px 10px;
	}
}
</style>