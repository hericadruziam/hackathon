-- Criação do banco de dados
CREATE DATABASE hackathon_db;

-- Selecionar o banco de dados
\c hackathon_db;

-- Criação da tabela de avaliadores
CREATE TABLE avaliadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    login VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Criação da tabela de equipes
CREATE TABLE equipes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE
);

-- Criação da tabela de avaliações
CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    avaliador_id INT NOT NULL,
    equipe_id INT NOT NULL,
    notas JSONB NOT NULL,
    FOREIGN KEY (avaliador_id) REFERENCES avaliadores (id),
    FOREIGN KEY (equipe_id) REFERENCES equipes (id),
    UNIQUE (avaliador_id, equipe_id)
);
