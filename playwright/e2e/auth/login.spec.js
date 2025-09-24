// Importa funções de teste e assertions personalizadas do projeto
import { test, expect } from '../../support/fixtures'

// Importa fábrica de usuários para gerar dados de teste
import { getUser } from '../../support/factories/user'

// Agrupa todos os testes relacionados ao endpoint de login
test.describe('POST /auth/login', () => {

    // Cenário positivo: login com sucesso
    test('deve fazer login com sucesso', async ({ auth }) => {
        const user = getUser() // Cria um usuário válido para teste

        const respCreate = await auth.createUser(user) // Cria o usuário na aplicação
        expect(respCreate.status()).toBe(201) // Valida que o usuário foi criado

        const response = await auth.login(user) // Realiza o login com o usuário criado
        expect(response.status()).toBe(200) // Valida que o login foi bem-sucedido

        const body = await response.json() // Converte resposta para JSON

        // Validações do corpo da resposta
        expect(body).toHaveProperty('message', 'Login realizado com sucesso')
        expect(body.data).toHaveProperty('token')
        expect(body.data.user).toHaveProperty('id')
        expect(body.data.user).toHaveProperty('name', user.name)
        expect(body.data.user).toHaveProperty('email', user.email)
        expect(body.data.user).not.toHaveProperty('password') // Garante que senha não está exposta
    })

    // Cenário negativo: senha incorreta
    test('não deve fazer login com senha incorreta', async ({ auth }) => {
        const user = getUser() // Cria usuário válido

        const respCreate = await auth.createUser(user) // Cria usuário
        expect(respCreate.status()).toBe(201)

        // Tenta logar com senha incorreta
        const response = await auth.login({ ...user, password: 'incorrect_password' })
        expect(response.status()).toBe(401) // Espera erro de autenticação

        const body = await response.json()
        expect(body).toHaveProperty('message', 'Credenciais inválidas')
    })

    // Cenário negativo: email não cadastrado
    test('não deve fazer login com email que não foi cadastrado', async ({ auth }) => {
        const user = {
            email: '404@emailinexistente.com',
            password: 'pwd123'
        }

        const response = await auth.login(user) // Tenta logar com email inexistente
        expect(response.status()).toBe(401)

        const body = await response.json()
        expect(body).toHaveProperty('message', 'Credenciais inválidas')
    })

    // Cenário negativo: email ausente
    test('não deve fazer login quando o e-mail não for informado', async ({ auth }) => {
        const user = {
            password: 'pwd123'
        }

        const response = await auth.login(user) // Tenta logar sem email
        expect(response.status()).toBe(400) // Valida erro de requisição inválida

        const body = await response.json()
        expect(body).toHaveProperty('message', 'O campo \'Email\' é obrigatório')
    })

    // Cenário negativo: senha ausente
    test('não deve fazer login quando a senha não for informada', async ({ auth }) => {
        const user = {
            email: 'dennyscaetano@yahoo.com.br'
        }

        const response = await auth.login(user) // Tenta logar sem senha
        expect(response.status()).toBe(400)

        const body = await response.json()
        expect(body).toHaveProperty('message', 'O campo \'Password\' é obrigatório')
    })
})
