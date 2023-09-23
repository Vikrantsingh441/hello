import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from "@reduxjs/toolkit";


// import { PermissionsService, RoleService } from "../../proxy";

let PermissionsService: any;
let RoleService: any;

const module = await import("../../proxy");
if ("PermissionsService" in module) {
  PermissionsService = module.PermissionsService;
}
if ("RoleService" in module) {
  RoleService = module.RoleService;
}


export interface InitialRolesState {
    roles: { items: any[], totalCount: number | null };
    permission: any;
    claimsAll: any;
    claims: any;
    error: string;
    status: "pending" | "loading" | "error" | "success";
}
export const rolesInitialState: InitialRolesState = {
    roles: { items: [], totalCount: null },
    permission: [],
    claimsAll: [],
    claims: [],
    error: "",
    status: "pending",
};

export const fetchRolesInRoles = createAsyncThunk(
    "edition/fetchRolesData",
    (data:any) => {
        return RoleService?.getRoles1({filter:undefined, sorting:"id DESC", skipCount:data.skipCount, maxResultCount:data.maxResultCount}).then((result:any) => {
            console.log("result", result);
            return result;
        });
    }
);

//Roles unit
// export const fetchRolesInRoles = createAsyncThunk(
//     "Roles/fetchRolesInRoles",
//     async (data: any) => {
//         const result = await RoleService.getRoles1({
//             filter: undefined,
//             sorting: "id DESC",
//             skipCount: data.skipCount,
//             maxResultCount: data.maxResultCount,
//         });
//         return result;
//     }
// );

export const fetchAllClaims = createAsyncThunk("Roles/fetchAllClaims",
    async () => {
        return RoleService?.getRolesAllClaimTypes().then((result: any) => {

            return result;
        });
    });

export const fetchClaims = createAsyncThunk(
    "Roles/fetchClaims",
    (id: any) => {
        RoleService?.getRolesClaims({ id: id }).then((result: any) => {
            return result;
        });
    }
);

export const putClaims = createAsyncThunk("Roles/putClaims", (data: any) => {
    RoleService?.putRolesClaims({ id: data.id, requestBody: data.body }).then(
        (result: any) => {
            return result;
        }
    );
});

export const addRolesUnit = createAsyncThunk(
    "Roles/addRolesUnit",
    (dto: any) => {
        const result = RoleService?.postRoles({ requestBody: dto });
        return result;
    }
);
export const editRoles = createAsyncThunk(
    "Roles/editRoles",
    ({ id, dTo }: { id: any; dTo: any }) => {
        console.log("dTo from slice ", dTo);
        const result = RoleService?.putRoles({ id: id, requestBody: dTo });
        return result;
    }
);

export const deleteRoles = createAsyncThunk("Roles/deleteRoles", (id: any) => {
    const result = RoleService?.deleteRoles({ id: id });
    return result;
});

//permissionsGET
// export const fetchPermission = createAsyncThunk(
//   "Roles/fetchPermission",
//   (key: any) => {
//     PermissionsService.getPermissions({
//       providerName: "R",
//       providerKey: key,
//     }).then((result: any) => {
//       console.log("fetched data , ", result);
//       return result;
//     });
//   }
// );
export const fetchPermission = createAsyncThunk("Roles/fetchPermission", (key: string) => {
    return PermissionsService?.getPermissions({ providerName: "R", providerKey: key }).then((result: any) => {
        return result;
    });
});

//permissionsPUT
export const editPermisstion = createAsyncThunk(
    "Roles/editPermisstion",
    ({ key, dTo }: { key: any; dTo: any }) => {
        const result = PermissionsService?.putPermissions({
            providerName: "R",
            providerKey: key,
            requestBody: dTo,
        });
        return result;
    }
);
const RolesSlice = createSlice({
    name: "Roles",
    initialState: rolesInitialState,
    reducers: {},
    extraReducers: (builder) => {
        //Roles unit reducer
        builder.addCase(fetchRolesInRoles.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            fetchRolesInRoles.fulfilled,
            (state, action: PayloadAction<any>) => {

                state.status = "success";
                state.roles = { items: action.payload.items, totalCount: action.payload.totalCount };
                state.error = "";
            }
        );
        builder.addCase(fetchRolesInRoles.rejected, (state, action) => {
            state.status = "error";
            state.roles = { items: [], totalCount: null };
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(fetchAllClaims.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            fetchAllClaims.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.claimsAll = action.payload;
                state.error = "";
            }
        );
        builder.addCase(fetchAllClaims.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(fetchClaims.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            fetchClaims.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.claims = action.payload;
                state.error = "";
            }
        );
        builder.addCase(fetchClaims.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });

        builder.addCase(deleteRoles.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            deleteRoles.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.roles = action.payload;
                state.error = "";
            }
        );
        builder.addCase(deleteRoles.rejected, (state, action) => {
            state.status = "error";
            state.roles = { items: [], totalCount: null };
            state.error = action.error.message || "Something Went Wrong";
        });
        builder.addCase(editRoles.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            editRoles.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.roles = { items: action.payload.items, totalCount: action.payload.totalCount };
                state.error = "";
            }
        );
        builder.addCase(editRoles.rejected, (state, action) => {
            state.status = "error";
            state.roles = { items: [], totalCount: null };
            state.error = action.error.message || "Something Went Wrong";
        });
        //permission
        builder.addCase(fetchPermission.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            fetchPermission.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.permission = action.payload;
                state.error = "";
            }
        );
        builder.addCase(fetchPermission.rejected, (state, action) => {
            state.status = "error";
            state.permission = [];
            state.error = action.error.message || "Something went wrong";
        });
        builder.addCase(editPermisstion.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            editPermisstion.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.permission = action.payload;
                state.error = "";
            }
        );
        builder.addCase(editPermisstion.rejected, (state, action) => {
            state.status = "error";
            state.permission = [];
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(putClaims.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            putClaims.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.error = "";
            }
        );
    },
});
export default RolesSlice.reducer;