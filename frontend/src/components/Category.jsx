import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById, GetSubCategories, getUserById } from "../redux/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './css_files/Category.css'; 

const Category = () => {
    const { categoryId, name } = useParams();
    const dispatch = useDispatch();
    const subCategories = useSelector(state => state.categories.SubCategoriesList);
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResult = await dispatch(getUserById(name));
                if (getUserById.fulfilled.match(userResult)) {
                    setUserName(userResult.payload.name);
                }

                const categoryResult = await dispatch(getCategoryById(categoryId));
                if (getCategoryById.fulfilled.match(categoryResult)) {
                    setCategoryName(categoryResult.payload.name);
                }

                await dispatch(GetSubCategories(categoryId));

            } catch (error) {
                console.error("An error occurred while fetching data:", error);
            }
        };

        fetchData();
    }, [dispatch, name, categoryId]);

    const handleSubCategory = (subCategory) => {
        navigate(`/SubCategory/${categoryId}/${subCategory.id}/${name}`);
    };

    function findById(data, id) {
        if (data.$id === id) return data;
        if (data.$ref === id) return data;
        if (data.$values) {
            for (let item of data.$values) {
                const result = findById(item, id);
                if (result) return result;
            }
        }
        return null;
    }

    return (
        <div className="category-page-root">
            <Button
                className="user-display-button"
                variant="outlined"
                startIcon={<AccountCircleIcon />}
                disabled
            >
                {userName}
            </Button>
            
            <h1 className="main-title">{categoryName}</h1>
            <h3 className="page-subtitle">please choose your interesting area</h3>
            
            <div className="subcategory-container">
                {subCategories?.$values?.length > 0 ? (
                    subCategories.$values.map((subCat) => {
                        const subCategoryData = subCat.hasOwnProperty('$ref')
                            ? findById(subCategories, subCat.$ref)
                            : subCat;
                        if (!subCategoryData) return null;

                        return (
                            <div key={subCategoryData.id} className="subcategory-card">
                                <h3 className="card-title">{subCategoryData.name}</h3>
                                <button className="action-button" onClick={() => handleSubCategory(subCategoryData)}>
                                    insert into--
                                </button>
                            </div>
                        )
                    })
                ) : (
                    <p>Loading sub-categories...</p>
                )}
            </div>
        </div>
    );
};

export default Category;