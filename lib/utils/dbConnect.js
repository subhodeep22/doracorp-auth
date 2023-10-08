const pgp = require('pg-promise')();
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'auth',
    user: 'admin',
    password: 'admin',
    max: 30 // use up to 30 connections
};
module.exports = pgp(connection);