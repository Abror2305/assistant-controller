const env = require("../core/env");
const connection = require("mysql").createConnection({
  user: env.DB_USER,
  host: env.DB_HOST,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
});

connection.connect()

module.exports = {
  connection
}