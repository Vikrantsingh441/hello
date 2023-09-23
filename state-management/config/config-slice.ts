import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    AnyAction,
} from "@reduxjs/toolkit";
import {getAppConfig} from "raaghu-react-core";
 
  
  type configlInitialState = {
    configuration: any;
    error: string;
    status: "pending" | "loading" | "error" | "success";
  };
export const configlInitialState: configlInitialState = {
    configuration: [],
    error: "",
    status: "pending",
};
 
let API_URL:string;
if (process.env.REACT_APP_API_URL !== undefined) {
    API_URL = process.env.REACT_APP_API_URL.toString();
}
export const fetchConfiguration = createAsyncThunk(
    "configuration/fetchConfiguration",
    ()=>{
        return getAppConfig({api_url:API_URL, includeLocalizationResources: false }).then((result:any)=>{
            return result;
        });
    }
);
  
const configurationslice = createSlice({
    name: "configuration",
    initialState:configlInitialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchConfiguration.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            fetchConfiguration.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.configuration = action.payload;
                state.error = "";
            }
        );
        builder.addCase(fetchConfiguration.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });
  
    },
});
export default configurationslice.reducer;