import { execSync } from 'child_process';
import path from 'path';
import http from 'http';
import { USE_MOCK, WIREMOCK_PORT, WIREMOCK_PATH } from './config';

function isWiremockRunning(): boolean {
  try {
    const result = execSync('docker ps --filter "ancestor=wiremock/wiremock" --format "{{.ID}}"')
      .toString()
      .trim();

    return result.length > 0;
  } catch {
    return false;
  }
}

function waitForWiremock(port: string, timeout = 20000) {
  return new Promise<void>((resolve, reject) => {
    const start = Date.now();

    const check = () => {
      http
        .get(`http://localhost:${port}/__admin`, (res) => {
          if (res.statusCode && res.statusCode < 500) {
            console.log('✅ WireMock listo');
            resolve();
          } else {
            retry();
          }
        })
        .on('error', retry);
    };

    const retry = () => {
      if (Date.now() - start > timeout) {
        reject('❌ WireMock no respondió a tiempo');
      } else {
        setTimeout(check, 500);
      }
    };

    check();
  });
}

export async function startWiremock() {
  if (!USE_MOCK) {
    console.log('ℹ️ USE_MOCK=false → no se inicia WireMock');
    return;
  }

  console.log('🚀 Iniciando WireMock...');

  try {
    if (isWiremockRunning()) {
      console.log('✅ WireMock ya está corriendo');
      return;
    }

    // 👉 Ruta dinámica (portable)
    const resolvedPath = path.resolve(WIREMOCK_PATH || 'wiremock');

    console.log(`📁 Usando mappings desde: ${resolvedPath}`);

    // 👉 Normalizar ruta para Docker (Windows fix)
    const dockerPath = resolvedPath.replace(/\\/g, '/');

    execSync(
      `docker run -d -p ${WIREMOCK_PORT}:8080 -v "${dockerPath}:/home/wiremock" wiremock/wiremock`,
      { stdio: 'inherit' }
    );

    await waitForWiremock(WIREMOCK_PORT);

  } catch (error) {
    console.error('❌ Error iniciando WireMock:', error);
    throw error;
  }
}