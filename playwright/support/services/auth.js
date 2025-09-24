// Serviço de autenticação para uso nos testes
export const authService = (request) => {

    // Função para criar um usuário na API
    const createUser = async (user) => {
        return await request.post('/api/auth/register', {
            data: user // Envia dados do usuário
        })
    }

    // Função para realizar login de um usuário
    const login = async (user) => {
        return await request.post('/api/auth/login', {
            data: {
                email: user.email, // Email do usuário
                password: user.password // Senha do usuário
            }
        })
    }

    // Função para obter token de autenticação após login
    const getToken = async (user) => {
        const response = await login(user) // Faz login
        const body = await response.json() // Converte resposta para JSON
        return body.data.token // Retorna token de acesso
    }

    // Retorna os métodos disponíveis no serviço
    return {
        createUser,
        login,
        getToken
    }
}
