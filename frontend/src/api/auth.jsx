import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const register = async (email, username, password) => {
  try {
    const response = await axios.post('http://localhost:8000/register/', {
      email,
      username,
      password,
    });

    const data = response.data;
    
    if (response.status === 201) {
      toast.success('Successful registration',{
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    
      console.log('Registro exitoso:', data.message);
    } else {
      let errorMessage = '';

      if (data.email && data.email.length > 0) {
        errorMessage = data.email[0];
      } else if (data.username && data.username.length > 0) {
        errorMessage = data.username[0];
      }

      toast.error(errorMessage,{
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.error('Error en el registro:', errorMessage);
    }
  } catch (error) {
    toast.error('Error: ' + error.message,{
      position: toast.POSITION.BOTTOM_RIGHT,
    });
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

    if (response.status >= 200 && response.status < 300) {
      toast.success('Successful login',{
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        user: data.username,
        accessToken: data.access,
        refreshToken: data.refresh,
      };
    } else {
      const errorMessage = data.error ? 'Incorrect email or password' : 'Error in login';
      toast.error(errorMessage,{
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.error('Error in login:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    toast.error('Error: ' + 'Incorrect email or password',{
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.error('Error:', error);
    throw error;
  }
};


const refreshTokenFunc = async (refreshToken) => {
  try {
    const response = await axios.post('http://localhost:8000/token-refresh/', {
      refresh: refreshToken
    });

    const data = response.data;

    if (response.status >= 200 && response.status < 300) {
      return {
        access: data.access,
      };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { register, login, refreshTokenFunc };
