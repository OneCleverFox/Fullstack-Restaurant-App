# Fullstack-Restaurant-App

**Description:**
Full-Stack Restaurant App that was built with Front-End architecture developed with Next.js using React, a Strapi/MongoDB database, that allows the user to log in, become authenticated, order from restuarants and submit a payment using Stripe.  

**How to Run:**
1-To Run on your machine, pull the files into a local folder,
2-install Docker, 
3-generate a .env file with following input:

DATABASE_CLIENT=mongo
DATABASE_NAME=strapi
DATABASE_HOST=e.g.Mongo
DATABASE_PORT=generate Port e.g. 27017
DATABASE_USERNAME=generate User
DATABASE_PASSWORD=generate strong Password
MONGO_INITDB_ROOT_USERNAME=whats the username?!
MONGO_INITDB_ROOT_PASSWORD=generate strong Password

4-"docker-compose up"  to start the backend files, 
and build and run the image from the Dockerfile to get the front end running.  
5- start the  Dockerfile in the main directory



**Styles:**
bootstrap --> reactstrap



**Architecture/Technologie:**

next.js
React
Strapi V4
Stripe for payment
