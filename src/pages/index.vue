<template>
	<section>
		<Header></Header>
		<NavBar></NavBar>
		<h1>{{ data }}</h1>
		<button @click="add">+</button>
	</section>
</template>

<script>
	import Header from "@/components/Header"
	import NavBar from "@/components/Nav"
	import { mapState } from 'vuex';
	export default {
		name:"index",
		components:{
			Header,
			NavBar
		},
		data(){
			return{
				data:this.$store.state.index.number
			}
		},
		computed:{
			...mapState(["count"])
		},
		 methods:{
			add(){
				this.$store.commit("count");
				this.data = this.$store.state.index.number;
			}
		}
		
		
	}
		

</script>

<style>
</style>