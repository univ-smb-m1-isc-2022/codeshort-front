#stage 1
FROM node:19.6-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD ["ng","serve", "--host", "0.0.0.0"]