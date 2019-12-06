# Pulling Base Image 
FROM node:alpine AS builder

# WORKING Directory
WORKDIR /home/node/app

# Copying package file  From Host machiene to Container
COPY package*.json ./


# Installing Dependencies for building Node Js APP
RUN npm i 
RUN npm install --save-dev @angular-devkit/build-angular
RUN npm i @angular/cli -g



# Copying application Code to container 
COPY ./ ./

# Building Node Js App
Run ng build --prod
