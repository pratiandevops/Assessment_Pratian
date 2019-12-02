pipeline{
          agent (label, Ubuntu)
          parameters{
		booleanParam(name: 'Release', defaultValue: false, description: 'Approval Will push code to Live' )
	  }
          stages{
        	stage('Checkout'){
                	steps{
				checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], 					userRemoteConfigs: [[url: 'https://github.com/pratiandevops/Assessment_Pratian.git']]])
			}
                }
                stage('Build'){
				steps{
					echo 'Executing Build'
					sh 'ng build --prod'
    					sh 'docker-compose build'
				}
                }
                //stage('Artifactory'){

		//}
       		//stage('Approval'){

		//}
                //stage('Release'){

		//}
                //stage('Notification')
          }
}
