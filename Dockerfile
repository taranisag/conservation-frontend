# NOTE:
# changes in this file should also reflect in `dev.Dockerfile`

##########################################################
################## Build environment #####################
##########################################################
FROM node:20-alpine as build

# Setup
RUN apk add git
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and install required node modules
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app

RUN npm install --legacy-peer-deps

# Build the app
COPY . /app
RUN npm run build

# Copy the app dist folder
COPY --from=build /app/dist /app/dist


##########################################################
################## Serving environment ###################
##########################################################
FROM nginx:stable as serving

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]