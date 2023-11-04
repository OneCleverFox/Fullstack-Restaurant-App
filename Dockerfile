FROM node:18

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y ca-certificates
RUN npm cache clean --force

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm config set strict-ssl false
RUN npm config set registry http://registry.npmjs.org/
RUN npm install 


# copying source files
COPY . /usr/src/app/

# Building app
RUN npm run build 
EXPOSE 3000

# Running the app
CMD npm run dev