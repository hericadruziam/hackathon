"use client";

import React, { useState } from 'react';
import api from '../../services/api';

export default function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await api.post('/login', { login, senha });

      localStorage.setItem('loggedInAvaliador', 'true');

      // Redirecionamento usando a href
      window.location.href = '/'; // Redireciona para a página inicial
    } catch (error) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 block w-full"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 block w-full"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
