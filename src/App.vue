<template>
	<main id="app">
		<Header></Header>
		<router-view/>
		<div class="shade" v-show="isShow">
			<img src="/src/assets/images/loading.gif"/>
		</div>
	</main>
</template>

<script>
	import Header from "@/components/Header"
	import axios from "axios";
	export default {
		name: 'app',
		components: {
			Header
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
				},500)
			}
		},
		mounted() {
			// 超时时间
			axios.defaults.timeout = 5000
			// http请求拦截器
			axios.interceptors.request.use(config => {
				
				this.isShow = true;
				return config
			}, error => {
				this.showLoading();
				return Promise.reject(error)
			})
			// http响应拦截器
			axios.interceptors.response.use(data => { // 响应成功关闭loading
				this.showLoading();
				return data
			}, error => {
				this.showLoading();
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
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
</style>