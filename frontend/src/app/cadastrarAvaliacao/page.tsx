"use client";

import React, { useState, useEffect } from 'react';
import api from '../../services/api';

interface Equipe {
  id: number;
  nome: string;
}

const CadastrarAvaliacao: React.FC = () => {
  const [equipes, setEquipes] = useState<Equipe[]>([]);

  useEffect(() => {
    const fetchEquipes = async () => {
      try {
        const response = await api.get('/equipes');
        setEquipes(response.data);
      } catch (error) {
        console.error('Erro ao buscar equipes:', error);
        alert('Erro ao buscar equipes.');
      }
    };

    fetchEquipes();
  }, []);

  const handleSubmit = async (e: React.FormEvent, equipeId: number) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const avaliacao = {
      originalidade: Number(formData.get('originalidade')),
      impacto: Number(formData.get('impacto')),
      execucao: Number(formData.get('execucao')),
      apresentacao: Number(formData.get('apresentacao')),
      viabilidade: Number(formData.get('viabilidade')),
    };

    try {
      await api.post(`/avaliacoes/${equipeId}`, avaliacao);
      alert('Avaliação enviada com sucesso!');
      window.location.reload(); // Recarrega a página após enviar avaliação
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      alert('Erro ao enviar avaliação.');
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Atribuir Nota</h1>
      {equipes.length === 0 ? (
        <p className="text-center">Nenhuma equipe atribuída para avaliação.</p>
      ) : (
        <div className="space-y-8">
          {equipes.map((equipe) => (
            <div key={equipe.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">{equipe.nome}</h2>
              <form onSubmit={(e) => handleSubmit(e, equipe.id)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Originalidade do Projeto</label>
                    <input
                      type="number"
                      name="originalidade"
                      min="0"
                      max="10"
                      className="border border-gray-300 text-black rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Impacto Potencial</label>
                    <input
                      type="number"
                      name="impacto"
                      min="0"
                      max="10"
                      className="border border-gray-300 text-black rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Execução Técnica</label>
                    <input
                      type="number"
                      name="execucao"
                      min="0"
                      max="10"
                      className="border border-gray-300 text-black rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Apresentação e Demonstração</label>
                    <input
                      type="number"
                      name="apresentacao"
                      min="0"
                      max="10"
                      className="border border-gray-300 text-black rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Viabilidade e Sustentabilidade</label>
                    <input
                      type="number"
                      name="viabilidade"
                      min="0"
                      max="10"
                      className="border border-gray-300 text-black rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Enviar Avaliação
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CadastrarAvaliacao;
