// Importa funções de teste e assertions personalizadas do projeto
import { test, expect } from '../../support/fixtures'

// Importa fábrica de usuários com link associado
import { getUserWithLink } from '../../support/factories/user'
// Importa função utilitária para gerar ULID (identificador único)
import { generateULID } from '../../support/utils'

// Agrupa todos os testes relacionados ao endpoint de remoção de links
test.describe('DELETE /api/link/:id', () => {

    const user = getUserWithLink() // Cria usuário já preparado com link
    let token // Variável para armazenar o token de autenticação

    // Antes de cada teste, cria usuário e obtém token de acesso
    test.beforeEach(async ({ auth }) => {
        await auth.createUser(user)
        token = await auth.getToken(user)
    })

    // Cenário positivo: remoção de link existente
    test('deve remover um link encurtado', async ({ links }) => {
        const linkId = await links.createAndReturnLinkId(user.link, token) // Cria link e obtém seu id

        const response = await links.removeLink(linkId, token) // Faz requisição de remoção
        expect(response.status()).toBe(200) // Valida sucesso

        const body = await response.json()
        expect(body.message).toBe('Link excluído com sucesso') // Confirma mensagem esperada
    })

    // Cenário negativo: remoção de link inexistente
    test('não deve remover quando o id não existe', async ({ links }) => {
        const linkId = generateULID() // Gera um ULID inexistente

        const response = await links.removeLink(linkId, token) // Tenta remover link inválido
        expect(response.status()).toBe(404) // Espera "não encontrado"

        const body = await response.json()
        expect(body.message).toBe('Link não encontrado') // Confirma mensagem esperada
    })
})
