import path from 'path';

export const USE_MOCK = true;
// export const USE_MOCK = process.env.USE_MOCK === 'true'; - por variable de entorno

export const WIREMOCK_PORT = process.env.WIREMOCK_PORT || '9090';

export const WIREMOCK_PATH =
  process.env.WIREMOCK_PATH || path.resolve('wiremock');

  export const BASE_URL = USE_MOCK
  ? 'http://localhost:9090'
  : 'https://real-api.com'; // ← aquí pondrías API real
