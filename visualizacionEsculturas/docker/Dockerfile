# Use the official Node.js 20 Alpine image as a parent image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Define a build argument for the external port
ARG EXTERNAL_PORT=8000
# Set an environment variable for the external port
ENV EXTERNAL_PORT=${EXTERNAL_PORT}

# Expose the port your app runs on
EXPOSE ${EXTERNAL_PORT}

# Start the application
CMD ["node", "./src/index.js"]