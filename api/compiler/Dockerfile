FROM ubuntu
MAINTAINER Kush, kush.kumar@pratian.com
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y tzdata && \
    apt-get install -y nginx && \
    apt-get upgrade -y && \
    apt-get install -y  software-properties-common && \
    apt-get install g++ -y && \
    apt-get install build-essential -y && \
    apt-get install openjdk-8-jdk -y && \
    apt-get install python -y && \
    apt-get install mono-mcs -y  && \
    apt-get install nodejs -y && \
    apt-get install npm -y && \
    apt-get update && \
    apt-get clean

COPY ./ /var/www/html