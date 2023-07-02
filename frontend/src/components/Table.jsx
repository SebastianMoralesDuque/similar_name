import React from 'react';

const Tabla = ({ resultados }) => {
  return (
    <div className="mt-4">
      <div className="container mx-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Tipo de Persona</th>
              <th className="py-2 px-4 border-b">Tipo de Cargo</th>
              <th className="py-2 px-4 border-b">Departamento</th>
              <th className="py-2 px-4 border-b">Municipio</th>
              <th className="py-2 px-4 border-b">Coincidencia</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((resultado, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{resultado.nombre}</td>
                <td className="py-2 px-4 border-b">{resultado.tipo_persona}</td>
                <td className="py-2 px-4 border-b">{resultado.tipo_cargo}</td>
                <td className="py-2 px-4 border-b">{resultado.departamento}</td>
                <td className="py-2 px-4 border-b">{resultado.municipio}</td>
                <td className="py-2 px-4 border-b">{resultado.coincidencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tabla;
