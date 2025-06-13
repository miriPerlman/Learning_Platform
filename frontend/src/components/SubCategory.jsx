import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { AddPromptData, getCategoryById, getSubCategoryById, getUserById } from '../redux/thunk';
import { resetPromptForSend } from '../redux/PromptSlice';
import './css_files/SubCategory.css';

const SubCategory = () => {
    const { name, subCategoryId, categoryId } = useParams();
    const existPrompt = useParams().existPrompt;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const [userName, setUserName] = useState("");
    const promptForsend = useSelector(state => state.prompts.PromptForSend);
    const category = useSelector(state => state.categories.categoriesById[categoryId]);
    const subCategory = useSelector(state => state.categories.subCategoriesById[subCategoryId]);

    useEffect(() => {
        dispatch(resetPromptForSend());
        const fetchDataSequentially = async () => {
            try {
                const userResult = await dispatch(getUserById(name));
                if (getUserById.fulfilled.match(userResult)) {
                    setUserName(userResult.payload.name);
                } else {
                    console.error("Failed to fetch user");
                }
                await dispatch(getCategoryById(categoryId));
                await dispatch(getSubCategoryById(subCategoryId));

            } catch (error) {
                console.error("An error occurred during sequential fetch:", error);
            }
        };

        fetchDataSequentially();
    }, [dispatch, name, categoryId, subCategoryId]);

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            navigate(`/SubCategory/${categoryId}/${subCategoryId}/${name}`);
            const promptToSend = existPrompt ? existPrompt : question;
            const resultAction = await dispatch(AddPromptData({ userId: name, categoryId: categoryId, subCategoryId: subCategoryId, prompt: promptToSend }));

            if (AddPromptData.fulfilled.match(resultAction)) {
                console.log(resultAction.payload);
            } else {
                console.log("error");
            }
            setQuestion('');
        };
    }

    return (
        <div className="subcategory-page-root">
            <Button
                className="user-display-button"
                variant="outlined"
                startIcon={<AccountCircleIcon />}
                disabled
            >
                {userName}
            </Button>

            <div className="content-container">
                <h1 className="main-title">{category?.name}</h1>
                <h2 className="page-subtitle">{subCategory?.name}</h2>

                <TextField
                    className="prompt-input"
                    value={existPrompt ? existPrompt : question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask your question here..."
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                />

                <Box className="response-box">
                    {existPrompt ? null : promptForsend}
                </Box>
            </div>
        </div>
    );
};

export default SubCategory;