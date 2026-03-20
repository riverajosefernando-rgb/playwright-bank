import path from 'path';

// 🔥 1. Leer variables desde Jenkins / entorno
const ENV = process.env.TEST_ENV || 'DEV'; // DEV | QA | PROD
const USE_MOCK = process.env.ENV_TYPE === 'mock';

// 🔌 2. Configuración WireMock
export const WIREMOCK_PORT = process.env.WIREMOCK_PORT || '9090';
export const WIREMOCK_PATH =
  process.env.WIREMOCK_PATH || path.resolve('./wiremock');

// 🌍 3. URLs por ambiente (REAL)
const ENV_URLS = {
  DEV: 'https://dev-api.bank.com',
  QA: 'https://qa-api.bank.com',
  PROD: 'https://api.bank.com'
};

// 🎯 4. BASE URL dinámica 
export const BASE_URL = USE_MOCK
  ? `http://localhost:${WIREMOCK_PORT}`
  : ENV_URLS[ENV as keyof typeof ENV_URLS];

// 🧠 5. Export útil para logs/debug
export const CURRENT_CONFIG = {
  ENV,
  USE_MOCK,
  BASE_URL
};