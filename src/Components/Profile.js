import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../css/Profile.css'; // Asegúrate de tener estilos CSS para tu perfil

const Profile = ({ userId }) => {
    const [userRecipes, setUserRecipes] = useState([]);

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/Recipe/user/${userId}/recipes`);
                console.log('User recipes fetched:', response.data);
                setUserRecipes(response.data);
            } catch (error) {
                console.error('Error fetching user recipes:', error);
            }
        };

        fetchUserRecipes();
    }, [userId]);

    const handleEditRecipe = async (recipeId) => {
        // Implementa la lógica para editar una receta
        // Puedes redirigir a una página de edición de receta o mostrar un formulario en este componente
    };

    const handleDeleteRecipe = async (recipeId) => {
        if (window.confirm("¿Estás seguro de eliminar esta receta?")) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/Recipe/user/${userId}/recipes/${recipeId}`);
                console.log('Recipe deleted:', response.data);
                setUserRecipes(userRecipes.filter(recipe => recipe._id !== recipeId));
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
                            <button className="btn btn-primary mr-2" onClick={() => handleEditRecipe(recipe._id)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;