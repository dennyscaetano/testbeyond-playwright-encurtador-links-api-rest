// Serviço de manipulação de links para uso nos testes
export const linksService = (request) => {

    // Função para criar um link encurtado
    const createLink = async (link, token) => {
        return await request.post('/api/links', {
            headers: {
                Authorization: `Bearer ${token}` // Token para autenticação
            },
            data: link // Dados do link a ser criado
        })
    }

    // Cria um link e retorna o ID gerado
    const createAndReturnLinkId = async (link, token) => {
        const response = await createLink(link, token) // Cria link
        const body = await response.json() // Converte resposta para JSON
        return body.data.id // Retorna ID do link criado
    }

    // Obtém todos os links do usuário
    const getLinks = async (token) => {
        return await request.get('/api/links', {
            headers: {
                Authorization: `Bearer ${token}` // Token para autenticação
            }
        })
    }

    // Remove um link pelo ID
    const removeLink = async (linkId, token) => {
        return await request.delete(`/api/links/${linkId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Token para autenticação
            }
        })
    }

    // Retorna os métodos disponíveis no serviço
    return {
        createLink,
        getLinks,
        createAndReturnLinkId,
        removeLink
    }
}
