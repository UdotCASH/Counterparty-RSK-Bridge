FROM node:12-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install ethers axios
COPY . .
EXPOSE 8080
CMD [ "node", "./scripts/bridge_script.js" ]
