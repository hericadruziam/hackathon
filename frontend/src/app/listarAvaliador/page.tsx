"use client";

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Link from "next/link";

interface Avaliador {
  id: number;
  nome: string;
  login: string;
}

const ListarAvaliadores: React.FC = () => {
  const [avaliadores, setAvaliadores] = useState<Avaliador[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAvaliadores = async () => {
      try {
        const response = await api.get('/avaliadores');
        setAvaliadores(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching avaliadores', error);
      }
    };

    fetchAvaliadores();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/avaliadores/${id}`);
      setAvaliadores(avaliadores.filter(avaliador => avaliador.id !== id));
    } catch (error) {
      console.error('Error deleting avaliador', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Avaliadores</h1>
      <div className="flex justify-end">
        <Link className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer bg-gray-800 p-2 " href="/cadastrarAvaliador">
          Cadastrar Avaliador
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {avaliadores.map(avaliador => (
          <div key={avaliador.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{avaliador.nome}</h2>
            <p className="mb-4">Login: {avaliador.login}</p>
            <button
              onClick={() => handleDelete(avaliador.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListarAvaliadores;