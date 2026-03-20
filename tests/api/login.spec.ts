import { test, expect } from '@playwright/test';
import { BASE_URL, CURRENT_CONFIG } from '../../utils/config';
import { loadMocks, resetMocks } from '../../utils/wiremockClient';

test.beforeEach(async ({ request }) => {
  if (CURRENT_CONFIG.USE_MOCK) {
    await resetMocks(request);
    await loadMocks(request);
  }
});

test('Login API', async ({ request }) => {

  console.log('🌍 CONFIG:', CURRENT_CONFIG);

  const response = await request.post(`${BASE_URL}/api/login`, {
    data: {
      email: 'test@test.com',
      password: '1234'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty('token');
});