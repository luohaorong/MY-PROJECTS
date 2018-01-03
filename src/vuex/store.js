import Vue from "vue";
import Vuex from "vuex";
import index from "./modules/index"
import PromptBox from "./modules/PromptBox"
Vue.use(Vuex);
const store = new Vuex.Store({
	modules:{
		index:index,
		PromptBox:PromptBox
	}
})
export default store;