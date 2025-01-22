pipeline {
    agent any  

    stages {

        stage('Post-Test Actions') {
            steps {
                script {
                    echo 'Jenkins Tests are complete.'
                }
            }
        }
    }

    post {
        success {
            echo 'Tests passed successfully!'
        }
        failure {
            echo 'Tests failed.'
        }
    }
}
