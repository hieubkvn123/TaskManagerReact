FROM python:3
WORKDIR /app/api
COPY ./api .

RUN pip install -r requirements.txt
EXPOSE 3000

CMD ["python", "./api/server.py"]

FROM node:alpine
WORKDIR /app/client
COPY ./client .
COPY ./client/package.json .
COPY ./client/package-lock.json .
EXPOSE 8080

RUN npm install

CMD ["npm", "run", "start"]
