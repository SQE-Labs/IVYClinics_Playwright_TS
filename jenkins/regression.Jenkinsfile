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

        always {

            echo '========================================='
            echo 'Publishing Playwright HTML Report...'
            echo '========================================='

            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Regression Report',
                reportTitles: 'IVY Clinics Regression Automation'
            ])

            echo 'Playwright HTML Report Published.'

            echo '========================================='
            echo 'Sending Regression Test Email Notification...'
            echo '========================================='

            emailext(
                to: '$DEFAULT_RECIPIENTS',

                subject: "IVY Clinics | Regression Automation | Build #${BUILD_NUMBER} | ${currentBuild.currentResult}",

                body: """
                    <html>
                    <body>

                        <h2>IVY Clinics - Regression Automation</h2>

                        <p>Regression automation execution has completed.</p>

                        <table border="1" cellpadding="6" cellspacing="0">

                            <tr>
                                <td><b>Job</b></td>
                                <td>${JOB_NAME}</td>
                            </tr>

                            <tr>
                                <td><b>Build Number</b></td>
                                <td>#${BUILD_NUMBER}</td>
                            </tr>

                            <tr>
                                <td><b>Status</b></td>
                                <td>${currentBuild.currentResult}</td>
                            </tr>

                            <tr>
                                <td><b>Build URL</b></td>
                                <td>
                                    <a href="${BUILD_URL}">
                                        View Jenkins Build
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td><b>Playwright Report</b></td>
                                <td>
                                    <a href="${BUILD_URL}Playwright_20Regression_20Report/">
                                        View Regression Test Report
                                    </a>
                                </td>
                            </tr>

                        </table>

                        <br>

                        <p>
                            This is an automated notification from Jenkins.
                        </p>

                    </body>
                    </html>
                """,

                mimeType: 'text/html'
            )

            echo 'Regression Automation Pipeline Finished.'
        }
    }
}