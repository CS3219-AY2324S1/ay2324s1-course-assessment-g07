# Define the image you want to build from.
# In this case, we are using the latest LTS (long term support) version of Node.
FROM node:18-alpine as build

# Create app directory to hold application code inside the image.
WORKDIR /app

# The image comes with Node.js and NPM already installed.
# We just need to install the rest of our dependencies.
# Copy package.json and package-lock.json to the app directory on the image.
COPY . ./

# Install dependencies.
RUN npm install

FROM node:18-alpine as main

# Bundle the app's source code inside the Docker image.
COPY --from=build /app /

# Expose port 7000
EXPOSE 7000

# Define the command to run your app using CMD which defines your runtime.
CMD [ "npm", "start" ]