import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Recipes from './Components/Recipes';
import './App.css';
import './Components/Login';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='Recipes' element={<Recipes /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;