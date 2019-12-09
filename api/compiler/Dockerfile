FROM node:12.13.1
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 2599
CMD ["npm", "start"]

