# Keystone Web Interface

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/e20bea54965a48d892e5939b15f6ba85)](https://app.codacy.com/gh/pitt-crc/keystone-web/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

The frontend web interface for the Keystone allocation management dashboard.

## Resources

- [Keystone-API](https://github.com/pitt-crc/keystone-api): Backend REST API for managing HPC allocations and resources.
- [Keystone-Web](https://github.com/pitt-crc/keystone-web): Website frontend for HPC administration and self-service.
- [Keystone-Docs](https://github.com/pitt-crc/keystone-docs): Documentation for the Keystone project and its components.

## Installation

To install the Keystone web interface, choose from one of the following options.

### Using Docker

Using Docker is the recommended method for building and deploying application instances in production. 

The latest development version can be built directly from source:

```bash
git clone https://github.com/pitt-crc/keystone-web
docker build -t keystone-web:develop keystone-web
docker run -p 4200:4200 keystone-web:develop
```

### Using NPM

This project requires the Angular CLI utility.

```bash
npm install -g @angular/cli
```

Any remaining dependencies can be installed via `npm` in the standard fashion.

```bash
npm install
```

Build scripts are provided for building and serving a local instance of the application.

```bash
npm run build
npm run serve
```
