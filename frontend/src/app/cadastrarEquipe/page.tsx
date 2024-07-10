"use client";

import React, { useState } from 'react';
import api from '../../services/api';

const CadastrarEquipe: React.FC = () => {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/equipes', { nome });
      alert('Equipe cadastrada com sucesso!');
      setNome('');
    } catch (error) {
      console.error('Error creating equipe', error);
      alert('Erro ao cadastrar equipe');
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Cadastrar Equipe</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastrarEquipe;
