# FROM node:14-alpine

# COPY . /src

# WORKDIR /src

# # install chromedriver
# RUN apt update && apt install -y chromium-browser chromium-chromedriver

# ENV NODE_ENV production

# RUN npm install --production

# ENTRYPOINT [ "npm", "start" ]

# FROM ubuntu:18.04

# # Create app directory

# WORKDIR /var/www/html/aws-batch-node/

# RUN apt update && apt install -y chromium-browser chromium-chromedriver

# RUN apt-get install -y libgbm-dev
# RUN apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# FROM node:13.11.0

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)

# COPY package*.json ./
# RUN npm install
# RUN node ./node_modules/puppeteer/install.js

# # Bundle app source

# COPY . .
# ENTRYPOINT [ "npm", "start" ]


FROM node:latest
WORKDIR /puppeteer
RUN apt-get install -y \
    fonts-liberation \
    gconf-service \
    libappindicator1 \
    libasound2 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libfontconfig1 \
    libgbm-dev \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libicu-dev \
    libjpeg-dev \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libpng-dev \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    xdg-utils
COPY package.json .
COPY package-lock.json .
RUN npm ci
RUN chmod -R o+rwx node_modules/puppeteer/.local-chromium


