import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../css/Profiler.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = ({ userId }) => {
    const [userRecipes, setUserRecipes] = useState([]);
    const [editRecipe, setEditRecipe] = useState(null);

    useEffect(() => {
        console.log('Fetching recipes for user:', userId); // Verifica el userId
        const fetchUserRecipes = async () => {
            if (!userId) {
                console.error('No userId found');
                return;
            }
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.get(`https://recipe-api-4kqf.onrender.com/api/Recipe/user/${userId}/recipes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('User recipes fetched:', response.data);
                setUserRecipes(response.data);
            } catch (error) {
                console.error('Error fetching user recipes:', error);
            }
        };

        fetchUserRecipes();
    }, [userId]);

    const handleEditRecipe = (recipe) => {
        setEditRecipe(recipe);
    };

    const handleUpdateRecipe = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`https://recipe-api-4kqf.onrender.com/api/Recipe/user/${userId}/recipes/${editRecipe._id}`, editRecipe, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Recipe updated:', response.data);
            setUserRecipes(userRecipes.map(recipe => recipe._id === editRecipe._id ? response.data : recipe));
            setEditRecipe(null);
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditRecipe({ ...editRecipe, [name]: value });
    };

    const handleDeleteRecipe = async (_id) => {
        if (window.confirm("¿Estás seguro de eliminar esta receta?")) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`https://recipe-api-4kqf.onrender.com/api/Recipe/user/${userId}/recipes/${_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Recipe deleted:', response.data);
                setUserRecipes(userRecipes.filter(recipe => recipe._id !== _id));
            } catch (error) {
                console.error('Error deleting recipe:', error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Profile</h2>
            <div className="user-recipes">
                {userRecipes.length === 0 && <p>No recipes shared yet.</p>}
                {userRecipes.map(recipe => (
                    <div className="card mb-3" key={recipe._id}>
                        <div className="card-body">
                            <h5 className="card-title">{recipe.name}</h5>
                            <p className="card-text">{recipe.instructions}</p>
                            <p className="card-text">Ingredients: {recipe.ingredients.join(', ')}</p>
                            <p className="card-text">Preparation Time: {recipe.preparationTime} mins</p>
                            <p className="card-text">Calories: {recipe.calories}</p>
                            <button className="btn btn-primary mr-2" onClick={() => handleEditRecipe(recipe)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {editRecipe && (
                <div className="edit-recipe-form">
                    <h3>Edit Recipe</h3>
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" value={editRecipe.name || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Instructions</label>
                            <textarea className="form-control" name="instructions" value={editRecipe.instructions || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Ingredients</label>
                            <input type="text" className="form-control" name="ingredients" value={editRecipe.ingredients ? editRecipe.ingredients.join(', ') : ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Preparation Time (mins)</label>
                            <input type="number" className="form-control" name="preparationTime" value={editRecipe.preparationTime || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Calories</label>
                            <input type="number" className="form-control" name="calories" value={editRecipe.calories || ''} onChange={handleChange} />
                        </div>
                        <button type="button" className="btn btn-success" onClick={handleUpdateRecipe}>Update</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setEditRecipe(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Profile;