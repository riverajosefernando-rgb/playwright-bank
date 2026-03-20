import { test, expect } from '@playwright/test';
import { BASE_URL, CURRENT_CONFIG } from '../../utils/config';
import { loadMocks, resetMocks } from '../../utils/wiremockClient';

test.beforeEach(async ({ request }) => {
  if (CURRENT_CONFIG.USE_MOCK) {
    await resetMocks(request);
    await loadMocks(request);
  }
});

test('Transfer API', async ({ request }) => {

  console.log('🌍 CONFIG:', CURRENT_CONFIG);

  const payload = {
    from: '123',
    to: '456',
    amount: 1000
  };

  const response = await request.post(`${BASE_URL}/api/transfer`, {
    data: payload
  });

  expect(response.status()).toBe(201);

  const body = await response.json();

  // ✅ Validaciones robustas
  expect(body).toHaveProperty('message');
  expect(body.message).toContain('Transfer');

  // 🔥 BONUS: validación de negocio
  expect(payload.amount).toBeGreaterThan(0);
});