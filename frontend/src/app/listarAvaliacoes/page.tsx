"use client";

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Link from "next/link";

interface Avaliacao {
  id: number;
  avaliador_nome: string;
  equipe_nome: string;
  notas: {
    originalidade: number;
    impacto: number;
    execucao: number;
    apresentacao: number;
    viabilidade: number;
  };
}

const ListarAvaliacoes: React.FC = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterEquipe, setFilterEquipe] = useState<string>('');
  const [filterAvaliador, setFilterAvaliador] = useState<string>('');

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      const response = await api.get('/avaliacoes');
      setAvaliacoes(response.data);
      setLoading(false);
    };

    fetchAvaliacoes();
  }, []);

  const handleFilter = () => {
    setLoading(true);
    const filteredAvaliacoes = avaliacoes.filter(avaliacao => {
      return (
        (!filterEquipe || avaliacao.equipe_nome.includes(filterEquipe)) &&
        (!filterAvaliador || avaliacao.avaliador_nome.includes(filterAvaliador))
      );
    });
    setAvaliacoes(filteredAvaliacoes);
    setLoading(false);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Avaliações</h1>
      <div className="flex justify-end">
        <Link className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer bg-gray-800 p-2 " href="/cadastrarAvaliacao">
          Cadastrar Avaliação
        </Link>
      </div>
      <div className="flex mb-8 justify-center items-center">
        <input
          type="text"
          placeholder="Filtrar por equipe"
          value={filterEquipe}
          onChange={(e) => setFilterEquipe(e.target.value)}
          className="border border-gray-300 text-black rounded-md px-3 py-2 mr-2"
        />
        <input
          type="text"
          placeholder="Filtrar por avaliador"
          value={filterAvaliador}
          onChange={(e) => setFilterAvaliador(e.target.value)}
          className="border border-gray-300 text-black rounded-md px-3 py-2 mr-2"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Filtrar
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {avaliacoes.map(avaliacao => (
          <div key={avaliacao.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Equipe: {avaliacao.equipe_nome}</h2>
            <h3 className="text-lg mb-2">Avaliador: {avaliacao.avaliador_nome}</h3>
            <p>Originalidade: {avaliacao.notas.originalidade}</p>
            <p>Impacto: {avaliacao.notas.impacto}</p>
            <p>Execução: {avaliacao.notas.execucao}</p>
            <p>Apresentação: {avaliacao.notas.apresentacao}</p>
            <p>Viabilidade: {avaliacao.notas.viabilidade}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListarAvaliacoes;
