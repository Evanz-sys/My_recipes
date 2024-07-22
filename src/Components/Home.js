import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import "../css/Home.css";

const Home = () => {
  const recipes = [
    { id: 1, title: "Tortilla de Espinacas y Champiñones", description: " Es una opción perfecta para el desayuno, el almuerzo o la cena, proporcionando una buena dosis de proteínas y vegetales en cada bocado.", img: "/img/tortita.png" },
    { id: 2, title: "Ensalada de Pollo y Aguacate", description: "Esta ensalada es ideal para una comida ligera, llena de proteínas y grasas saludables, y perfecta para disfrutar en cualquier época del año.", img: "/img/ensalada.png" },
    { id: 3, title: "Pollo al Curry con Arroz de Coliflor", description: "Este plato es bajo en carbohidratos y lleno de sabor, ofreciendo una opción nutritiva y deliciosa para una comida principal.", img: "/img/pollo.png" },
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
              src={process.env.PUBLIC_URL + recipe.img}
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