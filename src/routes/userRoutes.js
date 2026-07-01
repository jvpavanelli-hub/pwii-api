const express = require('express');
const router = express.Router();

const {
  listarUsuarios,
  buscarUsuario,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  login,
} = require('../controllers/userController');

const { validarUsuario, validarAtualizacao } = require('../middlewares/validate');

router.get('/usuarios', listarUsuarios);
router.get('/usuarios/:id', buscarUsuario);
router.post('/usuarios', validarUsuario, criarUsuario);
router.put('/usuarios/:id', validarAtualizacao, atualizarUsuario);
router.delete('/usuarios/:id', deletarUsuario);

router.post('/login', login);

module.exports = router;
