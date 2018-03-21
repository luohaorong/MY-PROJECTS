<template>
	<div class="serverItem">
		<div class="priorityTitleWrap">
			<div class="item" data-select="priority_number" @click="checkRule($event)">
        		<p class="item_title">发布域名优先级</p>
				<input type="radio" name="priority_radio" id="priority_number_sele" :checked = "checked"/>
			</div>
			<div class="item" data-select="release_rule_wrap" @click="checkRule($event)">
        		<p class="item_title">按规则发布</p>
				<input type="radio" name="priority_radio" id="release_rule_sele" :checked = "!checked"/>
			</div>
		</div>
		<div class="text_container">
			<input v-show="priority" class="priority_text" name="priority_number" type="text" v-model="priorityData" @keyup="priorityUp" @blur="priorityUp" placeholder="请输入发布域名优先级" />
			<div v-show="!priority" class="priority_text" name="release_rule_wrap">
				<div class="ipc_text_wrap" @click="clickRuleText">
					<div class="ipc_container" ref="ipc_container">
						<p v-for="(item,index) in ruleDom">
							<span> {{ item }}</span>
							<i class="delete_icon" @click="deletRule(index)">x</i>
						</p>
					</div>
					<input type="text" class="release_rule_text" ref="release_rule_text" @keyup.enter="ruleUp" v-model="ruleD"/>
				</div>
				<div class="tipWrap">
					<p>发布规则</p>
					<p>只有包含该字符串的IPC才能通过本域名发布</p>
					<p v-if="isTip">提示：您输入的ID已经存在，不可重复输入！</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		mame:"publishDomain",
		data(){
			return{
				priority:true,
				checked:true,
				priorityData:'',
				ruleD:'',
				ruleArr:[],
				releaseType: 0,
				isTip:false
			}
		},
		computed:{
			ruleDom(){
				return this.$store.state.Detail.ruleData
			}
		},
		methods:{
			checkRule(e){
				let active = e.currentTarget.getAttribute("data-select");
				if(active === "release_rule_wrap"){
					this.priority = false;
					this.checked = false;
					this.releaseType = 1;
				}else{
					this.priority = true;
					this.checked = true;
					this.releaseType = 0;
				}
				this.$store.commit("releaseType",this.releaseType);
			},
			clickRuleText(){
				let focusD = this.$refs.release_rule_text;
				focusD.focus();
			},
			ruleUp(){
				this.ruleArr.push(this.ruleD);
				this.$store.commit("ruleData",this.ruleArr);
				this.$emit("ruleUp",this.ruleDom);
				this.ruleD = '';
			},
			deletRule(index){
				this.ruleArr.splice(index,1);
				this.$store.commit("ruleData",this.ruleArr);
			},
			priorityUp(){
				this.priorityData = this.priorityData.replace(/\D/g,'');
				this.$emit("priorityUp",this.priorityData);
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
.serverItem{
        position: relative;
        .priorityTitleWrap{
            width: 100% !important;
            display: flex;
            justify-content: flex-start;
            .item{
                width: 50%;
                display: flex;
                justify-content: flex-start;
                label{
                	display: flex;
                	justify-content: flex-start;
                	align-items: center;
                }
                [name=priority_radio]{
                    width: 19px;
                    height: 19px;
                    margin-left: 10px;
                    cursor: pointer;
                }
                .item_title{
                	line-height: 30px !important;
                	font-size: 15px;
				    color: #5C5C5C;
				    font-weight: bold;
				    margin-bottom: 10px;
                    cursor: pointer;
                }
            }
        }
        .text_container{
            width: 100% !important;
            [name=priority_number]{
        	    width: 360px;
				height: 33px;
				font-size: 14px;
			    color: #939393;
			    border: 1px solid #979797;
			    text-indent: 5px;
            }
            [name=release_rule_wrap]{
                width: 580px !important;
                .tipWrap{
                    width: 210px;
                    height: 120px;
                    font-size: 14px;
                    color: #979797;
                    margin-left: 10px;
                    float: left;
                    :nth-child(1){
                        color: #5C5C5C;
                    }
                    :nth-child(2){
                        color: #CCCCCC;
                    }
                    /*:last-child{
                        color: #FFA344;
                    }*/
                }
                .ipc_text_wrap{
                    width: 360px;
                    min-height: 120px;
                    border:  1px solid #979797;
                    float: left;
                    .ipc_container{
                        width: auto;
                        float: left;
                        p{
                            width: 76px;
                            font-size: 14px;
                            color: #5C5C5C;
                            background-color: #F7F7F7;
                            border-radius: 6px;
                            text-align: center;
                            padding: 10px 10px 10px 6px;
                            overflow: hidden;
                            float: left;
                            display: flex;
                            justify-content: space-around;
                            margin: 10px 0 10px 10px;
                            span{
                                display: inline-block;
                                width: 48px;
                                height: 16px;
                                overflow: hidden;
                            }
                            .delete_icon{
                                width: 16px;
                                height: 16px;
                                text-align: center;
                                line-height: 16px;
                                color: #BFBFBF;
                                cursor: pointer;
                            }
                        }
                        
                    }
                    .release_rule_text{
                        width: 100px;
                        margin: 10px;
                        float: left;
                        border: none !important;
                        outline: none;
                    }
                }
            }
        }
    }
</style>