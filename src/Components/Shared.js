import React, { useState } from 'react';
import axios from 'axios';
import styles from '../css/Shared.module.css';

const Shared = () => {
    const [Recipe, setRecipe] = useState({
        name: '',
        image: '',
        ingredients: '',
        instructions: '',
        preparationTime: 0,
        calories: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'file' ? e.target.files[0] : value;
        setRecipe({
            ...Recipe,
            [name]: newValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('name', Recipe.name);
            formData.append('image', Recipe.image);
            formData.append('ingredients', Recipe.ingredients.split(',').map(ingredient => ingredient.trim()));
            formData.append('instructions', Recipe.instructions);
            formData.append('preparationTime', Recipe.preparationTime);
            formData.append('calories', Recipe.calories);

            const Token = localStorage.getItem('token');
            if (!Token) {
                throw new Error('Token no encontrado');
            }

            const response = await axios.post('http://localhost:5000/api/Recipe', formData, {
                headers: {
                    'Authorization': `Bearer ${Token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            alert('¡Receta subida exitosamente!');
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
            setError('Error subiendo la receta: ' + error.message);
            console.error('Error uploading recipe:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Compartir Receta</h2>
            {error && <div className={`alert alert-danger ${styles.alert}`}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className={`mb-3 ${styles.mb3}`}>
                    <label htmlFor="name" className={`form-label ${styles.formLabel}`}>Nombre:</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="name" name="name" value={Recipe.name} onChange={handleChange} required />
                </div>
                <div className={`mb-3 ${styles.mb3}`}>
                    <label htmlFor="image" className={`form-label ${styles.formLabel}`}>Imagen:</label>
                    <input type="file" className={`form-control ${styles.formControl}`} id="image" name="image" onChange={handleChange} accept="image/*" required />
                </div>
                <div className={`mb-3 ${styles.mb3}`}>
                    <label htmlFor="ingredients" className={`form-label ${styles.formLabel}`}>Ingredientes (Separa con una "," los ingredientes):</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="ingredients" name="ingredients" value={Recipe.ingredients} onChange={handleChange} required />
                </div>
                <div className={`mb-3 ${styles.mb3}`}>
                    <label htmlFor="instructions" className={`form-label ${styles.formLabel}`}>Instrucciones:</label>
                    <textarea className={`form-control ${styles.formControl} ${styles.textarea}`} id="instructions" name="instructions" value={Recipe.instructions} onChange={handleChange} required />
                </div>
                <div className={`mb-3 ${styles.mb3}`}>
                    <label htmlFor="preparationTime" className={`form-label ${styles.formLabel}`}>Tiempo de Preparación (minutos):</label>
                    <input type="number" className={`form-control ${styles.formControl}`} id="preparationTime" name="preparationTime" value={Recipe.preparationTime} onChange={handleChange} min="0" />
                </div>
                <div className={`mb-3 ${styles.mb3}`}>
                    <label htmlFor="calories" className={`form-label ${styles.formLabel}`}>Calorías:</label>
                    <input type="number" className={`form-control ${styles.formControl}`} id="calories" name="calories" value={Recipe.calories} onChange={handleChange} min="0" required />
                </div>
                <button type="submit" className={`btn btn-primary ${styles.btnPrimary}`} disabled={loading}>
                    {loading ? 'Subiendo...' : 'Compartir Receta'}
                </button>
            </form>
        </div>
    );
};

export default Shared;