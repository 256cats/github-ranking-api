
## Project Synopsis

Welcome to the GitHub Ranking API. The app is containerized with support for environment variables, ready for deployment to any container registry and execution in the cloud (e.g. AWS ECS / EKS / Kubernetes).

We provide a Docker-compose stack to facilitate streamlined development and testing.

## Technologies Overview

This project employs various cutting-edge technologies:

- **Node.js**: A JavaScript runtime environment.
- **TypeScript**: An extension of JavaScript that introduces static typing.
- **Express** ([ExpressJS](https://expressjs.com/)): A flexible and minimalistic web application framework.
- **Nest.js** ([Nest.js](https://nestjs.com/)): A progressive Node.js framework designed for building efficient and scalable server-side applications.
- **Prisma** ([Prisma](https://www.prisma.io/)): An ORM for robust database management.
- **Pino** ([Pino](https://github.com/pinojs/pino)): A high-speed logging tool enhancing application diagnostics.
- **Jest/TS-Jest**: Comprehensive frameworks for unit and integration testing.
- **Eslint, Prettier**: Tools committed to ensuring code quality and consistency.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Swagger-UI** ([Swagger UI](https://swagger.io/tools/swagger-ui/)): Provides interactive API documentation and exploration.
- **Prometheus**: A tool for detailed monitoring and performance analysis.
- **Docker**: Containerization of the app with support for environment variables, ready for deployment to any container registry and execution in the cloud.

## Assumptions

1. The user access pattern is currently unknown, such as whether requests will mainly seek the latest data or be uniformly distributed over time. Thus, we've implemented a basic in-memory cache for the `/github-ranking/` endpoint. As user access patterns become clearer, we plan to optimize parts of the application (e.g., splitting hot/cold storage, adding a Redis cache, etc.).
2. Presently, the data source is exclusively https://github.com/EvanLi/Github-Ranking/tree/master/Data (provided as a Git submodule). Additional data sources can be easily incorporated.

## Running the API Locally

To launch the API in your local environment, follow these steps:

1. Generate your environment file by copying `backend/.env.example` to `backend/.env`.
2. Start the application using docker-compose:

    ```bash
    docker-compose up
    ```

    This command starts the REST API server, initializes PostgreSQL, loads sample data, and makes the API accessible at `localhost:3000`.

## Exploring the API Routes

Explore the API's capabilities through these endpoints:

- **GitHub Ranking by Date and Language**: Access top GitHub repositories sorted by date and language. Example: [Javascript, 2018-12-20](http://localhost:3000/github-ranking/2018-12-21/javascript?limit=50). The `limit` parameter is optional: http://localhost:3000/github-ranking/2018-12-21/javascript?limit=50
- **Swagger UI**: Interact with our API and explore documentation at [Swagger UI](http://localhost:3000/docs/).
- **API Metrics**: Assess API performance using [Prometheus metrics](http://localhost:3000/metrics).

## Loading Data

All data originates from https://github.com/EvanLi/Github-Ranking/tree/master/Data and is processed using `prisma/seed.ts`. To facilitate API testing, this repository includes a sample of 1,000,000 records.

To load all data (skipping existing entries):

```bash
docker exec -it ranking_backend /bin/bash
npm run seed-docker
```

## Updating the Database Schema

To alter the database schema:

1. Modify `backend/prisma/schema.prisma`.
2. Implement your changes with Prisma:

    ```bash
    npx prisma migrate dev
    ```

    This command updates the database schema and regenerates the Prisma client.

## Executing Tests

To conduct testing, proceed as follows:

1. Enter the application container:

    ```bash
    docker exec -it ranking_backend /bin/bash
    ```

2. Run tests using the following commands:
    - For unit and integration tests:

        ```bash
        npm run test
        ```

    - For integration tests with a database reset (WARNING: This will erase all data):

        ```bash
        npm run test:e2e
        ```
