pipeline {
  agent any
  stages {
    stage('Pull code') {
      steps {
        git(url: 'git@github.com:adrianhsm/reverseRead.git', branch: 'master')
      }
    }
  }
  environment {
    GIT_ASKPASS = 'false'
  }
}