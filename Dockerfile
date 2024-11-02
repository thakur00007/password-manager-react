# build image for react vite app with env variables
FROM node:20 as build
WORKDIR /app
COPY package.json ./

# params for env variables
ARG VITE_API_HOST_URL
ARG VITE_API_DEFAULT_PATH

# set env variables
ENV VITE_API_HOST_URL=$VITE_API_HOST_URL
ENV VITE_API_DEFAULT_PATH=$VITE_API_DEFAULT_PATH

RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]