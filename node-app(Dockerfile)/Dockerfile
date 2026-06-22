#Base Image
FROM node:20.20.2-alpine3.22

WORKDIR /home/app

COPY package*.json . 
RUN npm install

#Copying the source code to docker image
COPY index.js index.js

EXPOSE 8000-8005

CMD [ "npm", "start" ]


#docker run -it -P first_image ---> for dynamic port mapping
#docker run -itd -P --rm first_image ---> for detaching and automatically deleting container
#docker stop <id> ---> to stop container