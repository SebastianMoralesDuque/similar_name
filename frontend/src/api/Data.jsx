import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const sendData = async (name, percentage, token) => {
  try {
    const response = await axios.post(
      `${backendURL}/data/buscar-datos/`,
      { name, percentage },
      {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      }
    );

    console.log(response.data);
    return response.data; // Retorna la respuesta JSON
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { sendData };
