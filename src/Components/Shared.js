import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Shared = () => {
    const [recipe, setRecipe] = useState({
        name: '',
        image: '',
        ingredients: '',
        instructions: '',
        preparationTime: 0,
        calories: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({
            ...recipe,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/Recipe', recipe);
            alert('Recipe uploaded successfully!');
            console.log('Recipe uploaded successfully:', response.data);
            setRecipe({
                name: '',
                image: '',
                ingredients: '',
                instructions: '',
                preparationTime: 0,
                calories: 0,
            });
        } catch (error) {
            alert('Error uploading recipe: ' + error.message);
            console.error('Error uploading recipe:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Compartir Receta</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre:</label>
                    <input type="text" className="form-control" id="name" name="name" value={recipe.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">URL de la Imagen:</label>
                    <input type="text" className="form-control" id="image" name="image" value={recipe.image} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="ingredients" className="form-label">Ingredientes (Separa con una "," los ingredientes):</label>
                    <input type="text" className="form-control" id="ingredients" name="ingredients" value={recipe.ingredients} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="instructions" className="form-label">Instrucciones:</label>
                    <textarea className="form-control" id="instructions" name="instructions" value={recipe.instructions} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="preparationTime" className="form-label">Tiempo de Preparación (minutes):</label>
                    <input type="number" className="form-control" id="preparationTime" name="preparationTime" value={recipe.preparationTime} onChange={handleChange} min="0" />
                </div>
                <div className="mb-3">
                    <label htmlFor="calories" className="form-label">Calorías:</label>
                    <input type="number" className="form-control" id="calories" name="calories" value={recipe.calories} onChange={handleChange} min="0" required />
                </div>
                <button type="submit" className="btn btn-primary">Compartir Receta</button>
            </form>
        </div>
    );
};

export default Shared;
