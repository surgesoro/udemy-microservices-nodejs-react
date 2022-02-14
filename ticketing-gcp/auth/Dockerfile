FROM node:16.5.0-alpine 

WORKDIR /app 
COPY package.json .
RUN npm install && npm cache clear --force 
COPY . .

CMD ["npm", "start"]
