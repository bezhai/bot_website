FROM node:14 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]