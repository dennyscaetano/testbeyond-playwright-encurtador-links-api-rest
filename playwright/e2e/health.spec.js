// @ts-check
// Importa funções de teste e assertions do Playwright
import { test, expect } from '@playwright/test'

// Testa se a API está online e respondendo corretamente
test('deve verificar se a api está online', async ({ request }) => {
  const response = await request.get('http://localhost:3333/health') // Requisição para o endpoint de saúde
  expect(response.status()).toBe(200) // Valida que a resposta foi bem-sucedida

  const body = await response.json() // Converte resposta para JSON

  // Validações do corpo da resposta
  expect(body.service).toBe('shortbeyond-api')
  expect(body.status).toBe('healthy')
})
