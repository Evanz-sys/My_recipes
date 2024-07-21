import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Recipes.css';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/Recipe');
                console.log('Data fetched:', response.data);
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                {recipes.length === 0 && <p>No recipes found.</p>}
                {recipes.map(recipe => (
                    <div className="col-md-4 mb-4" key={recipe._id}>
                        <div className="card h-100">
                            <Link to={`/Recipe/${recipe._id}`}>
                                <img 
                                    src={recipe.image && recipe.image.secure_url} 
                                    className="card-img-top" 
                                    alt={recipe.name} 
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.name}</h5>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipes;