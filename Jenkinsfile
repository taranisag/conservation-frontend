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
                    // Install Node.js and npm if needed
                    sh 'curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -'
                    sh 'sudo apt-get install -y nodejs'
                    // Installing project dependencies (this includes eslint if it's listed in package.json)
                    sh 'npm install'
                }
            }
        }

        stage('Run ESLint') {
            steps {
                script {
                    def junitResultsFile = "junit-results.xml"
                    def containerName = UUID.randomUUID().toString()
                    def commitId = sh(returnStdout: true, script: "git rev-parse HEAD").trim()  // Get commit ID

                    // Run a Docker container in the background
                    dockerRunCommand(buildImageCacheName, containerName, "sleep 600000", true)

                    print("commitId: ${commitId}")

                    // Get the list of committed files in the current commit
                    def committedFilesString = sh(returnStdout: true, script: "git diff-tree --no-commit-id --name-only -r ${commitId}").trim()
                    print("committedFiles: ${committedFilesString}")

                    // Split committed files into a list
                    def committedFilesList = committedFilesString.split('\n')

                    // Filter files for TypeScript files (.ts and .tsx)
                    def filteredFiles = committedFilesList.findAll { file ->
                        file.endsWith('.ts') || file.endsWith('.tsx')
                    }

                    // Check if each file exists before adding it to the list
                    def existingFiles = filteredFiles.findAll { file ->
                        sh(script: "test -e ${file}", returnStatus: true) == 0
                    }

                    // Join the filtered and existing files into a space-separated string for linting
                    def joinedFiles = existingFiles.join(' ')
                    if (joinedFiles.isEmpty()) {
                        joinedFiles = '.'  // If no files are found, lint all files
                    }

                    // Run ESLint on the selected files
                    dockerExecCommand(containerName, "npm run lint ${joinedFiles}")

                    // Remove the Docker container after linting
                    dockerRemoveContainer(containerName)
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
            echo 'Linting passed successfully!'
        }
        failure {
            echo 'Linting failed.'
        }
    }
}
