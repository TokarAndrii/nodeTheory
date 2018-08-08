//app, model, controller, route, helpers, seeders, utils, config, test

const port = 8080;

const http = require('http');
//делать запросы на другие сервера http.request
// обработка входящих запросов http.createServer, .listen

const server = http.createServer({}, (req, resp) => {
//req - запрос обьект который преобразовал данные example: /users/ Post, body = {a:1}
//resp - ответ обьект который имеет методы для ответа (отправки данных в ответ)


});
server.listen(port);

console.log(`server started on port: ${port}`);