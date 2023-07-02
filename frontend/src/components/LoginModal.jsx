import React, { useRef, useEffect } from 'react';

const LoginModal = ({ handleLoginSubmit, handleModalClose }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none bg-gray-200 bg-opacity-75">
      <div ref={modalRef} className="bg-white p-6 rounded shadow-lg pointer-events-auto">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLoginSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border border-gray-300 px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
        <button onClick={handleModalClose} className="mt-4 text-gray-600 hover:text-gray-800">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
