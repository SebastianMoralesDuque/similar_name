import React, { useState } from 'react';
import ObtenerResultados from '../api/History';

function HistoryForm() {
  const [inputId, setInputId] = useState('');

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
            Ingrese el ID a consultar:
          </label>
          <input
            type="text"
            id="id"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
        <div>
          <ObtenerResultados id={inputId} />
        </div>
    </div>
  );
}

export default HistoryForm;
