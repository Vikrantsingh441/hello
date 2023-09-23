// import { createSlice, createAsyncThunk, PayloadAction, AnyAction, } from "@reduxjs/toolkit";
// import {ServiceProxy} from '../../shared/service-proxy'

// type InitialStateIdentity = {
//   loading: boolean;
//   getIdentity:any;
//   getAllIdentity:any
//   error: string;
// }; 

// export const initialStateIdentity:InitialStateIdentity= {
//   loading: false,
//   getIdentity:null,
//   getAllIdentity:null,
//   error: ""
// };

// // Generates pending, fulfilled and rejected action types
// const proxy = new ServiceProxy();

// export const getIdentityResources = createAsyncThunk("identityresources/getIdentityResources", () => {
//   return proxy.identityResourcesGET(undefined,undefined,undefined,undefined,undefined).then((result:any)=>{
//       return result;
//   })   
// });

// export const saveidentityResources = createAsyncThunk("identityresources/saveidentityResources", (formData:any) => {
//   return proxy.identityResourcesPOST(formData,undefined).then((result:any)=>{
//       return result;
//   })   
// });


// export const deleteIdentityResources = createAsyncThunk("identityresources/getIdentityResources", (id:any) => {
//   return proxy.identityResourcesDELETE(id,undefined,).then((result:any)=>{
//       return result;
//   })   
// });

// export const getAllIdentityResources = createAsyncThunk("identityresources/getAllIdentityResources", () => {
//   return proxy.allAll3(undefined).then((result:any)=>{
//       return result;
//   })   
// });
// export const fetchIdentityResources = createAsyncThunk("identityresources/fetchIdentityResources", (id:any) => {
//   return proxy.identityResourcesGET2(id,undefined).then((result:any)=>{
//       return result;
//   })   
// });

// export const updateIdentityResources = createAsyncThunk("identityresources/updateIdentityResources", (id:any) => {
//   return proxy.identityResourcesPUT(id,undefined).then((result:any)=>{
//       return result;
//   })   
// });

// export const createStandardResources = createAsyncThunk("identityresources/createStandardResources", () => {
//   return proxy.createStandardResources(undefined).then((result:any)=>{
//       return result;
//   })   
// });


// const identiyResourcesSlice = createSlice({
//   name: "identityResources",
//   initialState :initialStateIdentity, 
//   reducers: {},
//   extraReducers: (builder) => {


//     builder.addCase(getIdentityResources.pending, (state) => {
//       state.loading = true;
//     });     

//     builder.addCase(
//       getIdentityResources.fulfilled,(state, action: PayloadAction<any>) => {
//         state.loading = false;
//         state.getIdentity= action.payload;
//       }
//     );
//     builder.addCase(getIdentityResources.rejected, (state, action) => {       
//       state.loading = false;     
//       state.error = action.error.message || "Something went wrong";   
//     });
    
    
//     builder.addCase(getAllIdentityResources.pending, (state) => {
//       state.loading = true;
//     });     

//     builder.addCase(
//       getAllIdentityResources.fulfilled,(state, action: PayloadAction<any>) => {
//         state.loading = false;
//         state.getAllIdentity= action.payload;
//       }     
//     );
//     builder.addCase(getAllIdentityResources.rejected, (state, action) => {       
//       state.loading = false;            
//       state.error = action.error.message || "Something went wrong";     
//     });  

//   }, 
// });



// export default identiyResourcesSlice.reducer;