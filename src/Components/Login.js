import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let endpoint = isRegistering ? '/api/register' : '/api/login';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log('Token JWT:', data.token);
      setError(null);

    } catch (error) {
      setError(error.message);
    }
  };

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
    setError(null);
    if (!isRegistering) {
      setName('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles['card-title']}>{isRegistering ? 'Registro de Cuenta' : 'Inicio de Sesión'}</h2>
        {error && <p className={styles['alert-danger']}>{error}</p>}
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div>
              <label className={styles['form-label']}>Nombre:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
          </div>
          <div>
            <label className={styles['form-label']}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
