pipeline { 
    agent any

    parameters {
        choice(name: 'ENV_TYPE', choices: ['mock', 'real'], description: 'mock o real')
        choice(name: 'TEST_ENV', choices: ['DEV', 'QA', 'PROD'], description: 'Ambiente')
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
                echo '🐳 Iniciando WireMock...'

                bat """
                docker rm -f %CONTAINER_NAME% 2>nul

                docker run -d --name %CONTAINER_NAME% ^
                  -p %WIREMOCK_PORT%:8080 ^
                  -v %cd%\\wiremock:/home/wiremock ^
                  wiremock/wiremock:latest
                """
            }
        }

        stage('Wait for WireMock') {
            when {
                expression { params.ENV_TYPE == 'mock' }
            }
            steps {
                script {
                    def retries = 10
                    def up = false

                    for (int i = 0; i < retries; i++) {
                        def status = bat(
                            script: "curl -s http://localhost:%WIREMOCK_PORT%/__admin",
                            returnStatus: true
                        )

                        if (status == 0) {
                            echo '✅ WireMock listo'
                            up = true
                            break
                        }

                        sleep 2
                    }

                    if (!up) {
                        error("❌ WireMock no levantó")
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo "🧪 Ejecutando: ${params.ENV_TYPE} - ${params.TEST_ENV}"

                bat """
                set ENV_TYPE=${params.ENV_TYPE}
                set TEST_ENV=${params.TEST_ENV}
                set WIREMOCK_PORT=%WIREMOCK_PORT%
                npx.cmd playwright test
                """
            }
        }

        stage('Allure Report') {
            steps {
                echo '📊 Generando Allure...'
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
            echo '🧹 Eliminando WireMock...'
            bat "docker rm -f %CONTAINER_NAME% 2>nul"
        }

        success {
            echo '✅ Todo OK'
        }

        failure {
            echo '❌ Falló pipeline'
        }
    }
}