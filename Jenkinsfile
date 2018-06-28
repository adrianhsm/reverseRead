pipeline {
  agent any
  stages {
    stage('prepare') {
      steps {
        sh '''echo "start for preparation"
npm i
npm test
echo "done"'''
      }
    }
  }
}