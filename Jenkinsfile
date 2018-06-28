pipeline {
  agent any
  stages {
    stage('prepare') {
      steps {
        sh '''echo "start for preparation"
bash -c "echo $PATH"
bash -c "npm i"
bash -c "npm test"
echo "done"'''
      }
    }
  }
}