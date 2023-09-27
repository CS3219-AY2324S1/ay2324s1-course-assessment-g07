-- Create the database
-- Comment the line below if you have already created the DATABASE
CREATE DATABASE cs3219;

-- Connect to the database
\c cs3219;

-- Create the 'uuid-ossp' extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'regular' NOT NULL
);

-- Insert the sample user data
-- Your password is: password
INSERT INTO users (username, email, password, role)
VALUES (/**REPLACE WITH YOUR USERNAME*/, /**REPLACE WITH YOUR EMAIL*/, '$2b$10$.xLOlt02JRpi9W4gzp4piuP9SlZQowtrdc8IXIbZrYsxsTDknJSjq', 'maintainer');

/**
Example:
INSERT INTO users (username, email, password, role)
VALUES ('yeeming1108', 'yeeming1108@hotmail.com', '$2b$10$.xLOlt02JRpi9W4gzp4piuP9SlZQowtrdc8IXIbZrYsxsTDknJSjq', 'maintainer');
*/
