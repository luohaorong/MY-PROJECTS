export default {
	state:{
		isShow:false,
		tipInputData:{}
	},
	mutations:{
		isShow:(state,bol) => {
			state.isShow = bol;
		},
		tipInputData:(state,data) => {
			state.tipInputData = data;
		}
	},
	actions:{
		
	},
	getters:{
		
	}
	
}
