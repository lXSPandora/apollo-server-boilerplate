# Download base image nodejs
FROM node:8-alpine

# Create app directory
RUN mkdir -p src

COPY package.json /src/package.json

RUN cd /src; npm install

COPY . /src

WORKDIR src 

CMD ["npm", "start"]

# Set port and start service
EXPOSE 3000
