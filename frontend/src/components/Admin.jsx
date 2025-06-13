import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { getAllPromptsByPaging, getCategoryById, getSubCategoryById, getUserById } from "../redux/thunk"; // ודאי שה-thunk נקרא getAllPrompts
import '../components/css_files/Admin.css';
import Avatar from '@mui/material/Avatar';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const Admin = () => {
    const allPrompt = useSelector(state => state.prompts.promptsWithPaging); 
    const categoriesById = useSelector(state => state.categories.categoriesById || {});
    const subCategoriesById = useSelector(state => state.categories.subCategoriesById || {});
    const usersById = useSelector(state => state.users.usersById || {});
    const dispatch = useDispatch();
    const [promptPage, setPromptPage] = useState(1);
    const [promptFilter, setPromptFilter] = useState('');

    useEffect(() => {
        dispatch(getAllPromptsByPaging({ page: promptPage, filter: promptFilter }));
  }, [dispatch, promptPage, promptFilter]); 

     useEffect(() => {
        if (!allPrompt || allPrompt.length === 0) return;

        const fetchAll = async () => {
            const categoryIds = [...new Set(allPrompt.map(p => p.categoryId))];
            const subCategoryIds = [...new Set(allPrompt.map(p => p.subCategoryId))];
            const userIds = [...new Set(allPrompt.map(p => p.userId))];

            for (const id of categoryIds) {
                if (!categoriesById[id]) {
                    await dispatch(getCategoryById(id));
                }
            }
            for (const id of subCategoryIds) {
                if (!subCategoriesById[id]) {
                    await dispatch(getSubCategoryById(id));
                }
            }
            for (const id of userIds) {
                if (!usersById[id]) {
                    await dispatch(getUserById(id));
                }
            }
        };

        fetchAll();
    }, [allPrompt, dispatch]);

    return (
        <div className="invitationContainer">
            <Avatar className="admin-avatar">
                <AdminPanelSettingsIcon className="admin-icon" />
            </Avatar>
            <Typography variant="h4" className="admin-title" gutterBottom>
                Admin Dashboard
            </Typography>
            <Paper elevation={0} className="admin-paper">
                <div className="controls-container" style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
                    <input 
                        type="text"
                        placeholder="Search in prompts..."
                        value={promptFilter}
                        onChange={(e) => {
                            setPromptFilter(e.target.value);
                            setPromptPage(1); 
                        }}
                        style={{ marginRight: '20px', padding: '8px' }}
                    />
                    <button onClick={() => setPromptPage(p => p - 1)} disabled={promptPage === 1}>
                        Previous
                    </button>
                    <span style={{ margin: '0 15px' }}>Page: {promptPage}</span>
                    <button onClick={() => setPromptPage(p => p + 1)} disabled={!allPrompt || allPrompt.length < 9}>
                        Next
                    </button>
                </div>

                {allPrompt && allPrompt.length > 0 ? (
                    allPrompt.map((prompt) => (
                        <div key={prompt.id} className="invitation-card">
                            <div className="invitation-detail">
                                <h3>
                                    user: {usersById[prompt.userId]?.name}
                                </h3>
                                <h3>
                                    Category: {categoriesById[prompt.categoryId]?.name || prompt.categoryId}
                                </h3>
                                <h3>
                                    Sub Category: {subCategoriesById[prompt.subCategoryId]?.name || prompt.subCategoryId}
                                </h3>
                                <h3>{prompt.prompt1}</h3>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading prompts or no results found...</p>
                )}
            </Paper>
        </div>
    );
};

export default Admin;