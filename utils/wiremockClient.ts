import fs from 'fs';
import path from 'path';

export async function loadMocks(request: any) {

  const mappingsPath = path.resolve('wiremock/mappings');

  const files = fs.readdirSync(mappingsPath);

  for (const file of files) {
    const filePath = path.join(mappingsPath, file);

    const mapping = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    await request.post('http://localhost:9090/__admin/mappings', {
      data: mapping
    });
  }
}

export async function resetMocks(request: any) {
  await request.post('http://localhost:9090/__admin/reset');
}