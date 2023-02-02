# Office Reservation App

In this project, I develop an office reservation app. This app should have CRUD operations for Organizations, Offices and Desks that are working with a Mongo database. Only a logged-in user can use these CRUD operations. In this app, I register a user with an endpoint. I develop a Jason Web Token (JWT) refresh and access token mechanism for handling user security.


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
* Application is deployed to AWS EC2 instance so it can be accessible
from internet


## Usage
In order to install required packages, once you clone the code first run the command below:
```javascript
npm install
```
To run the app:
```javascript
node app
```

## Project codes on the github:
To access project codes click [here](https://github.com/rukiyeaslan/office-reservation-app/tree/main) 

## Access on the Internet(coming soon...)
[Office Reservation App](http://www.google.tr/ "office-reservation-app")

# Some useful info for the project implementation in general
## Github commands to push code from local to remote repo
- git init
- git add README.md
- git commit -m "commit message"
- git remote add origin (link)
- git branch -M main 
    - if branch is main and pushing an existing repository
- git pull 
    - if the repo has difference with local 
- git push -u origin main


## .gitignore file
- There may be some files/folders that we do not want to push to github.
- We put these files/directories'names to .gitignore file, so wehen we push the project, these will be ignored.
- .gitignore file has to be in the root folder.
- For more info click [here](https://www.freecodecamp.org/news/gitignore-file-how-to-ignore-files-and-folders-in-git/)


