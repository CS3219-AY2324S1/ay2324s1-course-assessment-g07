# Define the base image you want to build from.
# In this case, we are using the latest LTS (long term support) version of Node.
FROM node:18-alpine

# Create app directory to hold application code inside the image.
WORKDIR /usr/src/matchmaking-service

# Copy package.json and package-lock.json to the app directory on the image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Uncomment the following line if you are building code for production.
RUN npm ci --omit=dev

# Bundle the app's source code inside the Docker image.
COPY . .

# Expose the required ports for RabbitMQ and Kafka.
# Adjust the port numbers if needed.
EXPOSE 8002
EXPOSE 5672
EXPOSE 9092

# Define the command to run your app and start RabbitMQ and Kafka containers using CMD.
CMD ["sh", "-c", "docker-compose up -d && npm start"]

# apparently need to make some changes, and its not good pracitce to have a docker within a docker in production
# gotta find another workaround...see the merlin chat on this