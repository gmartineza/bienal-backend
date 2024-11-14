# Bienal Backend

## Table of Contents

- [Project Overview](#project-overview)
- [Proyect Backend Documentation](#proyect-backend-documentation)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Docker](#docker)
- [License](#license)
- [Contact Information](#contact-information)

## Project Overview

This is the backend for the Bienal project for the year of 2024.

## Proyect Backend Documentation:

This repo is part of a larger project that focuses on creating a Progressive Web Application (PWA) to manage and visualize events related to sculptors and sculptures. Through the platform, administrators will be able to add, modify, delete, and query detailed information about past and future events, sculptors, and sculptures. Meanwhile, public site users will have access to a voting system for sculptures, with authentication through social media.

There is an asociated Google Docs [file](https://docs.google.com/document/d/1w7bkSlSdHCkD9Fps0TIscYrSPX86JAmUSxahvEfqe-E/edit?tab=t.0#heading=h.vumxm8o7yv84) with aditional information.

Key features include:
- Event management (past and future)
- Sculptor and sculpture information database
- Administrative interface for CRUD operations
- Public interface for viewing events and sculptures
- Voting system for sculptures
- Social media authentication for public users

The backend provides the necessary API endpoints and data management to support these features, ensuring a seamless experience for both administrators and public users.

It includes the API for the web app developed to be deployed through microservices.

- microservices:
  - validation
  - management

## Technologies Used

- [Docker](https://www.docker.com/)
- [NodeJS](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Firebase](https://firebase.google.com/)
- [Postman](https://www.postman.com/)

## Contributing

Only students from the 3rd year of 2024 in "Universidad de la Cuenca del Plata" or professors of these students are allowed to contribute to this code.

## Docker

To build the docker images, run the `build.ps1` script in the `docker` folder. for test porpuses only.
This will build the images and run the containers in detached mode.

### Docker Compose

Note: The Docker Compose files will be implemented as time progresses. Right now no docker compose files are available.

## License

This project is licensed under the MIT License. See the [LICENSE](License) file for details.

## Contact Information

For any questions, please contact:
- **University**: [Universidad de la Cuenca del Plata](https://www.ucp.edu.ar/)