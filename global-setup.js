const { cleanupTestData } = require('./playwright/support/database')
const dotenv = require('dotenv')
dotenv.config()


module.exports = async ()=> {
    console.log('Limpando os dados de teste antes da execução...')
    await cleanupTestData()
    console.log('Limpeza concluída com sucesso.')
}