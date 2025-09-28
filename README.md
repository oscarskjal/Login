# Neon + Express.js Project

En Node.js applikation med Express och Neon PostgreSQL databas.

## Quick Start with Docker Compose

```bash
docker compose up --build
```

This will:

- Build the Docker image
- Start the container
- Map port 3000 to your host machine
- Load environment variables from .env file

## Manual Docker Instructions

### Build the image:

```bash
docker build -t login-api .
```

### Run container:

```bash
docker run -p 3000:3000 --env-file .env login-api
```

## Stop the application

```bash
docker compose down
```
