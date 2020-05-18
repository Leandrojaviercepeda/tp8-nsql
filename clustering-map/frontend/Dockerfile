FROM node:latest
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

WORKDIR /clustering-map-ui
COPY clustering-map-ui/ .

EXPOSE 3000