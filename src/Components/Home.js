import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import "../css/Home.css";

const Home = () => {
  const recipes = [
    { id: 1, title: "Max", description: "Descripción de la receta 1", image: "" },
    { id: 2, title: "Samu", description: "Descripción de la receta 2", image: "" },
    { id: 3, title: "Dani", description: "Descripción de la receta 3", image: "" },
  ];

  return (
    <div className="container mt-5">
      <div className="background-container">
      <img src={process.env.PUBLIC_URL + "/HomePage.jpg"} alt="Background" className="background-image" />
      <div className="background-content">
          <h1>Cocina de Mercado</h1>
        </div>
      </div>
      
      <p>¡Guarda tus recetas favoritas y compartelas!.</p>

      <Carousel>
        {recipes.map(recipe => (
          <Carousel.Item key={recipe.id}>
            <img
              className="d-block w-100"
              src={recipe.image}
              alt={recipe.title}
            />
            <Carousel.Caption>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
