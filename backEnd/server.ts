import express from "express";
import http from "http";
import bodyParser from "body-parser";
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));

server.listen(3000);
