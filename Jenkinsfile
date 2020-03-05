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
						echo 'Now building Scouce Code for production build'
						sh 'ng build --prod'
						echo 'Souce code has been build and build artifacts has been stored in the "dist/" directory'
						echo '########started image building'
						sh "docker-compose build"
						//script {
						//	echo 'Now creating nginx container using docker-compose.yaml file. we also used "-p" to Specify an alternate project name(image name in this case by default it takes directory name)'
						//	nginxImage = sh 'docker-compose -p $registry:$BUILD_NUMBER build'
						//	echo 'container creation has been done'
							// trying to check the value of the variable
						//	echo "${nginxImage}"
						//}
				}
                }
		stage('Push Image to Registory') {
                                                steps{
							sh "docker tag $registry:latest $registry:$BUILD_NUMBER"
							//sh "docker login -u=pratiandevops -p=J@1matad! ${env.REGISTRY_ADDRESS}"
							//sh "docker-compose $registry:$BUILD_NUMBER push"
                                                        script {
                                                                docker.withRegistry( '', registryCredential ) {
									sh 'docker push $registry:$BUILD_NUMBER'
							//		nginxImage.push()
                                                                }
								echo 'image $registry:$BUILD_NUMBER has been pushed to dockerHub'
                                                        }
                                                }
                }
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
				echo 'Starting New Updated Container in detached mode'
				sh 'docker-compose up --no-build -d'
				echo 'Container is Up and Running'
			}
		}
              	//stage('Notification')
          }
}
