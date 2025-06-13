import { createSlice } from "@reduxjs/toolkit";
import {  checkAdminPassword, getUserById, SignUoToUsres } from "./thunk";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        UserList:[],
        adminPassword:"",
        usersById: {} 
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(getUserById.fulfilled, (state, action) => {
               state.UsersList = action.payload;
               if (action.payload?.id) {
                state.usersById[action.payload.id] = action.payload;
            }
            })
            .addCase(getUserById.pending, (state) => {
                state.UsersList = null;
            })
            .addCase(getUserById.rejected, (state) => {
                state.UsersList = null;
            })
            .addCase(SignUoToUsres.fulfilled, (state, action) => {
                state.UsersList = action.payload;
             })
             .addCase(SignUoToUsres.pending, (state) => {
                 state.UsersList = null;
             })
             .addCase(SignUoToUsres.rejected, (state) => {
                 state.UsersList = null;
             })
             .addCase(checkAdminPassword.fulfilled, (state, action) => {
                state.adminPassword = action.payload;
             })
             .addCase(checkAdminPassword.pending, (state) => {
                 state.adminPassword = "";
             })
             .addCase(checkAdminPassword.rejected, (state) => {
                 state.adminPassword = "";
             })
    }
    
});
export const {  } = UserSlice.actions;
 
export default UserSlice.reducer;
