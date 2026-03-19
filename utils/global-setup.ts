import { startWiremock } from './startWiremock';

async function globalSetup() {
  console.log('🌍 Global setup iniciado');

  await startWiremock(); // 👈 CLAVE

  console.log('✅ WireMock listo antes de tests');
}

export default globalSetup;