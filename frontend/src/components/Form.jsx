import React, { useState } from 'react';
import { sendData } from '../api/Data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabla from './Table';

const Formulario = ({ token }) => {
  const [name, setName] = useState('');
  const [percentage, setPercentage] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error('Debes iniciar sesión antes de enviar los datos', {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    if (!name || !percentage) {
      toast.error('Por favor, completa todos los campos', {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    try {
      const response = await sendData(name, percentage, token);
      setResultados(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Formulario */}
      <form
        className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="text-gray-700">
          Nombres y Apellidos:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nombres y Apellidos"
          className="border border-gray-300 px-4 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="percentage" className="text-gray-700">
          Porcentaje de coincidencia:
        </label>
        <input
          type="number"
          id="percentage"
          name="percentage"
          min="1"
          max="100"
          placeholder="Porcentaje de coincidencia"
          className="border border-gray-300 px-4 py-2 rounded"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <div className="flex flex-col md:flex-row">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Buscar
          </button>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-4 md:mt-0 md:ml-2"
          >
            Exportar
          </button>
        </div>
      </form>

      {/* Tabla de resultados */}
      {resultados.length > 0 ? (
        <div className="mt-4">
          <Tabla resultados={resultados} />
        </div>
      ) : (
        <p className="mt-4 text-gray-700">Sin resultados</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default Formulario;
