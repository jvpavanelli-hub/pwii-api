const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API de gerenciamento de usuários no ar 🚀' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
