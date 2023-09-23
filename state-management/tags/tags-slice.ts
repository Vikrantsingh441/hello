import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { TagAdminService } from "../../proxy";


let TagAdminService: any;

const module = await import("../../proxy");
if ("TagAdminService" in module) {
  TagAdminService = module.TagAdminService;
}




type TagsInitialState = {
    allTags: any,
    // tag: any,
    tagDefinations: any,
    loading: boolean,
    error: string,
}

const TagsInitialState: TagsInitialState = {
    allTags: null,
    // tag: {},
    tagDefinations: {},
    loading: false,
    error: "",
};

export const fetchTags = createAsyncThunk(
    "tagsSlice/fetchTagsData",
    (data: any) => {
        return TagAdminService?.getTags({ filter: undefined, sorting: "id DESC", skipCount: data.skipCount, maxResultCount: data.maxResultCount }).then((result:any) => {
            console.log("result", result);
            return result;
        });
    }
);

export const createTag = createAsyncThunk("tagsSlice/CreateTag", (data: any) => {
    return TagAdminService?.postTags({ requestBody: data.body }).then((result: any) => {
        return result;
    });
});

export const getTagById = createAsyncThunk("tagsSlice/GetTagById", (data: any) => {
    return TagAdminService?.getTags1({ id: data.id }).then((result: any) => {
        return result;
    });
});

export const updateTag = createAsyncThunk("tagsSlice/UpdateTag", (data: any) => {
    return TagAdminService?.putTags({ id: data.id, requestBody: data.body }).then((result: any) => {
        return result;
    });
});

export const deleteTag = createAsyncThunk("tagsSlice/DeleteTag", (data: any) => {
    return TagAdminService?.deleteTags({ id: data.id }).then((result: any) => {
        return result;
    });
});

export const tagDefinations = createAsyncThunk("tagsSlice/TagDefinations", (data: any) => {
    return TagAdminService?.getTagsTagDefinitions().then((result: any) => {
        return result;
    });
});


const tagsSlice = createSlice({
    name: "tags",
    initialState: TagsInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTags.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTags.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.allTags = action.payload;;
            state.error = "";
        });
        builder.addCase(fetchTags.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(createTag.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createTag.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(createTag.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(getTagById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTagById.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;

            state.error = "";
        });
        builder.addCase(getTagById.rejected, (state, action) => {
            state.loading = false;

            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(updateTag.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateTag.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(updateTag.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(deleteTag.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteTag.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(deleteTag.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong";
        });

        builder.addCase(tagDefinations.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(tagDefinations.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.tagDefinations = action.payload;
            state.error = "";
        });
        builder.addCase(tagDefinations.rejected, (state, action) => {
            state.loading = false;
            state.tagDefinations = {};
            state.error = action.error.message || "Something Went Wrong";
        });

    },
});

export default tagsSlice.reducer;