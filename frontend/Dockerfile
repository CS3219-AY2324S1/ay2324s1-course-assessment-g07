# Define the image you want to build from.
FROM node:18-alpine

# Create app directory to hold application code inside the image.
WORKDIR /usr/src/frontend-service

# Copy package.json and package-lock.json to the app directory on the image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Bundle the app's source code inside the Docker image.
COPY . .

# Expose port 3000
EXPOSE 3000 

# Build and Run the app
CMD npm run build && npm run start
