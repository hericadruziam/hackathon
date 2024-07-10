"use client";

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Link from "next/link";

interface Equipe {
  id: number;
  nome: string;
}

const ListarEquipes: React.FC = () => {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEquipes = async () => {
      try {
        const response = await api.get('/equipes');
        setEquipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching equipes', error);
      }
    };

    fetchEquipes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/equipes/${id}`);
      setEquipes(equipes.filter(equipe => equipe.id !== id));
    } catch (error) {
      console.error('Error deleting equipe', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Equipes</h1>
      <div className="flex justify-end">
        <Link className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer bg-gray-800 p-2 " href="/cadastrarEquipe">
          Cadastrar Equipe
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {equipes.map(equipe => (
          <div key={equipe.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{equipe.nome}</h2>
            <button
              onClick={() => handleDelete(equipe.id)}
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

export default ListarEquipes;