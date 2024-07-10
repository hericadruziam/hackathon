"use client";

import React, { useEffect, useState } from 'react';
import api from '../services/api';

const HomePage: React.FC = () => {
  const [totalAvaliadores, setTotalAvaliadores] = useState<number>(0);
  const [totalEquipes, setTotalEquipes] = useState<number>(0);
  const [totalNotas, setTotalNotas] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const avaliadoresRes = await api.get('/avaliadores');
        const equipesRes = await api.get('/equipes');
        const avaliacoesRes = await api.get('/avaliacoes');

        setTotalAvaliadores(avaliadoresRes.data.length);
        setTotalEquipes(equipesRes.data.length);
        setTotalNotas(avaliacoesRes.data.length);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Avaliadores</h2>
          <p className="text-4xl">{totalAvaliadores}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Equipes</h2>
          <p className="text-4xl">{totalEquipes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Notas</h2>
          <p className="text-4xl">{totalNotas}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;