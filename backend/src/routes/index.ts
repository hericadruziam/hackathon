// src/routes/index.ts
import { Router } from 'express';
import AvaliadorController from '../controllers/avaliadorController';
import EquipeController from '../controllers/equipeController';
import AvaliacaoController from '../controllers/avaliacaoController';

const router = Router();

router.post('/login', AvaliadorController.login);

router.post('/avaliadores', AvaliadorController.createAvaliador);
router.get('/avaliadores', AvaliadorController.getAvaliadores);
router.delete('/avaliadores/:id', AvaliadorController.deleteAvaliador);

router.post('/equipes', EquipeController.createEquipe);
router.get('/equipes', EquipeController.getEquipes);
router.delete('/equipes/:id', EquipeController.deleteEquipe);

router.post('/avaliacoes', AvaliacaoController.createAvaliacao);
router.put('/avaliacoes/:id', AvaliacaoController.updateAvaliacao);
router.get('/avaliacoes', AvaliacaoController.getAvaliacoes);
router.get('/avaliacoes/avaliador/:avaliador_id', AvaliacaoController.getAvaliacoesByAvaliador);
router.get('/avaliacoes/equipe/:equipe_id', AvaliacaoController.getAvaliacoesByEquipe);

export default router;
