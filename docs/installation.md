# Installation

To install the Keystone web interface, choose from one of the following options.

## Using Docker

Using Docker is the recommended method for building and deploying application instances in production. 

The latest development version can be built directly from source:

```bash
git clone https://github.com/pitt-crc/keystone-web
docker build -t keystone-web:develop keystone-web
docker run -p 4200:4200 keystone-web:develop
```

## Using NPM

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
