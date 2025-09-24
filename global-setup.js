// Importa a função de limpeza do banco de dados
const { cleanupTestData } = require('./playwright/support/database')
// Carrega variáveis de ambiente do arquivo .env
const dotenv = require('dotenv')
dotenv.config()

// Função executada antes dos testes para limpar dados de teste
module.exports = async () => {
    console.log('Limpando os dados de teste antes da execução...')
    await cleanupTestData() // Executa a limpeza de usuários e links de teste
    console.log('Limpeza concluída com sucesso.')
}
