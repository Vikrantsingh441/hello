import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ClaimTypeService } from "../../proxy";

type InitialState = {
  loading: boolean;
  users:  {items: any[], totalCount:number|null };
  error: string;
  alert: boolean;
  alertMessage: string;
  success: boolean;
  editClaimsData:any[];
};

const initialState: InitialState = {
    loading: false,
    users: { items: [], totalCount:null },
    error: "",
    alert: false,
    alertMessage: "",
    success: false,
    editClaimsData:[]
};

export const fetchClaimTypesData = createAsyncThunk(
    "claimTypes/fetchClaimTypesData",
    (data:any) => { 
        return ClaimTypeService?.getClaimTypes({filter:undefined, sorting:"id DESC", skipCount:data.skipCount, maxResultCount:data.maxResultCount})
            .then((result: any) => {
                return result
            });
    }
);

export const deleteClaimTypesData = createAsyncThunk(
    "claimTypes/deleteClaimTypesData",
    (id: string) => {
        return ClaimTypeService?.deleteClaimTypes({id}).then((result: any) => {
            return result;
        });
    }
);

export const addClaimTypesData = createAsyncThunk(
    "claimTypes/addClaimTypesData",
    (claimTypeDto: any) => {
        return ClaimTypeService?.postClaimTypes({requestBody:claimTypeDto}).then((result:any)=>{
            return result;
        });
    }
);

export const getClaimTypesData = createAsyncThunk(
    "claimTypes/getClaimTypesData",
    (id:string) => {
        return ClaimTypeService?.getClaimTypes1({id:id}).then((result:any)=>{
            return result;
        });
    }
);

export const editClaimTypesData = createAsyncThunk(
    "claimTypes/editClaimTypesData",
    ({id ,claimTypeDto}:{id: any, claimTypeDto: any}) => {
        return ClaimTypeService?.putClaimTypes({id, requestBody:claimTypeDto}).then((result:any)=>{
            return result;
        });
    }
);

const claimTypesSlice = createSlice({
    name: "claimTypes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    // Fetch Data

        builder.addCase(fetchClaimTypesData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchClaimTypesData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.users = action.payload;
                state.error = "";
            }
        );
        builder.addCase(fetchClaimTypesData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(deleteClaimTypesData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            deleteClaimTypesData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                // state.users = { items: action.payload.items, totalCount:action.payload.totalCount };
                state.error = "";
                state.alert = true;
                state.alertMessage = "Data deleted Successfully";
                state.success = true;
            }
        );
        builder.addCase(deleteClaimTypesData.rejected, (state, action) => {
            state.loading = false;
            // state.users = { items: [], totalCount:null };
            state.error = action.error.message || "Something Went Wrong";
            state.alert = true;
            state.alertMessage = "Data deleted successfully";
            state.success = true;
        });

        builder.addCase(addClaimTypesData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            addClaimTypesData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = "";
                state.alert = true;
                state.alertMessage = "Data added Successfully";
                state.success = true;
            }
        );
        builder.addCase(addClaimTypesData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
            state.alert = true;
            state.alertMessage = "Something Went Wrong";
            state.success = false;
        });

        builder.addCase(editClaimTypesData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            editClaimTypesData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = "";
                state.alert = true;
                state.alertMessage = "Data edited successfully";
                state.success = true;
            }
        );
        builder.addCase(editClaimTypesData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
            state.alert = true;
            state.alertMessage = "Something Went Wrong";
            state.success = false;
        });

        builder.addCase(getClaimTypesData.pending,(state)=>{
            state.loading=true;
        });

        builder.addCase(
            getClaimTypesData.fulfilled,(state,action:PayloadAction<any>)=>{
        
                state.loading=false;
                state.editClaimsData=action.payload;
            }
        );
        builder.addCase(getClaimTypesData.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message||"Somethingwentwrong";
        });
    },
});

export default claimTypesSlice.reducer;
