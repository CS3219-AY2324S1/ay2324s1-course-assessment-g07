# Define the image you want to build from.
FROM node:18-alpine as build

# Create app directory to hold application code inside the image.
WORKDIR /app

# Copy package.json and package-lock.json to the app directory on the image.
COPY package*.json ./

# Install dependencies.
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine as main

COPY --from=build /app ./

# Expose port 3000
EXPOSE 3000 

# Run the app
CMD ["npm", "start"]
