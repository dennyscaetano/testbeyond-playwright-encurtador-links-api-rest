// Importa funções de teste e assertions do Playwright
import { test as baseTest, expect } from '@playwright/test'

// Importa serviços de autenticação e links
import { authService } from '../services/auth'
import { linksService } from '../services/links'

// Extende o test base do Playwright para adicionar fixtures personalizadas
const test = baseTest.extend({
    // Fixture para autenticação
    auth: async ({ request }, use) => {
        const auth = authService(request) // Cria instância do serviço de auth
        await use(auth) // Disponibiliza a fixture para os testes
    },
    // Fixture para manipulação de links
    links: async ({ request }, use) => {
        const links = linksService(request) // Cria instância do serviço de links
        await use(links) // Disponibiliza a fixture para os testes
    }
})

// Exporta o test extendido e o expect para uso nos testes
export { test, expect }
