pipeline { 
    agent any

    parameters {
        choice(name: 'ENV_TYPE', choices: ['mock', 'real'], description: 'Selecciona mock o API real')
    }

    environment {
        WIREMOCK_PORT = '9090'
        CONTAINER_NAME = 'wiremock-bank'
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

        stage('Start WireMock (Docker)') {
            when {
                expression { params.ENV_TYPE == 'mock' }
            }
            steps {
                echo '🐳 Iniciando WireMock en Docker...'

                bat """
                docker rm -f %CONTAINER_NAME% 2>nul

                docker run -d --name %CONTAINER_NAME% ^
                  -p %WIREMOCK_PORT%:8080 ^
                  -v %cd%\\wiremock:/home/wiremock ^
                  wiremock/wiremock:latest

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

        stage('Allure Report') {
            steps {
                echo '📊 Generando reporte Allure...'
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
            echo '🧹 Eliminando contenedor WireMock...'

            bat """
            docker rm -f %CONTAINER_NAME% 2>nul
            """

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