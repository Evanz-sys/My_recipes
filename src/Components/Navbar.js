import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={process.env.PUBLIC_URL + "/MISED.png"} alt="Logo" height="70" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/recipes" className="nav-link">Recetas</Link>
            </li>
            <li className="nav-item">
              <Link to="/Share" className="nav-link">Compartir Recetas</Link>
            </li>
            <li className="nav-item">
              <Link to="/Share" className="nav-link">iniciar sesion</Link>
            </li>
          </ul>
        </div>
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Buscar" />
          <button className="btn btn-outline-success" type="submit">Buscar</button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
