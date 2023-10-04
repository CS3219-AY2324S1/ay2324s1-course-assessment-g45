FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# RUN npm ci --omit=dev # Turn on for production build
COPY . .
EXPOSE 3001
CMD ["npm", "run", "start"]