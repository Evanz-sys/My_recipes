import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.js';
import styles from '../css/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let endpoint = isRegistering ? '/api/register' : '/api/login';
      const body = isRegistering ? { username, email, password } : { email, password };
      const response = await fetch(`https://recipe-api-4kqf.onrender.com${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      login({ username: data.username, token: data.token });
      console.log('Token:', localStorage.getItem('token')); // Verifica que el token se recupera correctamente
      setError(null);
      setSuccess('Operación exitosa');
      navigate('/'); 
      
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
    setError(null);
    setSuccess(null);
    setEmail('');
    setPassword('');
    setUsername('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles['card-title']}>{isRegistering ? 'Registro de Cuenta' : 'Inicio de Sesión'}</h2>
        {error && <p className={styles['alert-danger']}>{error}</p>}
        {success && <p className={styles['alert-success']}>{success}</p>}
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div>
              <label className={styles['form-label']}>Nombre:</label>
              <input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <i class='bx bx-user-circle'></i>
            </div>
          )}
          <div>
            <label className={styles['form-label']}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i class='bx bx-envelope'></i>
          </div>
          <div>
            <label className={styles['form-label']}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i class='bx bxs-lock'></i>
          </div>
          <button type="submit" className={styles['btn-primary']}>{isRegistering ? 'Registrar' : 'Iniciar Sesión'}</button>
        </form>
        <p>
          {isRegistering
            ? '¿Ya tienes una cuenta?'
            : '¿No tienes una cuenta?'}
          {' '}
          <Link to="#" className={styles['link-primary']} onClick={handleToggleForm}>
            {isRegistering ? 'Iniciar Sesión' : 'Registrarse'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
