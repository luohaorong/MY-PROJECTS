import Vue from "vue";
import Vuex from "vuex";
import index from "./modules/index"
import countter from "./modules/countter"
Vue.use(Vuex);
const store = new Vuex.Store({
	modules:{
		index:index,
		countter:countter
	}
})
export default store;