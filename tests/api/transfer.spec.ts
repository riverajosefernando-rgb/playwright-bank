import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../utils/config';

test('Transfer API', async ({ request }) => {

  const response = await request.post(`${BASE_URL}/api/transfer`, {
    data: {
      from: '123',
      to: '456',
      amount: 1000
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.message).toBe('Transfer successful');

});