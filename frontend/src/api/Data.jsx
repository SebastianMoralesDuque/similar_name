import axios from 'axios';

const sendData = async (name, percentage, token) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/data/buscar-datos/',
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
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};

export { sendData };
