FROM node:14
WORKDIR /service
COPY . .
RUN npm i
EXPOSE 3001
CMD ["npm", "start"]
