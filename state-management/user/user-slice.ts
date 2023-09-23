import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from "@reduxjs/toolkit";
// import { OrganizationUnitService, PermissionsService, RoleService ,UserService } from "../../proxy";

let OrganizationUnitService: any;
let PermissionsService: any;
let RoleService: any;
let UserService: any;

const module = await import("../../proxy");
if ("OrganizationUnitService" in module) {
  OrganizationUnitService = module.OrganizationUnitService;
}
if ("PermissionsService" in module) {
  PermissionsService = module.PermissionsService;
}
if ("RoleService" in module) {
  RoleService = module.RoleService;
}
if ("UserService" in module) {
  UserService = module.UserService;
}



export interface UserState {
  loading: boolean
  users: {items: any[], totalCount:number|null };
  organizationUnit:any
  editUser:any
  roles:any
  editUserRoles:any,
  error: string;
  permission:any;
  editorganizationUnit : any;
  alert: boolean;
  alertMessage: string;
  success: boolean;
  userName : string;
}
export const UserInitialState: UserState = {
    loading: false,
    users:{items: [], totalCount:null },
    editUser:null,
    roles:null,
    editUserRoles:null,
    organizationUnit:null,
    error: "",
    permission:null,
    editorganizationUnit:null,
    alert: false,
    alertMessage: "",
    success: false,
    userName :""
};

// Generates pending, fulfilled and rejected action types



export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    (data:any) => {
        return UserService?.getUsers1({filter:undefined,roleId:undefined,organizationUnitId:undefined,userName:undefined,phoneNumber:undefined,emailAddress:undefined,isLockedOut:undefined,notActive:undefined,sorting:"creationTime DESC",skipCount:data.skipCount,maxResultCount:data.maxResultCount}).then((result:any)=>{
            return result;
        });
    }
);

export const fetchOrganizationUnits = createAsyncThunk(
    "user/fetchOrganizationUnit",
    () => {
        return OrganizationUnitService?.getOrganizationUnits({filter:undefined,sorting:"id DESC",skipCount:0,maxResultCount:1000}).then((result:any)=>{
            return result;
        });
    }
);

export const fetchRoles = createAsyncThunk(
    "user/fetchRoles",
    () => {
        return RoleService?.getRoles1({filter:undefined,sorting:undefined,skipCount:0,maxResultCount:1000}).then((result:any)=>{
            return result;
        });
    }
);

export const fetchEditUser = createAsyncThunk(
    "user/fetchEditUser",
    (id:any) => {
        return UserService?.getUsers({id:id}).then((result:any)=>{
            return result;
        });
    }
);

export const fetchEditUserRoles = createAsyncThunk("user/fetchEditUserRoles",
    (id:any)=>{
        return UserService?.getUsersRoles({id:id}).then((result:any)=>{
            return result;
        });
    });

// export const fetchEditUserOrg = createAsyncThunk("user/fetchEditUserOrg",
// (id:any)=>{
//   return proxy.organizationUnitsAll(id).then((result)=>{
//     return result;
//   })
// })

export const updateUser = createAsyncThunk("user/updateUser",
    (data:any)=>{
        return UserService?.putUsers({id:data.id, requestBody:data.body}).then((result:any)=>{
            console.log("successfully updated user");
            return result;
        });
    });

export const createUser = createAsyncThunk(
    "user/createuser",
    (data:any)=>{
        return UserService?.postUsers({requestBody:data}).then((result:any)=>{
            return result;
        });
    }
);

export const deleteUser = createAsyncThunk("user/deleteUser",(data:any)=>{
    return UserService?.deleteUsers({id:data}).then((result:any)=>{
        return result;
    });
});

export const getPermission = createAsyncThunk("user/getPermission", (key:string) => {
    return PermissionsService?.getPermissions({providerName:"U",providerKey:key}).then((result:any)=>{
        return result;
    }); 
});

export const updatePermission = createAsyncThunk("user/updatePermission", (data:any) => {
    return PermissionsService?.putPermissions({providerName:"U",providerKey:data.key,requestBody:data.permissions}).then((result:any)=>{
        return result;
    }); 
});

export const fetchOrgUnit = createAsyncThunk("user/updatePermission", (data:any) => {
    return UserService?.getUsersAvailableOrganizationUnits().then((result:any)=>{
        return result;
    }); 
});

