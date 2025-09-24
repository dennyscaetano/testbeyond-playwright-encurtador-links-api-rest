// Importa funções de teste e assertions personalizadas do projeto
import { test, expect } from '../../support/fixtures'

// Importa fábrica de usuários com múltiplos links associados
import { getUserWithLinks } from '../../support/factories/user'

// Agrupa todos os testes relacionados ao endpoint de listagem de links
test.describe('GET /api/links', () => {
    
    // Cenário positivo: retornar lista com links existentes
    test('deve retornar uma lista de links pré-encurtados', async ({ auth, links }) => {
        const user = getUserWithLinks(5) // Cria usuário com 5 links

        await auth.createUser(user) // Cria usuário
        const token = await auth.getToken(user) // Obtém token de acesso

        // Cria todos os links do usuário
        for (const link of user.links) {
            await links.createLink(link, token)
        }

        const response = await links.getLinks(token) // Requisição para buscar links
        expect(response.status()).toBe(200)

        const body = await response.json() // Converte resposta para JSON
        expect(body.message).toBe('Links Encurtados')
        expect(body.count).toBe(user.links.length) // Quantidade deve ser igual à criada
        expect(Array.isArray(body.data)).toBeTruthy() // Deve retornar array

        // Valida cada link retornado
        for (const [index, link] of body.data.entries()) {
            expect(link).toHaveProperty('id')
            expect(link).toHaveProperty('original_url', user.links[index].original_url)
            expect(link).toHaveProperty('title', user.links[index].title)
            expect(link).toHaveProperty('short_code')

            // short_code deve ter exatamente 5 caracteres alfanuméricos
            expect(link.short_code).toMatch(/^[a-zA-Z0-9]{5}$/)
        }
    })

    // Cenário alternativo: lista vazia
    test('deve retornar uma lista vazia', async ({ auth, links }) => {
        const user = getUserWithLinks(0) // Cria usuário sem links

        await auth.createUser(user) // Cria usuário
        const token = await auth.getToken(user) // Obtém token de acesso

        const response = await links.getLinks(token) // Busca links
        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body.count).toBe(0) // Nenhum link retornado
        expect(body.data).toHaveLength(0) // Array vazio
        expect(body.message).toBe('Links Encurtados')
    })
})
