import { test, expect } from '@playwright/test';
import { BASE_URL, CURRENT_CONFIG } from '../../utils/config';
import { loadMocks, resetMocks } from '../../utils/wiremockClient';
import { step, attachment } from 'allure-js-commons';

test.beforeEach(async ({ request }) => {
  if (CURRENT_CONFIG.USE_MOCK) {
    await step('Resetear mocks', async () => {
      await resetMocks(request);
    });

    await step('Cargar mocks', async () => {
      await loadMocks(request);
    });
  }
});

test('Login API', async ({ request }) => {

  console.log('CONFIG:', CURRENT_CONFIG);

  let response;
  let body;

  await step('Enviar request de login', async () => {
    response = await request.post(`${BASE_URL}/api/login`, {
      data: {
        email: 'test@test.com',
        password: '1234'
      }
    });

    // 📎 Adjuntar request
    attachment(
      'Request Payload',
      JSON.stringify({
        email: 'test@test.com',
        password: '1234'
      }, null, 2),
      'application/json'
    );
  });

  await step('Validar status code', async () => {
    expect(response.status()).toBe(200);
  });

  await step('Leer response body', async () => {
    body = await response.json();

    // 📎 Adjuntar response
    attachment(
      'Response Body',
      JSON.stringify(body, null, 2),
      'application/json'
    );
  });

  await step('Validar token en respuesta', async () => {
    expect(body).toHaveProperty('token');
  });

});