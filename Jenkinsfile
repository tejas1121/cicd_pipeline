pipeline {

    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/tejas1121/cicd_pipeline.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                dir('ai-chatbot-devops') {
                    sh 'docker compose build'
                }
            }
        }

        stage('Run Containers') {
            steps {
                dir('ai-chatbot-devops') {
                    sh 'docker compose up -d'
                }
            }
        }

    }

}