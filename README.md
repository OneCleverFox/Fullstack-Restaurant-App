# Fullstack Restaurant App

**Description:**
A Full-Stack Restaurant App built with a front-end architecture using Next.js with React, a Strapi/MongoDB database, which allows users to log in, authenticate, order from restaurants, and make payments using Stripe.

**How to Run:**
1. To run the app on your local machine, clone the files into a local directory.
2. Create a .env file with the following inputs:

```plaintext
DATABASE_CLIENT=mongo
DATABASE_NAME=strapi
DATABASE_HOST=e.g. Mongo
DATABASE_PORT=generate Port e.g. 27017
DATABASE_USERNAME=generate User
DATABASE_PASSWORD=generate strong Password
MONGO_INITDB_ROOT_USERNAME=what's the username?!
MONGO_INITDB_ROOT_PASSWORD=generate strong Password
```

3. Go to the main file and start the frontend with "npm run dev".
4. Open the back-end file and start it with "npm run develop".
5. Visit "http://localhost:3000" to use the application locally.

**Using Docker:**
1. Install Docker.
2. Use "docker-compose up" to start the backend services and build/run the image from the Dockerfile to get the front end running.
3. Start the Dockerfile in the main directory.

**Styles:**
- Bootstrap
- Reactstrap

**Architecture/Technologies:**
- Next.js
- React
- Strapi V4
- Stripe for payment
- GraphQL
- Apollo

**Note:**
Please ensure you have the necessary dependencies installed before running the application. For more information on configuration and usage, refer to the documentation of the respective technologies mentioned.