FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 5050
CMD [ "node","index.js"]

#kothay run hoc