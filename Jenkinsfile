pipeline {

    agent any

    environment {
        GROQ_API_KEY = credentials('groq-key')
    }

    stages {

        stage('Create ENV file') {
            steps {
                sh '''
                echo GROQ_API_KEY=$GROQ_API_KEY > backend/.env
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose -f docker-compose.yml build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker compose -f docker-compose.yml up -d'
            }
        }

    }

}