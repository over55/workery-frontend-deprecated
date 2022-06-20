FROM node

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

RUN mkdir -p /frontend
WORKDIR /frontend
COPY . .

RUN npm install

CMD npm run start;

EXPOSE 3000

##----------------------------
## HOWTO: Use for Development
##----------------------------
##
## THE FOLLOWING CODE WILL BUILD A DOCKER IMAGE WE CAN USE FOR EITHER DEVELOPMENT (WITH HOT-RELOAD ENABLED) OR FOR PRODUCTION.
##   $ docker build -f dev.Dockerfile -t workery-front-dev .
##
## RUN THE FOLLOWING TO CONFIRM OUR IMAGE HAS BEEN BUILT:
##   $ docker ls
##
## RUN THE FOLLOWING TO START THE DEVELOPMENT SEVRVER (AND DON'T FORGET TO CHANGE THE FILEPATH TO YOUR LOCATION):
##   $ docker run -it --rm --name workery-front-dev -p 3000:3000 -v /Users/bmika/js/github.com/ceinfestecnologia/workery-front/src:/frontend/src workery-front-dev
##
##   -it: Connect the terminal window that you ran the command with to the terminal inside the container.
##   -rm: Automatically delete containers on exit.
##   --name: Give the running container a name
##   --p: Map the current machines port to the internal containers port.
##   -v: Create a volume and map it to the location of where our react porject is in our machine to the location inside the container.
