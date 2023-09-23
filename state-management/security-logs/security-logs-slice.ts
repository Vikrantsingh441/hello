import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// import { SecurityLogService } from "../../proxy";

let SecurityLogService: any;

const module = await import("../../proxy");
if ("SecurityLogService" in module) {
  SecurityLogService = module.SecurityLogService;
}

export interface SecurityLogsState {
  loading: boolean;
  securityLogs: any;
  error: string;
}

export const securityLogsState: SecurityLogsState = {
    loading: false,
    securityLogs: null,
    error: "",
};


export const fetchSecurityLogs = createAsyncThunk("securityLogs/fetchSecurityLogs", (data:any) => {
    return SecurityLogService?.getSecurityLogs(data).then((result:any)=>{
       return result;
    }) 
  });

// export const fetchSecurityLogs = createAsyncThunk(
//     "securityLogs/fetchSecurityLogs",
//     (data: any) => {
//         return SecurityLogService.getSecurityLogs({
//             startTime: data?.startDate,
//             endTime: data?.endDate,
//             applicationName: data?.applicationName,
//             identity: data?.identity,
//             action: data?.action,
//             userName: data?.userName,
//             clientId: data?.clientId,
//             correlationId: data?.correlationId,
//             sorting: data?.sorting,
//             skipCount: 0,
//             maxResultCount: 1000,
//         });
//     }
// );

const securityLogs = createSlice({
    name: "securityLogs",
    initialState: securityLogsState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSecurityLogs.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            fetchSecurityLogs.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.securityLogs = { items: action.payload.items, totalCount:action.payload.totalCount };
            }
        );

        builder.addCase(fetchSecurityLogs.rejected, (state, action) => {
            state.loading = false;
            state.securityLogs = { items: [], totalCount: null };
            state.error = action.error.message || "Something went wrong";
        });
    },
});

export default securityLogs.reducer;
