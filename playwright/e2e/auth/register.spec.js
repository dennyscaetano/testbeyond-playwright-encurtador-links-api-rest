// Importa funções de teste e assertions personalizadas do projeto
import { test, expect } from '../../support/fixtures'

// Importa fábrica de usuários para gerar dados de teste
import { getUser } from '../../support/factories/user'

// Agrupa todos os testes relacionados ao endpoint de cadastro de usuários
test.describe('POST /auth/register', () => {
    
    // Cenário positivo: cadastro de um novo usuário
    test('deve cadastrar um novo usuário', async ({ auth }) => {
        const user = getUser() // Cria um usuário válido para teste

        const response = await auth.createUser(user) // Requisição para criar usuário
        expect(response.status()).toBe(201) // Valida retorno de sucesso

        const responseBody = await response.json() // Converte resposta para JSON

        // Validações do corpo da resposta
        expect(responseBody).toHaveProperty('message', 'Usuário cadastrado com sucesso!')
        expect(responseBody.user).toHaveProperty('id')
        expect(responseBody.user).toHaveProperty('name', user.name)
        expect(responseBody.user).toHaveProperty('email', user.email)
        expect(responseBody.user).not.toHaveProperty('password') // Senha não deve estar exposta
    })

    // Cenário negativo: e-mail já cadastrado
    test('não deve cadastrar quando o e-mail já estiver em uso', async ({ auth }) => {
        const user = getUser() // Cria usuário válido

        const preCondition = await auth.createUser(user) // Cria usuário pela primeira vez
        expect(preCondition.status()).toBe(201)

        const response = await auth.createUser(user) // Tenta cadastrar mesmo usuário novamente
        expect(response.status()).toBe(400)

        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'Este e-mail já está em uso. Por favor, tente outro.')
    })

    // Cenário negativo: formato de e-mail inválido
    test('não deve cadastrar quando o e-mail é incorreto', async ({ auth }) => {
        const user = {
            name: 'Dennys Matos',
            email: 'dennys&emailincorreto.com', // Email inválido
            password: 'pwd123'
        }

        const response = await auth.createUser(user)
        expect(response.status()).toBe(400)

        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Email\' deve ser um email válido')
    })

    // Cenário negativo: nome não informado
    test('não deve cadastrar quando o nome não é informado', async ({ auth }) => {
        const user = {
            email: 'dennys@emailincorreto.com',
            password: 'pwd123'
        }

        const response = await auth.createUser(user) // Falta campo "name"
        expect(response.status()).toBe(400)

        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Name\' é obrigatório')
    })

    // Cenário negativo: e-mail não informado
    test('não deve cadastrar quando o email não é informado', async ({ auth }) => {
        const user = {
            name: 'Dennys Matos',
            password: 'pwd123'
        }

        const response = await auth.createUser(user) // Falta campo "email"
        expect(response.status()).toBe(400)

        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Email\' é obrigatório')
    })

    // Cenário negativo: senha não informada
    test('não deve cadastrar quando a senha não é informada', async ({ auth }) => {
        const user = {
            name: 'Dennys Matos',
            email: 'dennyscaetano@yahoo.com.br'
        }

        const response = await auth.createUser(user) // Falta campo "password"
        expect(response.status()).toBe(400)

        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Password\' é obrigatório')
    })
})
