// @ts-check
// Importa funções de configuração e dispositivos do Playwright
import { defineConfig, devices } from '@playwright/test';

// Carrega variáveis de ambiente do arquivo .env
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Configuração do Playwright
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  globalSetup: './global-setup.js', // Executa script antes de todos os testes
  testDir: './playwright/e2e', // Diretório onde estão os testes
  fullyParallel: true, // Executa testes em paralelo
  forbidOnly: !!process.env.CI, // Falha na build se houver test.only no CI
  retries: process.env.CI ? 2 : 0, // Número de tentativas de retry no CI
  workers: process.env.CI ? 1 : undefined, // Número de workers (threads) no CI
  reporter: [['html', { open: 'never' }], ['dot']], // Relatórios gerados (HTML e dot)
  use: {
    baseURL: process.env.BASE_API, // URL base para requisições
    trace: 'on-first-retry', // Coleta trace na primeira falha
  },

  // Configuração de projetos (browsers ou testes específicos)
  projects: [
    {
      name: 'api-tests' // Projeto para testes de API
    }
    // Configurações comentadas para navegadores e mobile podem ser habilitadas conforme necessidade
  ],

  // Configuração opcional para iniciar servidor local antes dos testes
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
