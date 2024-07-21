import React, { useEffect, useState } from 'react';
import { obtenerDatos } from './recipes-api'; 

const Api = () => {
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const datosApi = await obtenerDatos('/api/Recipe');
                setDatos(datosApi);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []); 

    return (
        <div>
            <h1>Datos de la API:</h1>
            <ul>
                {datos.map((dato) => (
                    <li key={dato.id}>{dato.nombre}</li>
                ))}
            </ul>
        </div>
    );
};

export default Api;
