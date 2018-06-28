pipeline {
  agent any
  stages {
    stage('prepare') {
      environment {
        PATH = '/home/adrinahsm/Downloads/node-v8.11.1-linux-x64/bin'
      }
      steps {
        sh '''npm i
npm test
echo "done"'''
      }
    }
  }
}