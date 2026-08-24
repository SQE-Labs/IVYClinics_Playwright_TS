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

            // =====================================================
            // 1. PUBLISH PLAYWRIGHT HTML REPORT
            // =====================================================

            echo '========================================='
            echo 'Publishing Playwright HTML Report...'
            echo '========================================='

            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Smoke Report',
                reportTitles: 'IVY Clinics Smoke Automation'
            ])

            echo 'Playwright HTML Report Published.'


            // =====================================================
            // 2. PUBLISH ALLURE REPORT
            // =====================================================

            echo '========================================='
            echo 'Publishing Allure Report...'
            echo '========================================='

            allure(
                commandline: 'Allure',
                includeProperties: false,
                jdk: '',
                resultPolicy: 'LEAVE_AS_IS',
                results: [[path: 'allure-results']]
            )

            echo 'Allure Report Published.'


            // =====================================================
            // 3. SEND EMAIL
            // =====================================================

            echo '========================================='
            echo 'Sending Smoke Test Email Notification...'
            echo '========================================='

            emailext(
                to: '$DEFAULT_RECIPIENTS',

                subject: "IVY Clinics | Smoke Automation | Build #${BUILD_NUMBER} | ${currentBuild.currentResult}",

                body: """
                    <html>
                    <body>

                        <h2>IVY Clinics - Smoke Automation</h2>

                        <p>
                            Smoke automation execution has completed.
                        </p>

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
                                <td><b>Allure Report</b></td>
                                <td>
                                    <a href="${BUILD_URL}allure/">
                                        View Allure Report
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td><b>Playwright Report</b></td>
                                <td>
                                    <a href="${BUILD_URL}Playwright_20Smoke_20Report/">
                                        View Smoke Test Report
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

            echo 'Smoke Automation Pipeline Finished.'
        }
    }
}