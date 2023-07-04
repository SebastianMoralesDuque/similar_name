import React, { useState } from 'react';
import { sendData } from '../api/Data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabla from './Table';
import { CSVLink } from 'react-csv';

const Formulario = ({ token }) => {
  const [name, setName] = useState('');
  const [percentage, setPercentage] = useState('');
  const [resultados, setResultados] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error('Log in first', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    if (!name || !percentage) {
      toast.error('Please fill in all the fields', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    try {
      const response = await sendData(name, percentage, token);
      setResultados(response);
      setExportData(response);
      setHasSearched(true);
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
          {resultados.length > 0 && (
            <CSVLink
              data={exportData}
              filename="resultados.csv"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-4 md:mt-0 md:ml-2"
            >
              Exportar
            </CSVLink>
          )}
        </div>
      </form>

      {/* Tabla de resultados */}
      {hasSearched && resultados.length > 0 ? (
        <div className="mt-4">
          <Tabla resultados={resultados} />
        </div>
      ) : hasSearched && resultados.length === 0 ? (
        <p className="mt-4 text-gray-700">Sin resultados</p>
      ) : null}

      <ToastContainer />
    </div>
  );
};

export default Formulario;
