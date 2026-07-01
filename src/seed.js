const bcrypt = require('bcrypt');
const pool = require('./config/db');

async function seed() {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', ['admin']);

    if (rows.length > 0) {
      console.log('Usuário admin já existe. Nada a fazer.');
      process.exit(0);
    }

    const senhaHash = await bcrypt.hash('admin123', 10);

    await pool.query(
      'INSERT INTO usuarios (usuario, senha, tipo) VALUES (?, ?, ?)',
      ['admin', senhaHash, 'admin']
    );

    console.log('Usuário admin criado com sucesso!');
    console.log('login: admin | senha: admin123');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao criar usuário admin:', err.message);
    process.exit(1);
  }
}

seed();
