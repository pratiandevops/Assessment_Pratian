pipeline{
	agent {label 'Ubuntu'}
          parameters{
		booleanParam( name: 'Build', defaultValue: true, description: 'By default it will build' )
		booleanParam(name: 'Release', defaultValue: false, description: 'Approval Will push code to Live' )
	  }
	  environment {
                nginxImage = ''
		REGISTRY_ADDRESS = "hub.docker.com"
                registry = "pratiandevops/devops"
                registryCredential = 'PratianDockerHub'
       	  }
          stages{
        	stage('Checkout'){
                	steps{
				checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], gitTool: 'default', submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'PratianGithubAccount', url: 'https://github.com/pratiandevops/Assessment_Pratian.git']]])
			}
                }
                stage('Building Source Code & Creating Image'){
				when {
					expression { params.Build == true }
				}
				steps{
						echo 'Executing Build steps'
						echo 'First installing NPM dependencies'
						sh 'npm i'
						echo 'dependencies has been installed'
						//sh 'npm install --save-dev @angular-devkit/build-angular'
						// 'Now building Scouce Code for production build'
						echo 'Building code'
						sh 'ng build --prod'
						// 'Souce code has been build and build artifacts has been stored in the "dist/" directory'
						echo 'Build completed'
						echo '########Started Image Creation###############'
						//Now creating nginx custom image using docker-compose.yaml file
						sh "docker-compose build"
						echo '###########Image creation completed##########'
						//script {
						//	nginxImage = sh 'docker-compose -p $registry:$BUILD_NUMBER build'
						//	echo 'container creation has been done'
							// trying to check the value of the variable
						//	echo "${nginxImage}"
						//}
				}
                }
		stage('Push Image to Registory') {
                                                steps{
							// Tagging the image we created 
							sh "docker tag $registry:latest $registry:$BUILD_NUMBER"
                                                        script {
                                                                docker.withRegistry( '', registryCredential ) {
									echo 'pushing image to repository'
									// with below command we loggingin into dockerhub	
									sh 'docker login docker.io'
									// pushing generated image into dockerhub
									nginxImage = sh 'docker push $registry:$BUILD_NUMBER'
                                                                }
								echo 'image ${nginxImage} has been pushed to dockerHub'
                                                        }
                                                }
                }
                stage('Remove Unused docker image') {
                                                steps{
                                                        sh "docker rmi $registry:$BUILD_NUMBER"
                                                }
                }
                //stage('Artifactory'){
		//			echo 'Creating Artifacts'
		//			archiveArtifacts 'dist/'
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
				echo 'Starting New Updated Container in detached mode'
				//sh 'docker-compose up --no-build -d'
				sh 'docker-compose start'
				echo 'Container is Up and Running'
			}
		}
              	//stage('Notification')
          }
}
