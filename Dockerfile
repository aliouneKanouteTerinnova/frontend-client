# FROM ubuntu:20.04

# RUN apt-get update && apt-get install nginx vim -y --no-install-recommends

# RUN apt-get -y install apache2-utils  

# RUN mkdir /etc/apache2
# COPY .htpasswd /etc/apache2/

# COPY nginx.conf /etc/nginx/nginx.conf 

# RUN apt-get -y install curl
# RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
# RUN apt-get install -y nodejs

# RUN apt --fix-broken install
# RUN apt-get update && apt-get upgrade
# RUN dpkg --configure -a
# RUN apt-get install -f

# #RUN apt-get -y install npm

# RUN mkdir /usr/local/app

# WORKDIR /usr/local/app

# COPY ./ /usr/local/app/

# RUN npm install -g @angular/cli

# # Install all the dependencies
# RUN npm install

# # Generate the build of the application
# RUN npm run build

# #RUN mkdir /var/www/frontend-client
# RUN ls -al /usr/local/app
# RUN ls -al /usr/local/app/dist
# # Copy the build output to replace the default nginx contents.
# RUN cp -r /usr/local/app/dist/frontend-client /var/www/

# # Expose port 80
# EXPOSE 80

FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/frontend-client /usr/share/nginx/html

#RUN apt-get -y install apache2-utils 

RUN mkdir /etc/apache2
COPY .htpasswd /etc/apache2/

COPY nginx.conf /etc/nginx/nginx.conf 

EXPOSE 80