ARG URL_FOR_CONNECT_TO_API=http://test.com:80

FROM node:18-slim AS build

ARG URL_FOR_CONNECT_TO_API
ENV REACT_APP_API_URL=${URL_FOR_CONNECT_TO_API}

WORKDIR /app

COPY . .

RUN npm install 

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /nginx-app

COPY --from=build /app/build /nginx-app

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]