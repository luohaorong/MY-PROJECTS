export default {
	state:{
		number:1
	},
	mutations:{
		count:(state,n) => {
			let num = n || 1;
			state.number += num;
			
		}
	},
	actions:{
		
	},
	getters:{
		
	}
	
}
