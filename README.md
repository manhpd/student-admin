# Student Admin

## Prerequisite
 1. Express JS
 2. mysql
 3. mocha
 4. chai
 5. chai-http

## Installation
 1. clone the repository ```git clone https://github.com/tariqulislam/express-mysql-rest.git```
 2. run command for npm ```npm install``` 
 3. configur databse connection in database.js
 4. create table in mysql ```CREATE TABLE IF NOT EXISTS teacherStudent (
    teacher VARCHAR(45) NOT NULL,
    student VARCHAR(45) NOT NULL,
    isDispend BOOLEAN DEFAULT '0'
)  ;```
 5. run unit test command  ```npm test tests\commonstudents.js```
 6. starting the server ```npm start```
 
## Deployserver: http://ec2-34-217-32-233.us-west-2.compute.amazonaws.com:3000/api


