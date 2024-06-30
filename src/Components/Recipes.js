import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Recipes.css';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [newComment, setNewComment] = useState({ user: '', comment: '', rating: 0 });

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

    const handleCommentChange = (e) => {
        const { name, value } = e.target;
        setNewComment({
            ...newComment,
            [name]: value
        });
    };

    const submitComment = async (recipeId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/Recipe/${recipeId}/comments`, newComment);
            console.log('Comment added:', response.data);
            setRecipes(recipes.map(recipe => recipe._id === recipeId ? response.data : recipe));
            setNewComment({ user: '', comment: '', rating: 0 });
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {recipes.length === 0 && <p>No recipes found.</p>}
                {recipes.map(recipe => (
                    <div className="col-md-4 mb-4" key={recipe._id}>
                        <div className="card h-100">
                            <img src={recipe.image} className="card-img-top" alt={recipe.name} />
                            <div className="card-body">
                                <h5 className="card-title">{recipe.name}</h5>
                                <p className="card-text">{recipe.instructions}</p>
                                <p className="card-text">Ingredientes: {recipe.ingredients.join(', ')}</p>
                                <p className="card-text">Tiempo de Preparación: {recipe.preparationTime} mins</p>
                                <p className="card-text">Calorías: {recipe.calories}</p>
                                <h6>Comentarios:</h6>
                                {recipe.comments && recipe.comments.map(comment => (
                                    <div key={comment._id} className="comment mb-2">
                                        <p><strong>{comment.user}</strong> ({comment.rating}/5): {comment.comment}</p>
                                    </div>
                                ))}
                                <div className="comment-form">
                                    <h6>Agregar comentario:</h6>
                                    <input
                                        type="text"
                                        name="user"
                                        placeholder="Nombre"
                                        value={newComment.user}
                                        onChange={handleCommentChange}
                                        className="form-control mb-2"
                                    />
                                    <textarea
                                        name="comment"
                                        placeholder="Comentario"
                                        value={newComment.comment}
                                        onChange={handleCommentChange}
                                        className="form-control mb-2"
                                    />
                                    <button onClick={() => submitComment(recipe._id)} className="btn btn-primary">
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipes;
