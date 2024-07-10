// src/controllers/equipeController.ts
import { Request, Response } from 'express';
import { EquipeModel } from '../models/EquipeModel';

const equipeModel = new EquipeModel();

class EquipeController {
  async createEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipe = await equipeModel.create(req.body);
      return res.status(201).json(equipe);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating equipe' });
    }
  }

  async getEquipes(req: Request, res: Response): Promise<Response> {
    try {
      const equipes = await equipeModel.findAll();
      return res.status(200).json(equipes);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching equipes' });
    }
  }

  async deleteEquipe(req: Request, res: Response): Promise<Response> {
    try {
      await equipeModel.delete(Number(req.params.id));
      return res.status(200).json({ message: 'Equipe deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting equipe' });
    }
  }
}

export default new EquipeController();