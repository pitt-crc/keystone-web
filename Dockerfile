FROM node:20 as build

WORKDIR /build
COPY . .

# Install dependencies and build the application
RUN npm install &&  \
    npm install -g @angular/cli && \
    ng build

FROM nginx:1.25-alpine

COPY --from=build /build/dist/keystone/ /usr/share/nginx/html
