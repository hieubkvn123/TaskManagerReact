FROM node:alpine
WORKDIR '/app'

COPY client/package.json .
RUN npm install --silent 
COPY ./client ./client
COPY ./api ./api

CMD ["npm","start"]
CMD [""]
