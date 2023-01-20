# Office Reservation App

In this project you will develop an office reservation app. This app should have CRUD operations for Organizations, Offices and Desks that are working with a Mongo database. Only a logged-in user can use these CRUD operations. In this app, you should register a user with an endpoint. You should develop a Jason Web Token (JWT) refresh and access token mechanism for handling user security. We expect you to implement this application with some features as detailed below:

##Features required to complete this project:
* Project should be implemented in NodeJs
* Project design is up to your creativity
* Project should be implemented with Typescript
* Use Schemas with Zod for validation
* Use NodeJs security with any library you prefer that enables refresh and
access tokens to implement user login
* There will be roles for each user like "SUPER_ADMIN, ADMIN , USER"
* SUPER_ADMIN will be able to list all organizations, create organizations and
offices.
* ADMIN should be able to create Users for his or her organization.
* There should be a Swagger UI documentation for each endpoint.
* There should be a cron job that deletes desk reservations at the end of each
month
* You should deploy your application to AWS EC2 instance so it can be accessible
from internet


## Usage

```javascript
node app
```
