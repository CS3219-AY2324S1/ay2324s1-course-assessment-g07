# Define the base image you want to build from.
# In this case, we are using the latest LTS (long term support) version of Node.
FROM node:20-alpine as build

# Create app directory to hold application code inside the image.
WORKDIR /app

# Copy package.json and package-lock.json to the app directory on the image.
COPY . ./

# Install dependencies.
RUN npm install

FROM node:20-alpine as main

# Bundle the app's source code inside the Docker image.
COPY --from=build /app /

# Expose the required ports for RabbitMQ and Kafka.
# Adjust the port numbers if needed.
EXPOSE 8002

# Define the command to run your app and start RabbitMQ and Kafka containers using CMD.
CMD ["npm", "start"]