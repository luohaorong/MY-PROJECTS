<template>
	<article>
		<detail :data="data"
			@headerBtnClick="headerBtnClick"
			@itemClick="itemClick"
			@itemOkClick="itemOkClick"
			@itemCacelClick="itemCacelClick"
			@blurItem="blurItem"
			>
		</detail>
	</article>
</template>

<script>
	import Detail from "@/components/Detail"
	export default {
		name: "NVRDetail",
		components: {
			Detail
		},
		data() {
			return {
				data: {
					header: {
						title: "NVR详情",
						src: "/static/images/edit.png",
						buttonMsg: [{
							txt: "返回",
							background: ""
						}]
					},
					body: []
				},
				ipcid:""
			}
		},
		methods: {
			//点击返回
			headerBtnClick(data) {
				this.$router.push("/Equipment/0/NVRTable/1")
			},
			//点击编辑
			itemClick(data){
				
			},
			//编辑完成
			itemOkClick(data){
				let editData = this.$store.state.Detail.editData;//所有可编辑的数据
				let opt = {};
				switch(data.data){
					case "title" :
					opt = {
						src:"/device/nvr/title",
						params:{
							nvrId:this.ipcid,
							title:editData.title
						},
						data:data,
						body:this.data.body,
						type:"put"
					};
					this.$store.dispatch("pullData",opt);
					break;
					case "registerAddress" :
					opt = {
						src:"/device/nvr/url",
						params:{
							nvrId:this.ipcid,
							registerUrl:editData.registerAddress
						},
						data:data,
						body:this.data.body,
						type:"put"
					};
					this.$store.dispatch("pullData",opt);
					break;
				};
			},
			//取消编辑
			itemCacelClick(){
				
			},
			//失焦
			blurItem(data){
				console.log(data)
			},
			
		},
		beforeMount() {
			let id = this.$route.query.id;
			TOOLS.get("/device/nvr/" + id).then(res => {
				let data = res.data;
				if(+data.code === 0) {
					let body = data.data;
					let time = this.$store.getters.creatTime(body.createDate); //创建时间
					this.ipcid =  body.gwId;
					let filter = this.$store.getters.screenData(body);
					let state = filter.state; //在线状态
					let status = filter.status; //设备状态
					this.data.body = [
					{
							content: [{
									title: "NVR 标题",
									src: "/static/images/edit.png",
									isEdit: true,
									txt: [{
											name: "",
											key:"title",
											value: body.title
										}]
									}, {
										title: "注册地址",
										isEdit: true,
										src: "/static/images/edit.png",
										txt: [{
											name: "",
											key:"registerAddress",
											value: body.registerUrl
										}]
									}, {
										title: "NVR ID",
										txt: [{
											name: "",
											key:"gwId",
											value:body.gwId
										}]
									}, {
										title: "设备型号",
										txt: [{
											name: "",
											key:"deviceMode",
											value: body.deviceMode
										}]
									}, {
										title: "商家名称",
										txt: [{
											name: "",
											key:"businessName",
											value: body.businessName
										}]
									}, {
										title: "注册时间",
										txt: [{
											name: "",
											key:"createDate",
											value: time
										}]
									}
									, {
										title: "最后上线时间",
										txt: [{
											name: "",
											key:"createDate",
											value: time
										}]
									}, {
										title: "设备状态",
										txt: [{
											name: "",
											key:"status",
											value: status
										}]
									}, {
										title: "在线状态",
										txt: [{
											name: "",
											key:"state",
											value: state
										}]
									}, {
										title: "版本",
										txt: [{
											name: "",
											key:"fwVersion",
											value: body.fwVersion
										}]
									}]
								}
							]
					this.$store.getters.detailData(this.data.body);
				}
			})
		}
	}
</script>

<style lang="less">
	#body_list0{
		.body_item{
			width: 300px;
		}
	}
</style>