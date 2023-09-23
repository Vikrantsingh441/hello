import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    AnyAction,
} from "@reduxjs/toolkit";
// import { DirectoryDescriptorsService, FileDescriptorsService } from "../../proxy";

let DirectoryDescriptorsService: any;
let FileDescriptorsService: any;

const module = await import("../../proxy");
if ("DirectoryDescriptorsService" in module) {
  DirectoryDescriptorsService = module.DirectoryDescriptorsService;
}
if ("FileDescriptorsService" in module) {
  FileDescriptorsService = module.FileDescriptorsService;
}



type fileInitialState = {
  fileOrFolder:null;
  directoryId: null;
  subDirectories: any;
  directoryDescriptor: any;
  editDirectory:any;
  moveDirectory:any;
  error: string;
  status: "pending" | "loading" | "error" | "success";
};
export const fileInitialState: fileInitialState = {
    fileOrFolder:null,
    directoryId: null,
    subDirectories: [],
    directoryDescriptor: [],
    moveDirectory:null,
    editDirectory:null,
    error: "",
    status: "pending",
};

 

export const fetchSubDirectory = createAsyncThunk(
    "FileManagement/fetchSubDirectory",
    (data:any)=>{
        return DirectoryDescriptorsService?.getDirectoryDescriptorSubDirectories({parentId:data}).then((result:any)=>{
            return result;
        });
    }
);

export const fetchDirectoryDescriptor = createAsyncThunk( 
    "FileManagement/fetchDirectoryDescriptor",
    (data:any)=>{
        return DirectoryDescriptorsService?.getDirectoryDescriptor1({filter:undefined,id:data.id,sorting:undefined,skipCount:data.skipCount,maxResultCount:data.maxResultCount}).then((result:any)=>{
            return result;
        });
  
    }
);

export const saveDirectoryDescriptor = createAsyncThunk(
    "FileManagement/saveDirectoryDescriptor",
    (data:any)=>{
        return DirectoryDescriptorsService?.postDirectoryDescriptor1({requestBody:data}).then((result:any)=>{
            return result;
        });
    }
);


export const fetchEditDirectory = createAsyncThunk(
    "FileManagement/fetchEditDirectory",
    (data:any)=>{
        return DirectoryDescriptorsService?.getDirectoryDescriptor({id:data}).then((result:any)=>{
            return result;
        });
    }
);

export const updateDirectoryDescriptor = createAsyncThunk(
    "FileManagement/updateDirectoryDescriptor",
    (data:any)=>{
        return DirectoryDescriptorsService?.postDirectoryDescriptor({id:data.id,requestBody:data.body}).then((result:any)=>{
            return result;
        });
    }
);

export const deleteDirectoryDescriptor = createAsyncThunk(
    "FileManagement/deleteDirectoryDescriptor",
    (data:any)=>{
        return DirectoryDescriptorsService?.deleteDirectoryDescriptor({id:data}).then((result:any)=>{
            return result;
        });
    }
);

export const moveDirectoryDescriptor= createAsyncThunk(
    "FileManagement/moveDirectoryDescriptor",
    (data:any)=>{
        return DirectoryDescriptorsService?.postDirectoryDescriptorMove({requestBody:data.body}).then((result:any)=>{
            return result;
        });
    }
);

export const fetchFileDescriptorId= createAsyncThunk(
    "FileManagement/fetchFileDescriptor",
    (data:any)=>{
        return FileDescriptorsService?.getFileDescriptor({id:data.id}).then((result:any)=>{
            return result;
        });
    }
);  

export const updateFileDescriptor= createAsyncThunk(
    "FileManagement/updateFileDescriptor",
    (data:any)=>{
        return FileDescriptorsService?.postFileDescriptor({id:data.id,requestBody:data.body}).then((result:any)=>{
            return result;
        });
    }
);

export const DeleteFileDescriptor= createAsyncThunk(
    "FileManagement/DeleteFileDescriptor",
    (data:any)=>{
    
        return FileDescriptorsService?.deleteFileDescriptor({id:data}).then((result:any)=>{
            return result;
        });
    }
);

export const fetchFileDescriptor= createAsyncThunk(
    "FileManagement/fetchFileDescriptor",
    (data:any)=>{
        return FileDescriptorsService?.getFileDescriptor1({directoryId:data.directoryId}).then((result:any)=>{
            return result;
        });
    }
);

export const uploadFileDescriptor= createAsyncThunk(
    "FileManagement/uploadFileDescriptor",
    (data:any)=>{
        console.log(data);
        return FileDescriptorsService?.postFileDescriptorUpload({name:data.name,directoryId:data.directoryId,  
            extraProperties:data.extraProperties,formData:data.formData}).then((result:any)=>{
            return result;
        });
    }
);

export const moveFileDescriptor= createAsyncThunk(
    "FileManagement/moveFileDescriptor",
    (data:any)=>{
        return FileDescriptorsService?.postFileDescriptorMove({requestBody:data.body}).then((result:any)=>{
            return result;
        });
    }
);

export const infoFileDescriptor= createAsyncThunk(
    "FileManagement/infoFileDescriptor",
    (data:any)=>{
        return FileDescriptorsService?.postFileDescriptorPreUploadInfo({requestBody:data}).then((result:any)=>{
            return result;
        });
    }
);

export const fetchFileContentDescriptor= createAsyncThunk(
    "FileManagement/fetchFileContentDescriptor",
    (data:any)=>{
        return FileDescriptorsService?.getFileDescriptorContent({id:data.id}).then((result:any)=>{
            return result;
        });
    }
);

export const fetchFileTokenDescriptor= createAsyncThunk(
    "FileManagement/fetchFileTokenDescriptor",
    (data:any)=>{
        return FileDescriptorsService?.getFileDescriptorDownloadToken({id:data.id}).then((result:any)=>{
            return result;
        });
    }
);

export const fetchFileDownloadDescriptor= createAsyncThunk(
    "FileManagement/fetchFileDownloadDescriptor",
    (data:any)=>{
        return FileDescriptorsService?.getFileDescriptorDownload({id:data.id, token:data.token}).then((result:any)=>{
            return result;
        });
    }
);



const FileManagementSlice = createSlice({
    name: "FileManagement",
    initialState:fileInitialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchSubDirectory.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            fetchSubDirectory.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.subDirectories = action.payload;
                state.error = "";
            }
        );
        builder.addCase(fetchSubDirectory.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });


        builder.addCase(fetchDirectoryDescriptor.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            fetchDirectoryDescriptor.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.directoryDescriptor = action.payload;
                state.error = "";
            }
        );
        builder.addCase(fetchDirectoryDescriptor.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message || "Something went wrong";
        });



        builder.addCase(deleteDirectoryDescriptor.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            deleteDirectoryDescriptor.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.error = "";
            }
        );
    
    
        builder.addCase(updateDirectoryDescriptor.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            updateDirectoryDescriptor.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.error = "";
            }
        );


        builder.addCase(fetchEditDirectory.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            fetchEditDirectory.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.editDirectory = action.payload;
                state.error = "";
            }
        );
        builder.addCase(fetchEditDirectory.rejected, (state, action: PayloadAction<any>) => {
            state.status = "error";
            //state.error = action.error.message || "Something went wrong";
        });
    


        builder.addCase(saveDirectoryDescriptor.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            saveDirectoryDescriptor.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.error = "";
            }
        );

        builder.addCase(uploadFileDescriptor.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(
            uploadFileDescriptor.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = "success";
                state.error = "";
            }
        );


    },
});
export default FileManagementSlice.reducer;