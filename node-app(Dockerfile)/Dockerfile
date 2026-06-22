#Base Image
FROM node:20.20.2-alpine3.22

WORKDIR /home/app

COPY package*.json . 
RUN npm install

#Copying the source code to docker image
COPY index.js index.js


CMD [ "npm", "start" ]