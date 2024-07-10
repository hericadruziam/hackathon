import pool from '../database/dbConfig';
import { Equipe } from './EquipeModel'; // Supondo que exista um modelo de equipe

interface Avaliador {
  id?: number;
  nome: string;
  login: string;
  senha: string;
}

class AvaliadorModel {
  async create(avaliador: Avaliador): Promise<Avaliador> {
    const { nome, login, senha } = avaliador;
    const result = await pool.query(
      'INSERT INTO avaliadores (nome, login, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, login, senha]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Avaliador[]> {
    const result = await pool.query('SELECT * FROM avaliadores');
    return result.rows;
  }

  async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM avaliadores WHERE id = $1', [id]);
  }

  async findByLoginAndPassword(login: string, senha: string): Promise<Avaliador | null> {
    const result = await pool.query("SELECT * FROM avaliadores WHERE login = $1 AND senha = $2", [login, senha]);
    return result.rows[0] || null;
  }

  async findEquipesAtribuidas(avaliadorId: number): Promise<Equipe[]> {
    const query = `
      SELECT e.id, e.nome
      FROM equipes e
      JOIN atribuicoes a ON e.id = a.equipe_id
      WHERE a.avaliador_id = $1
    `;
    const result = await pool.query(query, [avaliadorId]);
    return result.rows;
  }
}

export { Avaliador, AvaliadorModel };
