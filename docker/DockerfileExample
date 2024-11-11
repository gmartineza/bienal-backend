# Use the official Node.js 20 Alpine image as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Print package.json (for debugging)
RUN cat package.json

# Install dependencies
RUN npm cache clean --force
RUN npm install --verbose

# Copy the rest of your app's source code
COPY . .

# build the server file
RUN npm run build

# Define a build argument for the external port
ARG EXPRESS_PORT=80
# Set an environment variable for the external port
ENV PORT=${EXPRESS_PORT}

# Expose the port your app runs on
EXPOSE ${EXPRESS_PORT}

# Start the application
CMD ["npm", "run", "start"]