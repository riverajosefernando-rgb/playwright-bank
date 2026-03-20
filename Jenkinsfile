pipeline { 
    agent any

    parameters {
        choice(name: 'ENV_TYPE', choices: ['mock', 'real'], description: 'Selecciona si usar WireMock o API real')
    }

    environment {
        WIREMOCK_PORT = '9090'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📥 Clonando repositorio...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Instalando dependencias...'
                bat 'cmd /c "npm.cmd install"'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo '🌐 Instalando navegadores...'
                bat 'cmd /c "npx.cmd playwright install"'
            }
        }

        stage('Start WireMock (if needed)') {
            when {
                expression { params.ENV_TYPE == 'mock' }
            }
            steps {
                echo '🧩 Iniciando WireMock...'
                bat """
                start /B java -jar wiremock-standalone.jar --port %WIREMOCK_PORT%
                timeout /t 5
                """
            }
        }

        stage('Run Tests') {
            steps {
                echo "🧪 Ejecutando pruebas en modo: ${params.ENV_TYPE}"

                script {
                    if (params.ENV_TYPE == 'mock') {
                        bat 'cmd /c "set BASE_URL=http://localhost:%WIREMOCK_PORT% && npx.cmd playwright test"'
                    } else {
                        bat 'cmd /c "set BASE_URL=https://api.realbank.com && npx.cmd playwright test"'
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo '📊 Generando resultados Allure...'
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }

    }

    post {
        always {
            echo '🧹 Deteniendo WireMock si está activo...'

            // Mata proceso de WireMock
            bat """
            for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%WIREMOCK_PORT%') do taskkill /F /PID %%a
            """

            echo '🧽 Limpieza finalizada'
            echo '🏁 Pipeline finalizado'
        }

        success {
            echo '✅ Tests OK'
        }

        failure {
            echo '❌ Fallaron tests o pipeline'
        }
    }
}