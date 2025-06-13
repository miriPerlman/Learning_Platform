import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCategories, getPromptsUserById, getUserById } from "../redux/thunk";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button'; 
import '../components/css_files/PersonalAre.css'; 

const PersonalArea = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const CategoryList = useSelector(state => state.categories.CategoriesList);
    const [openPopup, setOpenPopup] = useState(false);
    const [prompts, setPrompts] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const resultUserName = await dispatch(getUserById(name));
                if (getUserById.fulfilled.match(resultUserName)) {
                    setUserName(resultUserName.payload.name);
                } else {
                    setUserName("");
                }
            } catch (error) {
                setUserName("");
            }
            await dispatch(GetAllCategories());
        };
        fetchAll();
    }, [dispatch, name]);

    const handlePromptHistory = async () => {
        const resultAction = await dispatch(getPromptsUserById(name));
        if (getPromptsUserById.fulfilled.match(resultAction)) {
            setPrompts(resultAction.payload);
        } else {
            setPrompts([]);
        }
        setOpenPopup(true);
    };

    const handleCategory = (category) => {
        navigate(`/Category/${category.id}/${name}`);
    };

    const handleResponse = (categoryName, subCategoryName, existPrompt) => {
        navigate(`/SubCategory/${categoryName}/${subCategoryName}/${name}/${existPrompt}`);
    };

    return (
        <div className="personal-area-root">
            <Button
                className="user-display-button"
                variant="outlined"
                startIcon={<AccountCircleIcon />}
                disabled
            >
                {userName}
            </Button>
            
            <h1 className="welcome-title">Welcome, {userName}!</h1>
            <button className="history-button" onClick={handlePromptHistory}>
                to see your prompt history
            </button>
            
            <p className="section-title">please choose your chosen category:</p>
            
            <div className="category-container">
                {CategoryList.length > 0 ? (
                    CategoryList.map((category) => (
                        <div key={category.id} className="category-card">
                            <h3 className="card-title">{category.name}</h3>
                            <button className="insert-button" onClick={() => handleCategory(category)}>
                                insert into--
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Loading categories...</p>
                )}
            </div>
            
            {openPopup && (
                <>
                    <div className="popup-overlay" onClick={() => setOpenPopup(false)} />
                    <div className="popup">
                        <h2 className="popup-title">Your Prompt History</h2>
                        <div className="prompt-container">
                            {prompts.length > 0 ? prompts.map((prompt) => (
                                <div key={prompt.id} className="prompt-card">
                                    <button className="prompt-link" onClick={() => handleResponse(prompt.categoryId, prompt.subCategoryId, prompt.prompt1)}>
                                        {prompt.prompt1}
                                    </button>
                                </div>
                            )) : <p>No prompts found.</p>}
                        </div>
                        <button className="close-button" onClick={() => setOpenPopup(false)}>
                            Close
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PersonalArea;