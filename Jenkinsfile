pipeline {
    agent any

    environment {
        USE_MOCK = 'true'
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

        stage('Run Tests') {
            steps {
                echo '🧪 Ejecutando pruebas...'
                bat 'cmd /c "npx.cmd playwright test"'
            }
        }

        stage('Verify Report') {
            steps {
                echo '🔍 Verificando reporte...'
                bat 'dir playwright-report'
            }
        }

        stage('Publish Report') {
            steps {
                echo '📊 Publicando reporte...'
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])
            }
        }
    }

    post {
        always {
            echo '🏁 Pipeline finalizado'
        }
        success {
            echo '✅ Tests OK'
        }
        failure {
            echo '❌ Fallaron tests'
        }
    }
}