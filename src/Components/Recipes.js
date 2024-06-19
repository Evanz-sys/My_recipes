import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Recipes.css';

const Recipes = () => {
    const recipes = [
        { id: 1, title: "Receta 1", description: "Descripción de la receta 1", image: "public/r1.png" },
        { id: 2, title: "Receta 2", description: "Descripción de la receta 2", image: "public/r1.png" },
        { id: 3, title: "Receta 3", description: "Descripción de la receta 3", image: "public/r1.png" },
        { id: 3, title: "Receta 3", description: "Descripción de la receta 3", image: "public/r1.png" },
        { id: 3, title: "Receta 3", description: "Descripción de la receta 3", image: "public/r1.png" },
        { id: 3, title: "Receta 3", description: "Descripción de la receta 3", image: "public/r1.png" },
        { id: 3, title: "Receta 3", description: "Descripción de la receta 3", image: "public/r1.png" },

    ];

    return (
        <div className="container mt-5">
            <div className="row">
                {recipes.map(recipe => (
                    <div className="col-md-4 mb-4" key={recipe.id}>
                        <div className="card h-100">
                            <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                            <div className="card-body">
                                <h5 className="card-title">{recipe.title}</h5>
                                <p className="card-text">{recipe.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipes;
