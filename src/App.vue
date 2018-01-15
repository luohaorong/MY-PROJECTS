<template>
	<main id="app">
		<Header></Header>
		<router-view/>
		<div class="shade" v-show="isShow">
			<img src="/src/assets/images/loading.gif"/>
		</div>
		<message-bar></message-bar>
	</main>
</template>

<script>
	import Header from "@/components/Header"
	import MessageBar from "@/components/MessageBar"
	import axios from "axios";
	export default {
		name: 'app',
		components: {
			Header,
			MessageBar
		},
		data(){
			return{
				isShow:false
			}
		},
		methods:{
			showLoading(){
				setTimeout(()=>{
					this.isShow = false;
				},300)
			}
		},
		beforeMount() {
			// 超时时间
			axios.defaults.timeout = 10000
			// http请求拦截器
			axios.interceptors.request.use(config => {
				let login = this.$route.path;
				this.isShow = true;
				//post
				if(config.method === "post" || config.method === "put"){
					config.data = TOOLS.auth(config.data,{
						encrypt:['password','currPassword','newpsd'],
				        encryptionKey:'123456781234567812345678abcdefgh',
				        business_type:201,
				        signStr:'kSmDPItKVbc1on5sMA8643gLfpJd90ih'
					});
				}
				//get,delete
				if(config.method === "get" || config.method === "delete"){
					let data = TOOLS.auth(config.params,{
						encrypt:['password','currPassword','newpsd'],
				        encryptionKey:'123456781234567812345678abcdefgh',
				        business_type:201,
				        signStr:'kSmDPItKVbc1on5sMA8643gLfpJd90ih'
					});
					config.params = Object.assign(config.params,data);//合并对象
				}
				
				//如果是登录前无需token
				if(TOOLS.cache("token") && login !== "/login"){
					if(config.method === "post" || config.method === "put"){
						config.data.token = TOOLS.cache("token")
					} else{
						config.params.token = TOOLS.cache("token")	
					}
				}
				return config
			}, error => {
				this.showLoading();
				return Promise.reject(error)
			})
			// http响应拦截器
			axios.interceptors.response.use(data => { // 响应成功关闭loading
				this.showLoading();
				let code = +data.data.code;
				let message = data.data.message;
				if(code !== 0){
					this.$store.commit("isBlock");
					this.$store.commit("message",message);
					this.$store.commit("err",true);
				}
				if( code === 403 || code === 401){
					this.$router.push("/login")
				}
				return data
			}, error => {
				this.showLoading();
				this.$store.commit("isBlock");
				this.$store.commit("message","服务器未响应");
				this.$store.commit("err",true);
				return Promise.reject(error)
			})
		}
	}
</script>

<style>
	#app{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.shade{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
</style>