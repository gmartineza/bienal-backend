# Use the official Node.js 20 Alpine image as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Print package.json (for debugging)
RUN cat package.json

# Install dependencies
RUN npm install --verbose && npm cache clean --force

# Copy the rest of your app's source code
COPY . .

# Build the server file
RUN npm run build

# Define a build argument for the port and set it as an environment variable
ARG EXPRESS_PORT=80
ENV PORT=${EXPRESS_PORT}

# Expose a default port
EXPOSE 80

# Start the application
CMD ["npm", "run", "start"]