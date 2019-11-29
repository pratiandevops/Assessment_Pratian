FROM nginx:alpine

LABEL author="Santosh Kumar Senapati" 

# Copy custom nginx config
COPY ./.docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8008 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]