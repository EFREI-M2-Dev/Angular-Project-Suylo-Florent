const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db/db.json");
const middlewares = jsonServer.defaults();
const port = 3000;

server.use(middlewares);
server.use(router);

server.listen(port);
