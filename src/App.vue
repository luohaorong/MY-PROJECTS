<template>
  <div id="app">
  	<Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header"
export default {
  name: 'app',
  components:{
			Header
  }
}
</script>
	
<style>

</style>
