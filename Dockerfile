# pull official base image
FROM node:18

# set work directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY *package*.json ./

RUN npm install
RUN npm install -g concurrently
RUN npm install -g nodemon
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./api ./api
COPY ./frontend ./frontend

EXPOSE 3000
EXPOSE 8800

CMD ["concurrently","npm:server", "npm:client"]
