# Office Reservation App

In this project, I developed an office reservation app. This app should have CRUD operations for Organizations, Offices and Desks that are working with a Mongo database. Only a logged-in user can use these CRUD operations. In this app, I register a user with an endpoint. I develop a Jason Web Token (JWT) refresh and access token mechanism for handling user security.


## Features in this project:
* Project is implemented in NodeJs
* Project design is up to my creativity
* Project is implemented with Typescript
* Schemas with Zod are used for validation
* NodeJs security with any library that I prefer that enables refresh and
access tokens is used to implement user login
* There are roles for each user like "SUPER_ADMIN, ADMIN , USER"
* SUPER_ADMIN is able to list all organizations, create organizations and
offices.
* ADMIN is able to create Users for his or her organization.
* There is a Swagger UI documentation for each endpoint.
* There is a cron job that deletes desk reservations at the end of each
month


## Usage
In order to install required packages, once you clone the code first run the command below:
```javascript
npm install
```
To run the app:
```javascript
npm run dev
```


