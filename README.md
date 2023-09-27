[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# Assignment 

This branch will solely be for assignments under CS3219 AY2324 S1 Assignments component. Note that we have initially combined Assignments 1 to 3 before proceeding with Assignments 4 and 5.

## Tech Stack Used

- React (A1-A3)
- MongoDB (A1-A3)
- PostgreSQL (A1-A3)
- Docker (A4)
- Websocket (A5)

## Getting Started

### Installation of Assignment Releases

As per the assignment instructions, we have tagged the end of each individual assignment. Given that we decided to clump up the assignments, you can immediately download the release tagged under Assignment-4 to test Assignments 1 to 4. 

### Setting up your environment

The assignment requires some environment variables to be set to work properly. 
In the `backend` folder, create a `.env` file with the contents below:

```
JWT_SECRET = 
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_DB='cs3219'
POSTGRES_PASSWORD=
POSTGRES_PORT=5432
MONGO_URL='mongodb+srv://yeeming:sushiMilk@cluster0.j1a3k0n.mongodb.net/questions?retryWrites=true&w=majority'
```

1. `JWT_SECRET`: This can be any string such as 'cs3219' or 'iLovePeerPrep'.
2. `POSTGRES_HOST`: This should be the hostname or IP address of your PostgreSQL database server. If your database is running locally on the same machine, you can use 'localhost'. If your database is hosted elsewhere, provide the appropriate hostname or IP address. E.g. 'postgres' if running with Docker.
3. `POSTGRES_USER`: This should be the username used to authenticate with your PostgreSQL database.
4. `POSTGRES_DB`: This is the name of the PostgreSQL database you want to connect to. In this case, we will use 'cs3219' since it is later being used to initialize my PostgreSQL database within Docker. 
5. `POSTGRES_PASSWORD`: This is the password associated with the specified PostgreSQL user.
6. `POSTGRES_PORT`: This is the port number on which PostgreSQL is listening. The default port for PostgreSQL is usually '5432'.
7. `MONGO_URL`: This will access my pre-populated Mongo Atlas.

## Running without Docker

### Setting up your PostgreSQL database

For this assignment, the PostgreSQL database will only be used to store users. We can setup our database as such.

Log in to your PostgreSQL in your terminal, and key in your password when prompted.
```
> psql -U <username>
```
Initialize the PostgreSQL database.
```
CREATE DATABASE cs3219;
```
Connect to the datbase
```
\c cs3219
```
Create an extension `uuid-ossp`.
```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
Create the users table.
```
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'regular' NOT NULL
);
```
Congratulations, you will now be able to register and create a regular account.

### Creating Maintainer Account

In this assignment, we have defined 2 user roles:
- `regular`: Able to view list of questions, update and delete account.
- `maintainer`: Able to do everything a regular user can do. Able to add and delete questions.

In order to create a `maintainer` role, you can run this command in your PostgreSQL database.
```
UPDATE users
SET role = 'maintainer'
WHERE username = '<username>' AND email = '<email>';
```

## Running with Docker

### Configuring your PostgreSQL Database Initialization Script
Under `backend/init-scripts`, you will find the `init.sql` file.

If you had previously created the PostgreSQL database `cs3219`, do comment out the which creates the database in `init.sql`.
```
-- Create the database
-- Comment the line below if you have already created the DATABASE
CREATE DATABASE cs3219;
```

Replace the comments with a `username` and a valid `email`.
```
-- Insert the sample user data
-- Your password is: password
INSERT INTO users (username, email, password, role)
VALUES (/**REPLACE WITH YOUR USERNAME*/, /**REPLACE WITH YOUR EMAIL*/, '$2b$10$.xLOlt02JRpi9W4gzp4piuP9SlZQowtrdc8IXIbZrYsxsTDknJSjq', 'maintainer');

/**
Example:
INSERT INTO users (username, email, password, role)
VALUES ('yeeming1108', 'yeeming1108@hotmail.com', '$2b$10$.xLOlt02JRpi9W4gzp4piuP9SlZQowtrdc8IXIbZrYsxsTDknJSjq', 'maintainer');
*/
```


### Setting up your environment
Under `backend`, you will find the `.env` file.
 
If you had previously ran the application on `localhost`, you will need to change your host to `postgres`.
```
POSTGRES_HOST='postgres' # if using docker
```

Proceed to build the Docker image.
```
docker compose up --build
```

Once completed, you should be able to access the application on `localhost:3000`.

