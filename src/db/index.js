const env = require("../core/env");
const connection = require("mysql").createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
});
module.exports = {
  connection
}
