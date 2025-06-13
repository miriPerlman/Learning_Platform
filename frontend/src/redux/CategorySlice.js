import { createSlice } from "@reduxjs/toolkit";
import { getCategoryById, getSubCategoryById, GetAllCategories, GetSubCategories } from "./thunk";

const CategorySlice = createSlice({
    name: "categories",
    initialState: {
        CategoriesList: [],   
        SubCategoriesList: {$values:[]},
        categoriesById: {},
        subCategoriesById: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get category by id
            .addCase(getCategoryById.fulfilled, (state, action) => {
                if (action.payload?.id) {
                    state.categoriesById[action.payload.id] = action.payload;
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(getCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to fetch category by id";
            })
            // Get sub category by id
            .addCase(getSubCategoryById.fulfilled, (state, action) => {
                if (action.payload?.id) {
                    state.subCategoriesById[action.payload.id] = action.payload;
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(getSubCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSubCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to fetch sub category by id";
            })
            // Get all categories
            .addCase(GetAllCategories.fulfilled, (state, action) => {
                state.CategoriesList = action.payload || []; // <-- שינוי כאן
                state.loading = false;
                state.error = null;
            })
            .addCase(GetAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to fetch all categories";
            })
            // Get all sub categories
            .addCase(GetSubCategories.fulfilled, (state, action) => {
                state.SubCategoriesList = action.payload || []; // <-- שינוי כאן
                state.loading = false;
                state.error = null;
            })
            .addCase(GetSubCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetSubCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to fetch all sub categories";
            });
    }
});

export default CategorySlice.reducer;
