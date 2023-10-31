FROM node:18

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm config set strict-ssl false
RUN npm install 

# copying source files
COPY . /usr/src/app/

# copy Root-CA-Zertifikate to container
COPY Certification/Baltimore.cer /usr/src/Certification/Baltimore.cer
COPY Certification/DigiCert.cer /usr/src/Certification/DigiCert.cer
COPY Certification/GlobalSign.cer /usr/src/Certification/GlobalSign.cer
COPY Certification/VeriSign.cer /usr/src/Certification/VeriSign.cer

RUN update-ca-certificates

RUN npm config set strictSSL false
RUN npm config set registry http://registry.npmjs.org/


# Building app
RUN npm run build 
EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"