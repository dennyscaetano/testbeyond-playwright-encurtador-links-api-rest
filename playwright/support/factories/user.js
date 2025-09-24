// Importa a biblioteca Faker para gerar dados falsos
import { faker } from '@faker-js/faker'

// Gera um usuário básico com nome, email e senha
export const getUser = () => {
    const firstName = faker.person.firstName() // Gera primeiro nome
    const lastName = faker.person.lastName() // Gera sobrenome

    return {
        name: `${firstName} ${lastName}`, // Combina nome e sobrenome
        email: faker.internet.email({ firstName, lastName, provider: 'test.dev' }).toLowerCase(), // Gera email com domínio fixo
        password: 'pwd123' // Senha padrão
    }
}

// Gera um usuário com um link associado
export const getUserWithLink = () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName, provider: 'test.dev' }).toLowerCase(),
        password: 'pwd123',
        link: {
            original_url: faker.internet.url(), // URL original aleatória
            title: faker.music.songName() // Título aleatório para o link
        }
    }
}

// Gera um usuário com múltiplos links associados
export const getUserWithLinks = (linksCount = 1) => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName, provider: 'test.dev' }).toLowerCase(),
        password: 'pwd123',
        links: faker.helpers.multiple(() => ({
            original_url: faker.internet.url(), // URL original aleatória
            title: faker.music.songName() // Título aleatório
        }),
            { count: linksCount }) // Quantidade de links definidos pelo parâmetro
    }
}
