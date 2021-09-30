FROM node:alpine 

WORKDIR /app 
COPY package.json .
RUN npm install && npm cache clear --force 
COPY . .

CMD ["npm", "start"]
