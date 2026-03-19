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
                bat 'cmd /c "npx.cmd playwright test --reporter=html"'
            }
        }

        stage('Publish Report') {
             steps {
                publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report',
                keepAll: true,                  // 🔥 guarda histórico
                alwaysLinkToLastBuild: true,   // 🔥 link al último
                allowMissing: false
        ])
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