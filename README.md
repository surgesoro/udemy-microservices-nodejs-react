# udemy-microservices-nodejs-react

Abbreviations:

- msn - **m**icro**s**ervices + **n**ode

Local Dev Env:

- Host: MacBook Air M1
- OS: Big Sug 11.4
- Docker Desktop: 4.0.1
- Docker Engine: 20.10.8
- Kubernetes: 1.21.2

Prerequisites:

## Repo Structure

- ./blog - Simple blog app, that allows anyone to create posts and comments; INCLUDES: React, Node, Express, Docker, wired for K8s, simple custom build simple Event Bus for messaging; EXCLUDES: DB and robust Event Bus; ENVIRONMENT: Local machine run
- ./ticketing-gcp - Simple ticketing app, that allows users to singup/login, purchase tickets. During checkout tickets are timer controlled on hold to prevent other users from purchasing the same ticket; INCLUDES: React, TypeScript, Node, Express, Docker, wired for K8s + MORE; EXCLUDES: TBD; ENVIRONMENT: GCP
- ./ticketing-az - TBD to work with Azure
- ./ticketing-aws - TBD to work with AWS
- ./ticketing - TBD to work in local dev
