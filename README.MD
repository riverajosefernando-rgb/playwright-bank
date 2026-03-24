# 🧪 Playwright Bank Testing Framework

Framework de automatización para pruebas **UI + API** orientado a servicios bancarios, utilizando:

* 🎭 Playwright
* 🔌 WireMock (mock de APIs)
* 📊 Allure Reports
* ⚙️ Jenkins (CI/CD)

---

## 📁 Estructura del proyecto

```
playwright-bank/
│
├── tests/
│   ├── api/
│   │   ├── login.spec.ts
│   │   └── transfer.spec.ts
│   ├── ui/
│   │   ├── login.spec.ts
│   │   └── purchase.spec.ts
│
├── utils/
│   ├── config.ts
│   ├── wiremockClient.ts
│   ├── startWiremock.ts
│   └── global-setup.ts
│
├── wiremock/
│   ├── mappings/
│   └── __files/
│
├── playwright.config.ts
├── package.json
└── Jenkinsfile
```

---

## ⚙️ Requisitos

* Node.js (recomendado LTS)
* npm
* Docker (para WireMock)
* Jenkins (opcional para CI/CD)

---

## 📦 Instalación

```bash
npm install
npx playwright install
```

---

## 🚀 Ejecución de pruebas

### 🧪 Ejecutar todas las pruebas

```bash
npx playwright test
```

---

## 🔌 Ejecución con WireMock (mock API)

### 👉 En PowerShell

```powershell
$env:ENV_TYPE="mock"
npx playwright test
```

### 👉 En CMD

```cmd
set ENV_TYPE=mock && npx playwright test
```

---

### 🔍 ¿Qué hace esto?

* Levanta WireMock en `http://localhost:9090`
* Intercepta llamadas API
* Usa datos mock en `wiremock/mappings`

---

## 🌍 Ejecución contra API real

```bash
npx playwright test
```

> Usa la configuración definida en `config.ts`

---

## ⚙️ Configuración dinámica

Archivo: `utils/config.ts`

* `ENV_TYPE` → mock | real
* `TEST_ENV` → DEV | QA | PROD
* `BASE_URL` dinámico según entorno

---

## 🐳 WireMock

WireMock se levanta automáticamente durante la ejecución si:

```bash
ENV_TYPE=mock
```

Puerto por defecto:

```
http://localhost:9090
```

---

## 📊 Reportes

### Playwright HTML

```bash
npx playwright show-report
```

---

### Allure

Generar reporte:

```bash
allure serve allure-results
```

---

## ⚙️ Jenkins Pipeline

El pipeline incluye:

* Instalación de dependencias
* Instalación de Playwright
* Levantamiento de WireMock (Docker)
* Ejecución de tests
* Generación de reporte Allure

---

## 🧪 Tipos de pruebas

### API Tests

* Login API
* Transferencias

### UI Tests

* Login UI
* Flujo de compra

---

## 🧼 Limpieza

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

## ⚠️ Notas importantes

* En PowerShell usar `$env:ENV_TYPE="mock"`
* En CMD usar `set ENV_TYPE=mock`
* WireMock requiere Docker activo
* No se recomienda usar PowerShell para npm si presenta conflictos

---

## ✅ Estado del proyecto

✔ Pruebas UI
✔ Pruebas API
✔ Mock con WireMock
✔ Reportes con Allure
✔ Pipeline Jenkins

---

## 👨‍💻 Autor

Proyecto de automatización QA para pruebas bancarias.
