pipeline {
  agent any
  stages {
    stage('prepare') {
      steps {
        sh '''echo $PATH
npm i
npm test
echo "done"'''
      }
    }
  }
}