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

        stage('Execute Smoke Tests') {
            steps {
                echo '========================================='
                echo 'Executing Smoke Test Suite...'
                echo '========================================='

                bat 'npx playwright test --grep "@smoke"'
            }
        }
    }

    post {

        success {
            echo '========================================='
            echo 'SMOKE TESTS PASSED'
            echo '========================================='

            echo 'Triggering Regression Automation...'

            build job: 'IVY-Regression-Automation',
                  wait: true,
                  propagate: true
        }

        failure {
            echo '========================================='
            echo 'SMOKE TESTS FAILED'
            echo 'Regression Automation will NOT be triggered.'
            echo '========================================='
        }

        always {
            echo 'Smoke Automation Pipeline Finished.'
        }
    }
}