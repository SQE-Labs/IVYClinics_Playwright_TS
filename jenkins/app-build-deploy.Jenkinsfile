pipeline {

    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        APP_NAME = "IVY Clinics"
        ENV = "DEV"
    }

    stages {

        stage('Checkout Source Code') {
            steps {

                echo "========================================="
                echo "        IVY CLINICS CI/CD PIPELINE"
                echo "========================================="

                echo "Checking out latest application source code..."

                /*
                 REAL PROJECT

                 checkout scm

                 OR

                 git branch: 'main',
                     url: 'https://github.com/company/application.git'
                */
            }
        }

        stage('Build Application') {
            steps {

                echo "Building ${APP_NAME}..."

                /*
                 REAL PROJECT

                 Maven
                 mvn clean package

                 Gradle
                 gradlew clean build

                 React / Angular
                 npm run build

                 .NET
                 dotnet build
                */

                echo "Application Build Successful."
            }
        }

        stage('Deploy to DEV Environment') {
            steps {

                echo "Deploying application to ${ENV}..."

                /*
                 REAL PROJECT

                 Docker
                 docker compose up -d

                 Kubernetes
                 kubectl apply -f deployment.yaml

                 Tomcat
                 Copy WAR to webapps

                 Azure
                 az webapp deploy
                */

                echo "Deployment Successful."
            }
        }

        stage('Verify Deployment') {
            steps {

                echo "Performing Health Check..."

                /*
                 REAL PROJECT

                 curl http://dev-app-url/health

                 OR

                 curl http://dev-app-url/actuator/health

                 OR

                 kubectl get pods
                */

                echo "Application is UP and Running."
            }
        }

        stage('Trigger Smoke Automation') {
            steps {

                echo "Deployment Verified."

                echo "Triggering Smoke Automation Pipeline..."

                build job: 'IVY-Smoke-Automation',
                        wait: true,
                        propagate: true
            }
        }
    }

    post {

        success {

            echo "========================================="
            echo "BUILD & DEPLOYMENT COMPLETED SUCCESSFULLY"
            echo "Smoke Automation Triggered"
            echo "========================================="
        }

        failure {

            echo "========================================="
            echo "PIPELINE FAILED"
            echo "Smoke Automation Not Triggered"
            echo "========================================="
        }

        always {
            echo "Pipeline Finished."
        }
    }
}