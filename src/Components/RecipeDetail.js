import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeDetail = ({ match }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Recipe/${match.params.id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [match.params.id]);

  if (!recipe) {
    return <p>Cargando receta...</p>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <img src={recipe.image} alt={recipe.name} />
      <p>{recipe.instructions}</p>
      <p>Ingredientes: {recipe.ingredients.join(', ')}</p>
      <p>Tiempo de Preparación: {recipe.preparationTime} mins</p>
      <p>Calorías: {recipe.calories}</p>
      <h3>Comentarios:</h3>
      {recipe.comments && recipe.comments.map(comment => (
        <div key={comment._id}>
          <p><strong>{comment.user}</strong> ({comment.rating}/5): {comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeDetail;
