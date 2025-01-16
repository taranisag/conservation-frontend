pipeline {
    agent any  

    stages {
        stage('Checkout') {
            steps {
                // Pulls the code from the repository
                git branch: "${env.BRANCH_NAME}", url: 'https://github.com/taranisag/conservation-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Installing project dependencies (this includes eslint if it's listed in package.json)
                    sh 'npm install'
                }
            }
        }

        stage("Run ESLint") {
            steps {
                script {
                    def junitResultsFile = "junit-results.xml";
                    def containerName = UUID.randomUUID().toString();
                    dockerRunCommand(buildImageCacheName, containerName, "sleep 600000", true);
                    print("commitId: ${commitId}");
                    def committedFilesString = sh(returnStdout: true, script: "git diff-tree --no-commit-id --name-only -r ${commitId}").trim()

                    print("committedFiles: ${committedFilesString}");

                    def committedFilesList = committedFilesString.split('\n')

                    def filteredFiles = committedFilesList.findAll { file ->
                        file.endsWith('.ts') || file.endsWith('.tsx')
                    }

                    // Check if each file exists before adding it to the list
                    def existingFiles = filteredFiles.findAll { file ->
                        sh(script: "test -e ${file}", returnStatus: true) == 0
                    }

                    // Run ESLint on filtered files, or change to '.' to lint all files
                    def joinedFiles = existingFiles.join(' ')
                    if (joinedFiles.isEmpty()) {
                        joinedFiles = '.'
                    }

                    dockerExecCommand(containerName, "npm run lint ${joinedFiles}");
                    dockerRemoveContainer(containerName);
                }
            }
        }

        stage('Post-Test Actions') {
            steps {
                script {
                    // Add post-test actions here, e.g., clean up, archive lint reports
                    echo 'Linting is complete.'
                }
            }
        }
    }

    post {
        success {
            echo ' passed successfully!'
        }
        failure {
            echo ' failed.'
        }
    }
}