export const getSelectedOrgUnit = createAsyncThunk("user/getSelectedOrgUnit", (id:string) => {
    return UserService?.getUsersOrganizationUnits({id:id}).then((result:any)=>{
        return result;
    }); 
});


export const fetchRolesForEdit = createAsyncThunk("user/fetchRoles", (data:any) => {
    return UserService?.getUsersAssignableRoles().then((result:any)=>{
        return result;
    }); 
});
export const changePassword= createAsyncThunk("user/changePassword", (data:any) => {
    return UserService?.putUsersChangePassword(data).then((result:any)=>{
        return result;
    }); 
});

export const getUsersByUsername= createAsyncThunk("user/getUsersByUsername", (username:string) => {
    return UserService?.getUsersByUsername({username:username}).then((result:any)=>{
        return result;
    }); 
});
// export const getRolesForEdit = createAsyncThunk("user/getRoles", (id:string) => {
//   return proxy.rolesPUT(id,undefined).then((result:any)=>{ 
//      return result;
//   }
// });

const userSlice = createSlice({
    name: "user",
    initialState:UserInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchUsers.fulfilled,(state, action: PayloadAction<any>) => {
            state.loading = false;
            state.users = { items: action.payload.items, totalCount:action.payload.totalCount };
            state.error = "";
        }
        );
  
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = { items: [], totalCount:null };
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(fetchOrganizationUnits.pending, (state) => {
            state.loading = true;
        });

        builder.addCase( 
            fetchOrganizationUnits.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.organizationUnit = action.payload;
                state.error = "";
            }
        );

        builder.addCase(fetchOrganizationUnits.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });


        builder.addCase(fetchRoles.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            fetchRoles.fulfilled,
            (state, action: PayloadAction<any>) => {
        
                state.loading = false;
                state.roles = action.payload;
                state.error = "";
            }
        );

        builder.addCase(fetchRoles.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(fetchEditUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            fetchEditUser.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.editUser = action.payload;
                state.error = "";
            }
        );

        builder.addCase(fetchEditUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(
            createUser.pending,
            (state, action: PayloadAction<any>) => {
                state.loading = true;
                state.error = "";
            }
        );

        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
        });


        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(
            updateUser.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = "";
            }
        );
 
    

        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(deleteUser.pending, (state, action) => {
            state.loading = false;
        });

        builder.addCase(
            deleteUser.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = "";
            }
        );

        builder.addCase(changePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(changePassword.pending, (state, action) => {
            state.loading = false;
        });

        builder.addCase(
            changePassword.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.alertMessage = "Password Chaged Successfully";
                state.error = "";
            }
        );

        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        });


        //permissions

        builder.addCase(getPermission.pending,(state)=>{
            state.loading=true;
        });

        builder.addCase(
            getPermission.fulfilled,(state,action:PayloadAction<any>)=>{
                state.loading=false;
                state.permission=action.payload;
            }
        );
        builder.addCase(getPermission.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message||"Somethingwentwrong";
        });

        //updatePermission
        builder.addCase(updatePermission.pending,(state)=>{
            state.loading=true;
        });

        builder.addCase(
            updatePermission.fulfilled,(state,action:PayloadAction<any>)=>{
                state.loading=false;
            }
        );
        builder.addCase(updatePermission.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message||"Somethingwentwrong";
        });
    
        builder.addCase(fetchEditUserRoles.pending,(state)=>{
            state.loading=true;
        });

        builder.addCase(
            fetchEditUserRoles.fulfilled,(state,action:PayloadAction<any>)=>{
                state.loading=false;
                state.editUserRoles = action.payload;
            }
        );
        builder.addCase(fetchEditUserRoles.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message||"Somethingwentwrong";
        });

        builder.addCase(getUsersByUsername.pending,(state)=>{
            state.loading=true;
        });

        builder.addCase(
            getUsersByUsername.fulfilled,(state,action:PayloadAction<any>)=>{
                state.loading=false;
                state.userName = action.payload;
            }
        );
        builder.addCase(getUsersByUsername.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message||"Somethingwentwrong";
        });

        builder.addCase(
            getSelectedOrgUnit.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.editorganizationUnit = action.payload;
            }
        );
    },
});

export default userSlice.reducer;

