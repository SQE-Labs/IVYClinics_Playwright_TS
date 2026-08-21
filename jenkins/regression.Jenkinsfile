pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo '========================================='
                echo 'Checking out latest source code...'
                echo '========================================='

                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '========================================='
                echo 'Installing project dependencies...'
                echo '========================================='

                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo '========================================='
                echo 'Installing Playwright browsers...'
                echo '========================================='

                bat 'npx playwright install'
            }
        }

        stage('Execute Regression Tests') {
            steps {
                echo '========================================='
                echo 'Executing Regression Test Suite...'
                echo '========================================='

                bat 'npx playwright test --reporter=html'
            }
        }
    }

   post {

    always {

        echo 'Publishing Playwright HTML Report...'

        publishHTML(target: [
            allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright Regression Report',
            reportTitles: 'IVY Clinics Regression Automation'
        ])

        echo 'Regression Automation Pipeline Finished.'
    }

    success {
        echo '========================================='
        echo 'REGRESSION TESTS PASSED'
        echo '========================================='
    }

    failure {
        echo '========================================='
        echo 'REGRESSION TESTS FAILED'
        echo '========================================='
    }
}
}