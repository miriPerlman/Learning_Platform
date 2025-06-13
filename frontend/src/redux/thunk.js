import { createAsyncThunk } from "@reduxjs/toolkit";


export const getUserById = createAsyncThunk("users/fetchData",
     async (id) => {
    const response = await fetch(`http://localhost:5091/api/user/${id}`);
    if (!response.ok) {
        console.log('Response:', response);
    }
    const data = await response.json();
    return data;
});
export const SignUoToUsres = createAsyncThunk("users/signUp",
    async (user) => {
        const response = await fetch(`http://localhost:5091/api/user/register`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(user), 
        });

        if (!response.ok) {
            console.log('Response:', response);
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }
        
        const data = await response.json();
        return data.$values;
    }
);
export const GetAllCategories=createAsyncThunk("categories/getAll",
    async () => {
        const response = await fetch(`http://localhost:5091/api/category/getAllCategories`);
        if (!response.ok) {
            console.log('Response:', response);
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }
        const data = await response.json();
        return data.$values;
    }
);
export const GetSubCategories=createAsyncThunk("categories/getSubCategories",
    async (id) => {
        const response = await fetch(`http://localhost:5091/api/subCategory/${id}`);
        if (!response.ok) {
            console.log('Response:', response);
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }
        const data = await response.json();
        return data;
    }
);
export const AddPromptData = createAsyncThunk("prompt/addPrompt",
    async ({ userId, categoryId, subCategoryId, prompt }) => {
        const response = await fetch(`http://localhost:5091/api/prompt/${userId}/${categoryId}/${subCategoryId}/${prompt}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ userId, categoryId, subCategoryId, prompt }),
        });

        if (!response.ok) {
            console.log('Response:', response);
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }
        
        const data = await response.json();
        return data.response;
    }
);
export const getPromptsUserById = createAsyncThunk("prompt/getById",
    async (id) => {
   const response = await fetch(`http://localhost:5091/api/prompt/user/${id}`);
    if (!response.ok) {
        console.log('Response:', response);
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
    }
   const data = await response.json();
   return data.$values;
});
export const checkAdminPassword = createAsyncThunk("users/checkPasswordAdmin",
    async (password) => {
   const response = await fetch(`http://localhost:5091/api/user/check-admin-password/${password}`);
    if (!response.ok) {
        console.log('Response:', response);
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
    }
   const data = await response.json();
   return data;
});
export const getAllPrompts = createAsyncThunk("prompt/getAll",
    async () => {
   const response = await fetch(`http://localhost:5091/api/prompt/getAllPrompts`);
    if (!response.ok) {
        console.log('Response:', response);
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
    }
   const data = await response.json();
   return data.$values;
});
export const getCategoryById = createAsyncThunk("categories/getById",
    async (id) => {
   const response = await fetch(`http://localhost:5091/api/category/${id}`);
   if (!response.ok) {
    console.log('Response:', response);
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
}
   const data = await response.json();
   return data;
});
export const getSubCategoryById = createAsyncThunk("subCategories/getById",
    async (id) => {
   const response = await fetch(`http://localhost:5091/api/subCategory/getSubCategory/${id}`);
   if (!response.ok) {
    console.log('Response:', response);
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
}
   const data = await response.json();
   return data;
});
export const getAllPromptsByPaging = createAsyncThunk("prompts/getAllWithPaging", 
    async ({ page, filter }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5091/api/Prompt?pageNumber=${page}&pageSize=9&filterText=${filter}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Failed to fetch prompts');
            }

            const data = await response.json();
            return data.$values; 
        } catch (error) {
              return rejectWithValue(error.message);
        }
    }
);