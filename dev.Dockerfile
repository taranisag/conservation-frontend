FROM node:20-alpine as build

# Setup
RUN apk add git
ENV PATH /app/node_modules/.bin:$PATH