import { createSlice } from "@reduxjs/toolkit";
import { AddPromptData, getAllPrompts, getAllPromptsByPaging, getPromptsUserById } from "./thunk";

const PromptSlice = createSlice({
    name: "prompt",
    initialState: {
        allPrompts: [],
        PromptsOfUSer: [],
        PromptForSend: [],
        promptsWithPaging: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        resetPromptForSend: (state) => {
            state.PromptForSend = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(AddPromptData.fulfilled, (state, action) => {
            state.PromptForSend = action.payload;
        })
            .addCase(AddPromptData.pending, (state) => {
                state.PromptForSend = null;
            })
            .addCase(AddPromptData.rejected, (state) => {
                state.PromptForSend = null;
            })
            .addCase(getPromptsUserById.fulfilled, (state, action) => {
                state.PromptsOfUSer = action.payload;
            })
            .addCase(getPromptsUserById.pending, (state) => {
                state.PromptsOfUSer = [];
            })
            .addCase(getPromptsUserById.rejected, (state) => {
                state.PromptsOfUSer = [];
            })
            .addCase(getAllPrompts.fulfilled, (state, action) => {
                state.allPrompts = action.payload;
            })
            .addCase(getAllPrompts.pending, (state) => {
                state.allPrompts = [];
            })
            .addCase(getAllPrompts.rejected, (state) => {
                state.allPrompts = [];
            })
             .addCase(getAllPromptsByPaging.pending, (state) => {
                state.status = 'loading'; 
                state.error = null;
            })
            .addCase(getAllPromptsByPaging.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.promptsWithPaging = action.payload; 
                console.log("Prompts with paging fetched successfully:", action.payload);
            })
            .addCase(getAllPromptsByPaging.rejected, (state, action) => {
                state.status = 'failed'; 
                state.error = action.payload; 
                console.error("Error fetching prompts with paging:", action.payload);
            });
    }

});
export const { resetPromptForSend } = PromptSlice.actions;

export default PromptSlice.reducer;
