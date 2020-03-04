# Pulling Base Image 
#FROM node:12.13.1 AS builder

# WORKING Directory
#WORKDIR /home/node/app

# Copying package file  From Host machiene to Container
#COPY package*.json ./


# Installing Dependencies for building Node Js APP
#RUN rm -rf node_modules
 
#RUN npm install --save-dev @angular-devkit/build-angular
#RUN npm i @angular/cli -g
#RUN npm install
#RUN npm install ngx-monaco-editor --save (no need to run this)


# Copying application Code to container 
#COPY ./ ./

# Building Node Js App
#Run ng build --prod


#Nginx Containerization
FROM nginx:alpine

LABEL author="vikashkumar" 

# Copy custom nginx config
COPY ./.docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8008

ENTRYPOINT ["nginx", "-g", "daemon off;"]
