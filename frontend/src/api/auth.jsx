import axios from 'axios';

const register = async (email, username, password) => {
  try {
    const response = await axios.post('http://localhost:8000/register/', {
      email,
      username,
      password,
    });

    const data = response.data;
    // Aquí puedes manejar la respuesta del registro

    // Si el registro es exitoso (código de estado 2xx), puedes realizar alguna acción adicional
    if (response.status >= 200 && response.status < 300) {
      // Realiza las acciones adicionales necesarias después del registro exitoso
      console.log('Registro exitoso:', data.message);
    } else {
      // Aquí puedes manejar el caso de error en el registro
      console.error('Error en el registro:', data.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8000/login/', {
      email,
      password,
    });

    const data = response.data;
    // Aquí puedes manejar la respuesta del inicio de sesión

    // Si el inicio de sesión es exitoso (código de estado 2xx), retorna los datos del usuario
    console.log(data.access);
    if (response.status >= 200 && response.status < 300) {
      return {
        user: data.username,
        accessToken: data.access,
        refreshToken: data.refresh,
      };
    } else {
      // Aquí puedes manejar el caso de error en el inicio de sesión
      console.error('Error en el inicio de sesión:', data.error);
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { register, login };
