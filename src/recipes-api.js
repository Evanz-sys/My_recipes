import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const obtenerDatos = async () => {
    try {
        const response = await axios.get(`${API_URL}datos`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
    }
};

export const enviarDatos = async (datos) => {
    try {
        const response = await axios.post(`${API_URL}datos`, datos);
        return response.data;
    } catch (error) {
        console.error('Error al enviar datos:', error);
        throw error;
    }
};
