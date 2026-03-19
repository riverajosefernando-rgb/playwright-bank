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

        stage('Publish Report (Jenkins)') {
            steps {
                echo '📊 Publicando reporte en Jenkins...'
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

        stage('Serve Report (HTTP)') {
            steps {
                echo '🌐 Levantando servidor local para reporte...'
                bat '''
                start cmd /c "npx.cmd http-server playwright-report -p 8081"
                timeout /t 5
                '''
            }
        }
    }

    post {
        always {
            echo '🏁 Pipeline finalizado'
        }
        success {
            echo '✅ Tests OK'
            echo '🌐 Abre el reporte en: http://localhost:8081'
        }
        failure {
            echo '❌ Fallaron tests'
        }
    }
}