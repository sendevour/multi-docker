#first phase - build
# name it as builder with as keyword.
FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

#now from the builder phase, build folder has the contents that has to be copied to RUN phase that is nginx.
FROM nginx
# added for AWS, for production deployment we need to expose a port
EXPOSE 3000
# copy the nginx default.conf that helps to load the web pages from client
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# copy over the build contents from builder phase to default path of nginx, from where nginx serves the html content.
# nginx image has default startup command to start nginx, so not mentioning any CMD section below. 
COPY --from=builder /app/build /usr/share/nginx/html
