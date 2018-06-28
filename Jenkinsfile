pipeline {
  agent any
  stages {
    stage('prepare') {
      steps {
        sh '''npm i
npm test
echo "done"'''
      }
    }
  }
}