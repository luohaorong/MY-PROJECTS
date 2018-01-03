<template>
	<div class="container">
		<div class="ipc_top">
			<p class="every_page_num">
				<span @click="login">每页</span>
				<select-unit class="show_num" :select-item="numItem" @selectValue="getSecVal"></select-unit>
				<span>条</span>
			</p>
			<select-unit class="address" :select-item="provinceItem" @selectValue="getProvince"></select-unit>
			<select-unit class="address" :select-item="cityItem" @selectValue="getCity"></select-unit>
			<select-unit class="address" :select-item="countyItem" @selectValue="getCounty"></select-unit>
			<select-unit class="pushType" :select-item="pushType" @selectValue="push"></select-unit>
			<select-unit class="onlineType" :select-item="onlineType" @selectValue="online"></select-unit>
		</div>
		
	</div>
</template>

<script>
	import selectUnit  from "@/components/Select"
	export default {
		name:"IPC",
		components:{
			selectUnit
		},
		data(){
			return{
				numItem:{
					name:"showNumber",
					list:[10,15,20,25,30,35]
				},
				provinceItem:{
					name:"showProvince",
					gray:"请选择省",
					list:["请选择省","成都","北京","上海","天津","石家庄","三亚"]
				},
				cityItem:{
					name:"showCity",
					gray:"请选择市",
					list:["请选择市","成都","北京","上海","天津","石家庄","三亚"]
				},
				countyItem:{
					name:"showCounty",
					gray:"请选择县",
					list:["请选择县","成都","北京","上海","天津","石家庄","三亚"]
				},
				pushType:{
					name:"pushType",
					gray:"推流状态",
					list:["推流状态","IPC","NVR"]
				},
				onlineType:{
					name:"onlineType",
					gray:"在线状态",
					list:["在线状态","IPC","NVR"]
				}
			}
		},
		methods:{
			getSecVal(val){
				console.log(`page:${val}`)
			},
			getProvince(val){
				TOOLS.get("/region",{"pid":1},res=>{
					console.log(res);
				})
				console.log(`address:${val}`)
			},
			getCity(val){
				console.log(`address:${val}`)
			},
			getCounty(val){
				console.log(`address:${val}`)
			},
			login(){
				TOOLS.post("/user/login",{
				uername:"gongluzhen111",
				password:"glz19911214",
				business_type:"201"
			}).then(res=>{
				console.log(res);
			})
			},
			push(val){
				console.log(val)
				
			},
			online(val){
				console.log(val)
			}
		},
		mounted(){
			
		}
	}
</script>

<style scoped lang="less">
.container{
	width: 1800px;
	height: auto;
	margin: 0 auto;
	overflow: hidden;
	.ipc_top{
		margin-top: 48px;
		display: flex;
		justify-content: flex-start;
		width: auto;
		height: auto;
		.every_page_num{
			width: 120px;
			height: 30px;
			line-height: 28px;
			display: flex;
			justify-content: flex-start;
			.show_num{
				width: 50px;
			}
		}
		.address,.pushType,.onlineType{
			width: 100px;
		}
	}
}
</style>