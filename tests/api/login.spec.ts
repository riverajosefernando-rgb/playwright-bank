import { test, expect, APIResponse } from '@playwright/test';
import { BASE_URL, CURRENT_CONFIG } from '../../utils/config';
import { loadMocks, resetMocks } from '../../utils/wiremockClient';

const allure = require('allure-js-commons'); // 👈 FIX

test.beforeEach(async ({ request }) => {

  if (CURRENT_CONFIG.USE_MOCK) {

    await test.step('Resetear mocks', async () => {
      await resetMocks(request);
    });

    await test.step('Cargar mocks', async () => {
      await loadMocks(request);
    });

  }

});

test('Login API', async ({ request }) => {

  const payload = {
    email: 'test@test.com',
    password: '1234'
  };

  let response: APIResponse;
  let body: any;

  await test.step('Enviar request', async () => {
    response = await request.post(`${BASE_URL}/api/login`, {
      data: payload
    });

    allure.attachment(
      'Request',
      JSON.stringify(payload, null, 2),
      'application/json'
    );
  });

  await test.step('Validar status', async () => {
    expect(response.status()).toBe(200);
  });

  await test.step('Leer response', async () => {
    body = await response.json();

    allure.attachment(
      'Response',
      JSON.stringify(body, null, 2),
      'application/json'
    );
  });

  await test.step('Validar token', async () => {
    expect(body).toHaveProperty('token');
  });

});