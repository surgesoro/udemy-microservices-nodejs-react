FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install && npm cache clean --force

EXPOSE 3000

COPY ./ ./

CMD ["npm", "start"]