import { test, expect } from '../../support/fixtures'

import { getUser } from '../../support/factories/user'

test.describe('POST /auth/login', () => {

    test('deve fazer login com sucesso', async ({ auth }) => {
        const user = getUser()

        const respCreate = await auth.createUser(user)
        expect(respCreate.status()).toBe(201)

        const response = await auth.login(user)
        expect(response.status()).toBe(200)

        const body = await response.json()

        expect(body).toHaveProperty('message', 'Login realizado com sucesso')
        expect(body.data).toHaveProperty('token')
        expect(body.data.user).toHaveProperty('id')
        expect(body.data.user).toHaveProperty('name', user.name)
        expect(body.data.user).toHaveProperty('email', user.email)
        expect(body.data.user).not.toHaveProperty('password')
    })

    test('não deve fazer login com senha incorreta', async ({ auth }) => {
        const user = getUser()

        const respCreate = await auth.createUser(user)
        expect(respCreate.status()).toBe(201)

        const response = await auth.login({ ...user, password: 'incorrect_password' })
        expect(response.status()).toBe(401)

        const body = await response.json()

        expect(body).toHaveProperty('message', 'Credenciais inválidas')
    })

    test('não deve fazer login com email que não foi cadastrado', async ({ auth }) => {
        const user = {
            email: '404@emailinexistente.com',
            password: 'pwd123'
        }

        const response = await auth.login(user)
        expect(response.status()).toBe(401)

        const body = await response.json()

        expect(body).toHaveProperty('message', 'Credenciais inválidas')
    })

    test('não deve fazer login quando o e-mail não for informado', async ({ auth }) => {
        const user = {
            password: 'pwd123'
        }

        const response = await auth.login(user)
        expect(response.status()).toBe(400)

        const body = await response.json()

        expect(body).toHaveProperty('message', 'O campo \'Email\' é obrigatório')
    })

    test('não deve fazer login quando a senha não for informada', async ({ auth }) => {
        const user = {
            email: 'dennyscaetano@yahoo.com.br'
        }

        const response = await auth.login(user)
        expect(response.status()).toBe(400)

        const body = await response.json()

        expect(body).toHaveProperty('message', 'O campo \'Password\' é obrigatório')
    })
})