// Importa o Pool do PostgreSQL para gerenciar conexões
const { Pool } = require('pg');

// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// Configura a conexão com o banco de dados
const pool = new Pool({
  user: "dba", // Usuário do banco
  host: "localhost", // Host do banco
  database: "ShortDB", // Nome do banco
  password: "dba", // Senha do banco
  port: "5433", // Porta do banco
});

// Função para limpar dados de teste do banco
async function cleanupTestData() {
  const client = await pool.connect(); // Obtém um cliente da conexão
  try {
    await client.query('BEGIN'); // Inicia transação

    // Query para deletar usuários de teste e seus links associados
    const query = `
      WITH usuarios_para_deletar AS (
        SELECT id FROM users WHERE email LIKE '%@test.dev'
      ),
      delete_links AS (
        DELETE FROM links
        WHERE user_id IN (SELECT id FROM usuarios_para_deletar)
      )
      DELETE FROM users
      WHERE id IN (SELECT id FROM usuarios_para_deletar);
    `;

    await client.query(query); // Executa a query de limpeza
    await client.query('COMMIT'); // Confirma transação
    console.log('Usuários e links de teste removidos com sucesso.');
  } catch (err) {
    await client.query('ROLLBACK'); // Reverte transação em caso de erro
    console.error('Erro ao remover dados de teste:', err);
  } finally {
    client.release(); // Libera o cliente de volta para o pool
  }
}

// Exporta a função para ser usada em outros arquivos
module.exports = { cleanupTestData }
