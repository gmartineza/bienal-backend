# Container Configuration

In this folder, you will find the configuration for the containers for each microservice. For more information on how to use Docker, please refer to the [Docker Documentation](https://docs.docker.com/).

## Dockerfile Template

This [file](#dockerfileExample) is used as a template for al the dockerfile´s in every service

The image [node:20-alpine](https://hub.docker.com/_/node/) is used as the base for all the services, it contains the minimum required for a linux image specified by the [Alpine standarts](https://www.alpinelinux.org/about/), and also contains the Node.js runtime in it´s 20th version. This Node version is required because some of the services packages are not compatible with newest version, also because it was developed in this one so it´s easy to keep track of npm package compatibilities.