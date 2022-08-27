# build environment
FROM node:18-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@5.0.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

## Using the production Dockerfile, build and tag the Docker image:
##   $ docker build -f prod.Dockerfile -t workery-frontend:latest .
##
## Spin up the container:
##   $ docker run -it --rm -p 1337:80 workery-frontend:latest
##
## Navigate to http://localhost:1337/ in your browser to view the app.
##
## SPECIAL THANKS TO:
## https://mherman.org/blog/dockerizing-a-react-app/
