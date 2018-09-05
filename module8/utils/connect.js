const mongoose = require('mongoose');

const config = require('../config');

const pass = config.db.password.length ? `:${config.db.password}` : "";

const auth = config.db.user.length ? `${config.db.user}${pass}@` : "";

//example - mongodb://localhost:27017/dbName
mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, () => {

    console.log('mongoose connected to db');

});

// 1) Скачать Community Server MongoDB
// 2) Скачать MongoDB Compass
// 3) Разархивировать сервер в удобную директорию ~/mongo_db/bin/mongod db-path ~/mongo_db/data
// 4) Запускаем базу данных и ОБЯЗАТЕЛЬНО ПЕРЕДАЕМ ПУТЬ К данным
// 5) Нужно создать базу данных для нашего приложения
// 6) Подключить сервер с помощью mongoose.connect();