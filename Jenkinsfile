pipeline{
	agent {label 'Ubuntu'}
          parameters{
		booleanParam( name: 'Build', defaultValue: true, description: 'By default it will build' )
		booleanParam(name: 'Release', defaultValue: false, description: 'Approval Will push code to Live' )
	  }
	  environment {
                nginxImage = ''
                registry = "pratiandevops/nginx"
                registryCredential = 'PratianDockerHub'
       	  }
          stages{
        	stage('Checkout'){
                	steps{
				checkout([$class: 'GitSCM', branches: [[name: '*/master']], 
   					 doGenerateSubmoduleConfigurations: false, extensions: [], 
    					submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'PratianGitHub', 
    					url: 'https://github.com/pratiandevops/Assessment_Pratian.git']]])
			}
                }
                stage('Build'){
				when {
					expression { params.Build == true }
				}
				steps{
					echo 'Executing Build'
					//sh 'npm install --save-dev @angular-devkit/build-angular'
					sh 'ng build --prod'
					sh 'docker-compose -p $registry build'
				}
                }
		//stage('Push Image to Registory') {
                  //                              steps{
                                                        //script {
                                                            //    docker.withRegistry( '', registryCredential ) {
                                                                  //  sh 'docker push $registry:$BUILD_NUMBER'
                                                          //      }
                                                        //}
                    //                            }
                //}
                //stage('Remove Unused docker image') {
                  //                              steps{
                    //                                    sh "docker rmi $registry:$BUILD_NUMBER"
                      //                          }
                //}
                //stage('Artifactory'){
		//			echo 'Creating Artifacts'
		//			archiveArtifacts ''
		//}
       		stage('Approval'){
			when {
				expression {params.Release == true}
			}
			steps{
				script {
					input message: 'Do you Approve Deployment?', ok: 'Yes', submitter: 'assessment'
				}
			}
		}
                stage('Release'){
			when {
				expression { params.Release == true }	
			}
			steps{
				echo 'Stopping Running Container'
				sh 'docker-compose stop'
				echo 'Container Stopped'
				echo 'Starting New Updated Container'
				sh 'docker-compose up -d'
				echo 'Container is Up and Running'
			}
		}
              	//stage('Notification')
          }
}
