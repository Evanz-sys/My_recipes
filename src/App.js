import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Recipes from './Components/Recipes';
import './App.css';
import Login from './Components/Login';
import Shared from './Components/Shared';
import Profile from './Components/Profile';
import RecipeDetail from './Components/RecipeDetail';

const App = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get('https://recipe-api-4kqf.onrender.com/api');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <div className="container"> 
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Recipe" element={<Recipes />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/Shared" element={<Shared />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path="/Recipe/:id" element={<RecipeDetail />} />
          </Routes>
          <div className="data-container">
            {data && <div>{data}</div>}
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
