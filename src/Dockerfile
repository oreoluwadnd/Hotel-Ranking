# Create image based on the official Node image from dockerhub
FROM node:lts-buster AS development

# update packages
# RUN apk update
# Create app directory
WORKDIR /client/app
# copy configs to /app folder
# Copy dependency definitions
COPY . .
# Install dependecies
#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
RUN npm ci  

RUN npm run build

EXPOSE 5173


CMD ["npm","run","dev"]