FROM node:18-slim as build

WORKDIR /app

COPY . .

RUN npm install 

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /nginx-app

COPY --from=build /app/build /nginx-app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]