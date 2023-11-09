FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install --global nodemon
# RUN npm ci --omit=dev # Turn on for production build
COPY . .
EXPOSE 3006
CMD ["npm", "run", "dev"]