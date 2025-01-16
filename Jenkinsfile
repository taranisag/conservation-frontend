pipeline {
    agent any  

    stages {

        stage('Post-Test Actions') {
            steps {
                script {
                    // Add post-test actions here, e.g., clean up, archive test reports
                    echo 'Tests are complete.'
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
