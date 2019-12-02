pipeline{
	agent {label 'Ubuntu'}
          parameters{
		booleanParam(name: 'Release', defaultValue: false, description: 'Approval Will push code to Live' )
	  }
	  environment {
                nginxImage = ''
                registry = "vmady/assesment_pratian"
                registryCredential = 'docker-hub-credentials'
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
					sh 'npm install --save-dev @angular-devkit/build-angular'
					sh 'ng build --prod'
					sh 'docker-compose -t $registry:$BUILD_NUMBER build'
				}
                }
		stage('Push Image to Registory') {
                                                steps{
                                                        //script {
                                                                //docker.withRegistry( '', registryCredential ) {
                                                                        sh 'docker push $registry:$BUILD_NUMBER'
                                                                //}
                                                        //}
                                                }
                }
                stage('Remove Unused docker image') {
                                                steps{
                                                        sh "docker rmi $registry:$BUILD_NUMBER"
                                                }
                }
                //stage('Artifactory'){
		//			echo 'Creating Artifacts'
		//			archiveArtifacts ''
		//}
       		//stage('Approval'){

		//}
                //stage('Release'){

		//}
                //stage('Notification')
          }
}
