// Importa funções de teste e assertions personalizadas do projeto
import { test, expect } from '../../support/fixtures'

// Importa fábrica de usuário com link associado
import { getUserWithLink } from '../../support/factories/user'

// Agrupa todos os testes relacionados ao endpoint de criação de links
test.describe('POST /api/links', () => {

    const user = getUserWithLink() // Cria usuário já com um link de exemplo
    let token // Variável para armazenar o token de autenticação

    // Antes de cada teste cria o usuário e obtém token
    test.beforeEach(async ({ auth }) => {
        await auth.createUser(user)
        token = await auth.getToken(user)
    })

    // Cenário positivo: encurtar link com sucesso
    test('deve encurtar um novo link', async ({ links }) => {
        const response = await links.createLink(user.link, token) // Cria link encurtado
        expect(response.status()).toBe(201) // Valida sucesso

        const { data, message } = await response.json() // Converte resposta para JSON

        // Validações do corpo da resposta
        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('original_url', user.link.original_url)
        expect(data).toHaveProperty('title', user.link.title)
        expect(data.short_code).toMatch(/^[a-zA-Z0-9]{5}$/) // short_code deve ter 5 caracteres alfanuméricos
        expect(message).toBe('Link criado com sucesso')
    })

    // Cenário negativo: url original ausente
    test('não deve encurtar quando a url original não é informada', async ({ links }) => {
        const response = await links.createLink({ ...user.link, original_url: '' }, token)
        expect(response.status()).toBe(400)

        const { message } = await response.json()
        expect(message).toBe('O campo \'OriginalURL\' é obrigatório')
    })

    // Cenário negativo: título ausente
    test('não deve encurtar quando o título não é informado', async ({ links }) => {
        const response = await links.createLink({ ...user.link, title: '' }, token)
        expect(response.status()).toBe(400)

        const { message } = await response.json()
        expect(message).toBe('O campo \'Title\' é obrigatório')
    })

    // Cenário negativo: url original inválida
    test('não deve encurtar quando a url original é inválida', async ({ links }) => {
        const response = await links.createLink({ ...user.link, original_url: 'teste@teste.com.br' }, token)
        expect(response.status()).toBe(400)

        const { message } = await response.json()
        expect(message).toBe('O campo \'OriginalURL\' deve ser uma URL válida')
    })
})
