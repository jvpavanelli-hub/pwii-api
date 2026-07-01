function validarUsuario(req, res, next) {
  const { usuario, senha } = req.body;
  const erros = [];

  if (!usuario || typeof usuario !== 'string' || usuario.trim().length < 3) {
    erros.push('O campo "usuario" é obrigatório e deve ter pelo menos 3 caracteres.');
  }

  if (usuario && /\s/.test(usuario)) {
    erros.push('O campo "usuario" não pode conter espaços.');
  }

  if (!senha || typeof senha !== 'string' || senha.length < 6) {
    erros.push('O campo "senha" é obrigatório e deve ter pelo menos 6 caracteres.');
  }

  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }

  next();
}

function validarAtualizacao(req, res, next) {
  const { usuario, senha } = req.body;
  const erros = [];

  if (usuario !== undefined) {
    if (typeof usuario !== 'string' || usuario.trim().length < 3) {
      erros.push('O campo "usuario" deve ter pelo menos 3 caracteres.');
    }
    if (/\s/.test(usuario)) {
      erros.push('O campo "usuario" não pode conter espaços.');
    }
  }

  if (senha !== undefined) {
    if (typeof senha !== 'string' || senha.length < 6) {
      erros.push('O campo "senha" deve ter pelo menos 6 caracteres.');
    }
  }

  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }

  next();
}

module.exports = { validarUsuario, validarAtualizacao };
