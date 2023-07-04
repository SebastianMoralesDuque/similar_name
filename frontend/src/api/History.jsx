import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabla from '../components/Table';

const ObtenerResultados = ({ id }) => {
  const [resultados, setResultados] = useState(null);
  const [noHistorial, setNoHistorial] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/data/obtener-resultados/${id}/`);
        const data = response.data;
        data.resultados = JSON.parse(data.resultados);
        setResultados(data);
        setNoHistorial(false); // Se encontraron resultados
      } catch (error) {
        console.error('Error:', error);
        setResultados(null);

        setTimeout(() => {
          setNoHistorial(true); 
        }, 1000);
      }
    };

    if (id && id.trim() !== '') {
      fetchData();
    } else {
      setResultados(null);
      setNoHistorial(false);
    }
  }, [id]);

  if (noHistorial) {
    return <p>No existe historial con el ID: {id}</p>;
  }

  return resultados ? (
    <div className="flex flex-col items-center">
      <div className="my-4">
        <p className="text-lg">Nombre buscado: {resultados.nombre}</p>
        <p className="text-lg">Porcentaje buscado: {resultados.porcentaje}</p>
        <p className="text-lg">Registros: {resultados.estado}</p>
      </div>
      <Tabla resultados={resultados.resultados} />
    </div>
  ) : null;
};

export default ObtenerResultados;
