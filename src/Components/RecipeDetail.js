import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/RecipeDetail.css';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [newComment, setNewComment] = useState({ comment: '' });
  const { id } = useParams();
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Recipe/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment({
      ...newComment,
      [name]: value
    });
  };

  const submitComment = async () => {
    try {
      const commentData = { ...newComment, user: user.username };
      const response = await axios.post(`http://localhost:5000/api/Recipe/${id}/comments`, commentData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setRecipe(response.data);
      setNewComment({ comment: ''});
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!recipe) {
    return <p>Cargando receta...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>{recipe.name}</h2>
      <div className="img-container">
        <img src={recipe.image && recipe.image.secure_url} alt={recipe.name} className="img-fluid" />
      </div>
      <p>{recipe.instructions}</p>
      <p>Ingredientes: {recipe.ingredients.join(', ')}</p>
      <p>Tiempo de Preparación: {recipe.preparationTime} mins</p>
      <p>Calorías: {recipe.calories}</p>
      <div className="comments-container mt-5">
        <h3>Comentarios:</h3>
        {recipe.comments && recipe.comments.map(comment => (
          <div key={comment._id} className="comment mb-2">
            <p><strong>{comment.user}</strong> ({comment.rating}/5): {comment.comment}</p>
          </div>
        ))}
        {isAuthenticated ? (
          <div className="comment-form mt-4">
            <h4>Agregar comentario:</h4>
            <textarea
              name="comment"
              placeholder="Comentario"
              value={newComment.comment}
              onChange={handleCommentChange}
              className="form-control mb-2"
            />
            <button onClick={submitComment} className="btn btn-primary">Enviar</button>
          </div>
        ) : (
          <p>Debes iniciar sesión para agregar un comentario.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;