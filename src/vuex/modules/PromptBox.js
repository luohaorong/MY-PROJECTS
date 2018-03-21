export default {
	state:{
		isShow:false,
		tableHandleIds: [],
		tipInputData:{}
	},
	mutations:{
		isShow:(state,bol) => {
			state.isShow = bol;
		},
		tipInputData:(state,data) => {
			state.tipInputData = data;
		},
		tableHandleIds: (state, data) => {
			state.tableHandleIds = data;
		}
	},
	actions:{
		
	},
	getters:{
		
	}
}
