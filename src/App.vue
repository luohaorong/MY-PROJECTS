<template>
  <main id="app">
  	<Header></Header>
    <router-view/>
  </main>
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
