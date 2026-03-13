pipeline {

    agent any

    stages {
        stage('Debug') {
    steps {
        sh 'pwd'
        sh 'ls -la'
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