// src/models/avaliacaoModel.ts
import pool from "../database/dbConfig";

interface Avaliacao {
  id?: number;
  avaliador_id: number;
  equipe_id: number;
  notas?: object;
}

class AvaliacaoModel {
  async create(avaliacao: Avaliacao): Promise<Avaliacao> {
    const { avaliador_id, equipe_id } = avaliacao;
    const result = await pool.query(
      "INSERT INTO avaliacoes (avaliador_id, equipe_id) VALUES ($1, $2) RETURNING *",
      [avaliador_id, equipe_id]
    );
    return result.rows[0];
  }

  async update(id: number, notas: object): Promise<Avaliacao> {
    const result = await pool.query(
      "UPDATE avaliacoes SET notas = $1 WHERE id = $2 RETURNING *",
      [notas, id]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Avaliacao[]> {
    const result = await pool.query("SELECT * FROM avaliacoes");
    return result.rows;
  }

  async findByAvaliadorId(avaliador_id: number): Promise<Avaliacao[]> {
    const result = await pool.query(
      "SELECT * FROM avaliacoes WHERE avaliador_id = $1",
      [avaliador_id]
    );
    return result.rows;
  }

  async findByEquipeId(equipe_id: number): Promise<Avaliacao[]> {
    const result = await pool.query(
      "SELECT * FROM avaliacoes WHERE equipe_id = $1",
      [equipe_id]
    );
    return result.rows;
  }
}

export { Avaliacao, AvaliacaoModel };
