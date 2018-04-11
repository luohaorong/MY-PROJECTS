<template>
	<main id="app">
		<Header></Header>
		<router-view/>
		<div class="shade" v-show="isShow">
			<img src="/static/images/loading.gif" />
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
		data() {
			return {
				isShow: false
			}
		},
		methods: {
			showLoading() {
				setTimeout(() => {
					this.isShow = false;
				}, 400)
			}
		},
		beforeMount() {
			// 超时时间
			axios.defaults.timeout = 10000
			// http请求拦截器
			axios.interceptors.request.use(config => {
				let isUpLoad = config.url.split("?")[0].split("/")[3];
				let login = this.$route.path;
				this.isShow = true;
				let newParams = {};
				if(config.data){
					for(var i in config.data){
						if(config.data.hasOwnProperty(i) && config.data[i] !== "" && config.data[i] !== undefined) {
							newParams[i] = config.data[i];
						}
					}
				}else{
					for(var i in config.params){
						if(config.params.hasOwnProperty(i) && config.params[i] !== "" && config.params[i] !== undefined) {
							newParams[i] = config.params[i];
						}
					}
				}
				//post
				if(config.method === "post" || config.method === "put") {
					(TOOLS.cache("token") && login !== "/login") ? newParams.token = TOOLS.cache("token"): "";
					config.data = TOOLS.auth(newParams, {
						encrypt: ['password', 'currPassword', 'newpsd'],
						encryptionKey: '123456781234567812345678abcdefgh',
						business_type: 201,
						signStr: 'kSmDPItKVbc1on5sMA8643gLfpJd90ih',
						sort: 'asc'
					});
					if(isUpLoad === "upload"){
						delete config.data.business_type;
						delete config.data.sign;
						delete config.data.timestamp;
						delete config.data.token;
						console.log(config.data)
					}

				}
				//get,delete
				if(config.method === "get" || config.method === "delete") {
					let data = TOOLS.auth(newParams, {
						encrypt: ['password', 'currPassword', 'newpsd'],
						encryptionKey: '123456781234567812345678abcdefgh',
						business_type: 201,
						signStr: 'kSmDPItKVbc1on5sMA8643gLfpJd90ih',
						sort: 'asc'
					});
					(TOOLS.cache("token") && login !== "/login") ? newParams.token = TOOLS.cache("token"): "";
					config.params = Object.assign(newParams, data); //合并对象
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
				if(code !== 0) {
					this.$store.commit("isBlock");
					this.$store.commit("message", message);
					this.$store.commit("err", true);
				}
				
				if(code === 403 || code === 401) {
					this.$router.push("/login")
				} 
				
				return data
			}, error => {
				this.showLoading();
				this.$store.commit("isBlock");
				this.$store.commit("message", "服务器未响应");
				this.$store.commit("err", true);
				return Promise.reject(error)
			})
		}
	}
</script>

<style>
	#app {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.shade {
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