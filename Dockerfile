FROM node:14 as build

WORKDIR /app
COPY . .

# Install dependencies and build the application
RUN npm install && ng build --prod

FROM nginx:alpine

# Copy compiled application into the final layer
COPY --from=build /app/dist/your-angular-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off"]
