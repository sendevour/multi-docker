FROM node:alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
#here  npm run start as its a prod dockerfile the below line is the only diff between prod and dev.
CMD ["npm", "run", "start"]