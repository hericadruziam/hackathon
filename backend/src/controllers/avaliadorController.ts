// src/controllers/avaliadorController.ts
import { Request, Response } from 'express';
import { AvaliadorModel } from '../models/AvaliadorModel';

const avaliadorModel = new AvaliadorModel();

class AvaliadorController {
  async createAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliador = await avaliadorModel.create(req.body);
      return res.status(201).json(avaliador);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating avaliador' });
    }
  }

  async getAvaliadores(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadores = await avaliadorModel.findAll();
      return res.status(200).json(avaliadores);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching avaliadores' });
    }
  }

  async deleteAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      await avaliadorModel.delete(Number(req.params.id));
      return res.status(200).json({ message: 'Avaliador deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting avaliador' });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { login, senha } = req.body;

    try {
      const avaliadorModel = new AvaliadorModel();
      const avaliador = await avaliadorModel.findByLoginAndPassword(login, senha);

      if (!avaliador) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      return res.json({ message: 'Login bem-sucedido' });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro interno ao tentar fazer login' });
    }
  }
}

export default new AvaliadorController();
