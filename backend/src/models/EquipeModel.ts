// src/models/equipeModel.ts
import pool from "../database/dbConfig";

interface Equipe {
  id?: number;
  nome: string;
}

class EquipeModel {
  async create(equipe: Equipe): Promise<Equipe> {
    const { nome } = equipe;
    const result = await pool.query(
      "INSERT INTO equipes (nome) VALUES ($1) RETURNING *",
      [nome]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Equipe[]> {
    const result = await pool.query("SELECT * FROM equipes");
    return result.rows;
  }

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM equipes WHERE id = $1", [id]);
  }
}

export { Equipe, EquipeModel };
