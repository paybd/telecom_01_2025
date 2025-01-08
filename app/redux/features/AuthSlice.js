import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  userData: null,
};




const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {

    signup:(state,action)=>{
    
      state.userData = action.payload
    },

    login:(state,action)=>{
    
        state.userData = action.payload
      },

    updateUserStatus:(state,action)=>{
      state.userData.status=action.payload
    },

    updateUserPin:(state,action)=>{
      state.userData.pin=action.payload
    },
  
    updateUserBalance:(state,action)=>{
    

  
      state.userData.balance=action.payload

    },
    updateUserPhoto:(state,action)=>{
    

  
      state.userData.photo=action.payload

    },


 





    logout: (state, action) => {
    
      state.userData=null
    },


  },
  extraReducers: builder => {

   
  },
});
export const {signup,login,logout,updateUserStatus,updateUserBalance,updateUserPin,updateUserPhoto} = AuthSlice.actions;
export default AuthSlice.reducer;
