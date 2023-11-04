# Define the image you want to build from.
FROM node:18-alpine as build

# Create app directory to hold application code inside the image.
WORKDIR /app

# Copy package.json and package-lock.json to the app directory on the image.
COPY . ./

# Install dependencies.
RUN npm install

FROM node:18-alpine as main

# Bundle the app's source code inside the Docker image.
COPY --from=build /app /

# Expose port 3000
EXPOSE 3000 

# Build and Run the app
CMD ["npm", "run", "dev"]
