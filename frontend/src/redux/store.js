import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"
import categoryReducer from "./CategorySlice"
import promptReducer from "./PromptSlice"


const store = configureStore({
    reducer: {
        users: userReducer,
        categories:categoryReducer,
        prompts:promptReducer
    }
});

export default store;
