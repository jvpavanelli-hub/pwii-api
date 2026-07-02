const bcrypt = require('bcrypt');
const pool = require('../config/db');

async function listarUsuarios(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT id, usuario, tipo, criado_em FROM usuarios'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários.' });
  }
}

async function buscarUsuario(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      'SELECT id, usuario, tipo, criado_em FROM usuarios WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuário.' });
  }
}

async function criarUsuario(req, res) {
  try {
    const { usuario, senha, tipo } = req.body;

    const [existente] = await pool.query(
      'SELECT id FROM usuarios WHERE usuario = ?',
      [usuario]
    );

    if (existente.length > 0) {
      return res.status(409).json({ erro: 'Esse nome de usuário já está em uso.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const tipoFinal = tipo === 'admin' ? 'admin' : 'user';

    const [resultado] = await pool.query(
      'INSERT INTO usuarios (usuario, senha, tipo) VALUES (?, ?, ?)',
      [usuario, senhaHash, tipoFinal]
    );

    res.status(201).json({
      id: resultado.insertId,
      usuario,
      tipo: tipoFinal,
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar usuário.' });
  }
}

async function atualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { usuario, senha, tipo } = req.body;

    const [existente] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (existente.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    const campos = [];
    const valores = [];

    if (usuario !== undefined) {
      campos.push('usuario = ?');
      valores.push(usuario);
    }
    if (senha !== undefined) {
      const senhaHash = await bcrypt.hash(senha, 10);
      campos.push('senha = ?');
      valores.push(senhaHash);
    }
    if (tipo !== undefined) {
      campos.push('tipo = ?');
      valores.push(tipo === 'admin' ? 'admin' : 'user');
    }

    if (campos.length === 0) {
      return res.status(400).json({ erro: 'Nenhum campo para atualizar foi enviado.' });
    }

    valores.push(id);
    await pool.query(`UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`, valores);

    res.json({ mensagem: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
  }
}

async function deletarUsuario(req, res) {
  try {
    const { id } = req.params;
    const [resultado] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    res.json({ mensagem: 'Usuário removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover usuário.' });
  }
}

async function login(req, res) {
  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({ erro: 'Informe usuário e senha.' });
    }

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

    if (rows.length === 0) {
      return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
    }

    const usuarioEncontrado = rows[0];
    const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
    }

    res.json({
      mensagem: 'Login realizado com sucesso.',
      usuario: {
        id: usuarioEncontrado.id,
        usuario: usuarioEncontrado.usuario,
        tipo: usuarioEncontrado.tipo,
      },
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao realizar login.' });
  }
}

module.exports = {
  listarUsuarios,
  buscarUsuario,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  login,
};
