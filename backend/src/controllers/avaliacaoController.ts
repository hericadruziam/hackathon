// src/controllers/avaliacaoController.ts
import { Request, Response } from 'express';
import { AvaliacaoModel } from '../models/AvaliacaoModel';

const avaliacaoModel = new AvaliacaoModel();

class AvaliacaoController {
  async createAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacao = await avaliacaoModel.create(req.body);
      return res.status(201).json(avaliacao);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating avaliacao' });
    }
  }

  async updateAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacao = await avaliacaoModel.update(Number(req.params.id), req.body.notas);
      return res.status(200).json(avaliacao);
    } catch (error) {
      return res.status(500).json({ error: 'Error updating avaliacao' });
    }
  }

  async getAvaliacoes(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacoes = await avaliacaoModel.findAll();
      return res.status(200).json(avaliacoes);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching avaliacoes' });
    }
  }

  async getAvaliacoesByAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacoes = await avaliacaoModel.findByAvaliadorId(Number(req.params.avaliador_id));
      return res.status(200).json(avaliacoes);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching avaliacoes by avaliador' });
    }
  }

  async getAvaliacoesByEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacoes = await avaliacaoModel.findByEquipeId(Number(req.params.equipe_id));
      return res.status(200).json(avaliacoes);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching avaliacoes by equipe' });
    }
  }
}

export default new AvaliacaoController();
