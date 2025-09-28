# Neon + Express.js Project

En Node.js applikation med Express och Neon PostgreSQL databas.

# Docker instructions:

docker build -t login-api .

# Run container

docker run -p 3000:3000 --env-file .env login-api
