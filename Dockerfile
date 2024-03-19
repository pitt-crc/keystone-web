FROM node:20-slim as build

WORKDIR /build
COPY . .

# Install dependencies and build the application
RUN npm install &&  \
    npm install -g @angular/cli && \
    ng build

FROM nginx:1.25-alpine

EXPOSE 80
COPY --from=build /build/dist/keystone/browser /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
