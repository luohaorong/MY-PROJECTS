import Vue from "vue";
import Vuex from "vuex";
import index from "./modules/index"
import PromptBox from "./modules/PromptBox"
import MessageBar from "./modules/MessageBar"
import TableUnit from "./modules/TableUnit"
import Detail from "./modules/Detail"
Vue.use(Vuex);
const store = new Vuex.Store({
	modules:{
		index:index,
		PromptBox:PromptBox,
		MessageBar:MessageBar,
		TableUnit:TableUnit,
		Detail:Detail
	}
})
export default store;