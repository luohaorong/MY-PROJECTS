export default {
	state:{
		isBlock:false,
		message:"",
		err:false,
		timer:true
	},
	mutations:{
		isBlock:(state)=>{
			state.isBlock = true;
			if(state.timer){
				state.timer = false;
				setTimeout(()=>{
					state.isBlock = false;
					state.timer = true;
				},3000);
			}
		},
		message:(state,data)=>{
			state.message = data;
		},
		err:(state,data)=>{
			state.err = data;
		}
	},
	actions:{
		
	},
	getters:{
		
	}
	
}